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
 * For each video it also writes the WebM sibling, and cuts the still when none
 * was uploaded — so one file per phone is enough, and a second one (a photo of
 * the same name) is how you choose the frame shown before it plays.
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
/** The WebM is only a fallback for browsers without H.264 — see below. */
const WEBM_W = 480
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
 * Fit inside 720 x 1280 without enlarging, and land on even numbers.
 *
 * H.264 with yuv420p cannot encode an odd dimension at all — it fails with
 * "height not divisible by 2" and takes the whole deploy with it. That is not
 * hypothetical: a clip uploaded at 1080x1838, scaled to width 720, gives a
 * height of 1225, and the encoder refuses.
 *
 * `-2` asks ffmpeg for "whatever keeps the aspect ratio, rounded to even", but
 * only for the dimension it is computing. So each stage pins the dimension it
 * *sets* to an even number itself, and leaves the other one to `-2`. Between
 * them both come out even, whatever went in.
 *
 * `force_original_aspect_ratio` is deliberately gone: it recomputes both
 * dimensions after the fact, which is exactly how the odd height got through.
 */
const even = (expr) => `2*floor((${expr})/2)`
const scaleFilter = `scale=w='${even(`min(${MAX_W},iw)`)}':h=-2,scale=w=-2:h='${even(`min(${MAX_H},ih)`)}'`

function optimiseVideo(file, posterAt) {
  const before = statSync(file).size
  const { w, seconds } = probe(file)

  /*
   * An iPhone hands you a .mov. Browsers are unreliable with that container, so
   * one always comes out of here as an .mp4 under the same name — which is also
   * the name the site asks for.
   */
  const isMov = /\.mov$/i.test(file)
  const mp4 = isMov ? file.replace(/\.mov$/i, '.mp4') : file

  // Already small and already the right size: the drawn placeholders land here.
  const small = !isMov && before <= SKIP_BYTES && (w === null || w <= MAX_W)
  const tmp = `${mp4}.tmp.mp4`

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
    renameSync(tmp, mp4)
    note(path.basename(mp4), before, statSync(mp4).size, 'video')
  }

  const base = mp4.replace(/\.mp4$/, '')

  /*
   * The WebM is rebuilt every time, so it cannot fall behind the clip.
   *
   * It is a compatibility fallback, not the file anyone actually gets: Chrome,
   * Safari, Edge, Firefox and iOS all take the MP4. Only a Chromium built
   * without the H.264 decoder ever reaches this. So it is encoded smaller and
   * rougher on purpose — at the MP4's settings it came out larger than the MP4.
   */
  run([
    '-i', mp4,
    '-vf', `scale=w='${even(`min(${WEBM_W},iw)`)}':h=-2`,
    '-c:v', 'libvpx-vp9',
    '-crf', '44',
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

  /*
   * The still is cut from the clip only when none was uploaded. Uploading a
   * photo next to a clip is how you choose the frame people see before it
   * plays, and a generated one must not overwrite that choice.
   */
  if (!existsSync(`${base}.jpg`)) {
    const at = Number.isFinite(posterAt) ? posterAt : 0.5
    run(['-ss', String(at), '-i', mp4, '-frames:v', '1', '-q:v', '4', `${base}.jpg`])
    note(`${path.basename(base)}.jpg`, 0, statSync(`${base}.jpg`).size, 'still')
  }
}

/* ------------------------------------------------------------------ images */

function optimiseImage(file) {
  const before = statSync(file).size
  if (before <= SKIP_IMAGE_BYTES) return

  /*
   * A PNG stays a PNG. ffmpeg picks its encoder from the output extension, so
   * writing a .png through a .jpg temporary silently flattens the transparency
   * — which is the entire reason a logo is a PNG. The quality flag only means
   * anything to the JPEG encoder, so only JPEGs get it.
   */
  const isPng = /\.png$/i.test(file)
  const tmp = isPng ? `${file}.tmp.png` : `${file}.tmp.jpg`
  run([
    '-i', file,
    '-vf', `scale=w='${even(`min(${IMAGE_EDGE},iw)`)}':h=-2`,
    ...(isPng ? [] : ['-q:v', String(Math.round(31 - (IMAGE_QUALITY / 100) * 31))]),
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

  for (const name of files.filter((f) => /\.(mp4|mov)$/i.test(f))) {
    optimiseVideo(path.join(reels, name), posterTimes[name.replace(/\.(mp4|mov)$/i, '')])
  }

  // A frame can hold a photo instead of a clip. Those stills are uploads, so
  // they are compressed like any other image — but only where no clip exists,
  // since a clip's still is generated above and already small.
  for (const name of files.filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    optimiseImage(path.join(reels, name))
  }
}

for (const name of readdirSync(root).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  optimiseImage(path.join(root, name))
}

/*
 * Every other folder of stills. `moments` in particular: those come off a phone
 * at three or four megabytes each, and five of them unshrunk is a heavier page
 * than all six clips put together.
 */
for (const folder of ['brands', 'moments']) {
  const dir = path.join(root, folder)
  if (!existsSync(dir)) continue
  for (const name of readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    optimiseImage(path.join(dir, name))
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
