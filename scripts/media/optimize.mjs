#!/usr/bin/env node
/*
 * Shrinks everything under a media folder to web size.
 *
 *   node scripts/media/optimize.mjs dist/media
 *
 * Runs on the BUILT output, never on `public/media`. The originals stay in the
 * repository exactly as uploaded; only what gets published is recompressed.
 * That way a heavy file can be uploaded once and forgotten about.
 *
 * Why at build time rather than committing the small version back: GitHub
 * deliberately does not start another workflow after a push made with the
 * built-in token, so a commit-back would only go live on the *next* upload.
 * This has no such delay, cannot loop, and needs no extra permissions.
 *
 * For each video it also writes the WebM sibling and cuts the still, so the
 * only thing anyone ever has to upload is one MP4 per phone.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from 'node:fs'
import path from 'node:path'

/* ------------------------------------------------------------------ tuning */

/** The phone frame is ~240 px wide; 720 is already generous for it. */
const MAX_W = 720
const MAX_H = 1280
/** Longer than this and nobody watches to the end of the loop anyway. */
const MAX_SECONDS = 20
/** A clip at or under these is left alone — the drawn placeholders are. */
const SKIP_BYTES = 3 * 1024 * 1024
const IMAGE_EDGE = 1600
const IMAGE_QUALITY = 82
const SKIP_IMAGE_BYTES = 400 * 1024

/* ------------------------------------------------------------------ ffmpeg */

function resolveTool(name) {
  try {
    execFileSync('which', [name], { stdio: 'pipe' })
    return name
  } catch {
    return null
  }
}

let ffmpeg = resolveTool('ffmpeg')
let ffprobe = resolveTool('ffprobe')

if (!ffmpeg) {
  // Fall back to the npm binary, which is how this repo generates placeholders.
  try {
    ffmpeg = (await import('ffmpeg-static')).default
  } catch {
    /* not installed — handled below */
  }
}

if (!ffmpeg) {
  console.log(
    '\nmedia: ffmpeg not found, leaving media as it is.\n' +
      '       Install it (apt install ffmpeg) or run: npm i --no-save ffmpeg-static\n',
  )
  process.exit(0)
}

const run = (args) => execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...args])

/**
 * Width, height and duration.
 *
 * Prefers ffprobe, which CI has because it ships with ffmpeg. The npm
 * `ffmpeg-static` package contains no ffprobe, so the fallback reads the same
 * numbers out of what ffmpeg prints about the input. Both paths return nulls
 * rather than throwing: an unknown size only means nothing gets skipped.
 */
function probe(file) {
  if (ffprobe) {
    try {
      const out = execFileSync(
        ffprobe,
        [
          '-v', 'error',
          '-select_streams', 'v:0',
          '-show_entries', 'stream=width,height:format=duration',
          '-of', 'default=noprint_wrappers=1:nokey=1',
          file,
        ],
        { encoding: 'utf8' },
      )
        .trim()
        .split('\n')
      return { w: Number(out[0]), h: Number(out[1]), seconds: Number(out[2]) }
    } catch {
      /* fall through to the ffmpeg reading */
    }
  }

  try {
    // ffmpeg exits non-zero without an output file, and writes the stream
    // description to stderr — which is exactly what is wanted here.
    execFileSync(ffmpeg, ['-hide_banner', '-i', file], { stdio: 'pipe' })
    return { w: null, h: null, seconds: null }
  } catch (error) {
    const text = String(error.stderr ?? '')
    const size = text.match(/,\s(\d{2,5})x(\d{2,5})[\s,]/)
    const time = text.match(/Duration:\s(\d+):(\d+):(\d+\.?\d*)/)
    return {
      w: size ? Number(size[1]) : null,
      h: size ? Number(size[2]) : null,
      seconds: time
        ? Number(time[1]) * 3600 + Number(time[2]) * 60 + Number(time[3])
        : null,
    }
  }
}

/* ----------------------------------------------------------------- reports */

const kb = (n) => `${(n / 1024).toFixed(0)} KB`
const mb = (n) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : kb(n))
const rows = []
const note = (file, before, after, what) =>
  rows.push({ file, before, after, what })

/* ------------------------------------------------------------------ videos */

/*
 * `scale` keeps the aspect ratio and never enlarges: `min(iw,720)` on the width
 * with `-2` on the height keeps both dimensions even, which H.264 requires.
 */
const scaleFilter = `scale='min(${MAX_W},iw)':-2:force_original_aspect_ratio=decrease,scale='if(gt(ih,${MAX_H}),-2,iw)':'min(${MAX_H},ih)'`

function optimiseVideo(file, posterAt) {
  const before = statSync(file).size
  const { w, seconds } = probe(file)

  // Already small and already the right size: the drawn placeholders land here.
  const small = before <= SKIP_BYTES && (w === null || w <= MAX_W)
  const tmp = `${file}.tmp.mp4`

  if (!small) {
    const trim = seconds && seconds > MAX_SECONDS ? ['-t', String(MAX_SECONDS)] : []
    run([
      '-i', file,
      ...trim,
      '-vf', scaleFilter,
      '-r', '30',
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-pix_fmt', 'yuv420p',
      '-crf', '30',
      '-preset', 'medium',
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '96k',
      '-ac', '2',
      tmp,
    ])
    unlinkSync(file)
    renameSync(tmp, file)
    note(path.basename(file), before, statSync(file).size, 'video')
  }

  // The WebM and the still are always rebuilt from whatever the MP4 now is, so
  // the three can never drift apart.
  const base = file.replace(/\.mp4$/, '')
  run([
    '-i', file,
    '-c:v', 'libvpx-vp9',
    '-crf', '38',
    '-b:v', '0',
    '-row-mt', '1',
    // VP9's default deadline spends minutes chasing a few percent. This runs on
    // every deploy, so speed matters more than the last kilobyte.
    '-deadline', 'good',
    '-cpu-used', '4',
    '-an',
    `${base}.webm`,
  ])
  note(`${path.basename(base)}.webm`, 0, statSync(`${base}.webm`).size, 'webm')

  const at = Number.isFinite(posterAt) ? posterAt : 0.5
  run([
    '-ss', String(at),
    '-i', file,
    '-frames:v', '1',
    '-q:v', '4',
    `${base}.jpg`,
  ])
  note(`${path.basename(base)}.jpg`, 0, statSync(`${base}.jpg`).size, 'still')
}

/* ------------------------------------------------------------------ images */

function optimiseImage(file) {
  const before = statSync(file).size
  if (before <= SKIP_IMAGE_BYTES) return

  const tmp = `${file}.tmp.jpg`
  run([
    '-i', file,
    '-vf', `scale='min(${IMAGE_EDGE},iw)':-2:force_original_aspect_ratio=decrease`,
    '-q:v', String(Math.round(31 - (IMAGE_QUALITY / 100) * 31)),
    '-map_metadata', '-1',
    tmp,
  ])
  unlinkSync(file)
  renameSync(tmp, file)
  note(path.basename(file), before, statSync(file).size, 'image')
}

/* ------------------------------------------------------------------- drive */

const root = process.argv[2] ?? 'dist/media'
if (!existsSync(root)) {
  console.log(`media: ${root} does not exist, nothing to do.`)
  process.exit(0)
}

/*
 * `posterAt` per reel, read straight out of the site data so the second is
 * configured in one place rather than duplicated here.
 */
const posterTimes = {}
try {
  const src = await import('node:fs').then((fs) =>
    fs.readFileSync('src/content/site.ts', 'utf8'),
  )
  for (const entry of src.matchAll(/id:\s*'([^']+)'[^}]*?posterAt:\s*([\d.]+)/g)) {
    posterTimes[entry[1]] = Number(entry[2])
  }
} catch {
  /* defaults are fine */
}

const reels = path.join(root, 'reels')
if (existsSync(reels)) {
  const files = readdirSync(reels)

  for (const name of files.filter((f) => f.endsWith('.mp4'))) {
    optimiseVideo(path.join(reels, name), posterTimes[name.replace(/\.mp4$/, '')])
  }

  // A frame can hold a photo instead of a clip. Those stills are uploads, so
  // they are compressed like any other image — but only where no clip exists,
  // since a clip's still is generated above and already small.
  for (const name of files.filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    if (files.includes(name.replace(/\.(jpe?g|png)$/i, '.mp4'))) continue
    optimiseImage(path.join(reels, name))
  }
}

for (const name of readdirSync(root).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  optimiseImage(path.join(root, name))
}

const brands = path.join(root, 'brands')
if (existsSync(brands)) {
  for (const name of readdirSync(brands).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    optimiseImage(path.join(brands, name))
  }
}

/* ------------------------------------------------------------------ report */

if (rows.length === 0) {
  console.log('media: everything was already web-sized.')
} else {
  console.log('\nmedia: optimised for the web\n')
  const pad = Math.max(...rows.map((r) => r.file.length))
  for (const r of rows) {
    const saved =
      r.before > 0 ? `  (${Math.round((1 - r.after / r.before) * 100)}% smaller)` : ''
    const from = r.before > 0 ? `${mb(r.before).padStart(8)} → ` : '           '
    console.log(`  ${r.file.padEnd(pad)}  ${from}${mb(r.after).padStart(8)}${saved}`)
  }
  console.log()
}
