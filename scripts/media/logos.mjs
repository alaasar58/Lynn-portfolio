#!/usr/bin/env node
/*
 * Turns the logo files Lynn uploaded into logos a website can use.
 *
 *   npm i --no-save sharp && node scripts/media/logos.mjs
 *
 * WHY THIS EXISTS
 * ---------------
 * A logo saved off a shop page arrives with whatever was behind it baked in:
 * JBØRN came as a JPEG whose transparent background had flattened to solid
 * black, Moonkie on white, and Schacht as a slice of the website header with
 * the green banner running through it. Dropped straight onto the sand tiles
 * that is a black square, a white square and a green stripe.
 *
 * So each one is cropped to the mark and the background is lifted off:
 *
 *   - flood fill inwards from the four edges, following only background-
 *     coloured pixels, and make what it reaches transparent. Flooding from the
 *     edges rather than replacing every matching pixel is the whole trick — it
 *     cannot reach the white *inside* Schacht's label box or the white of the
 *     bear's eye, so those stay as the designer drew them.
 *   - the edge of the fill is feathered over a few shades, because a JPEG has
 *     no hard edges left to cut along.
 *
 * The results are written as PNG, which is the only format here with an alpha
 * channel. The uploads themselves stay in `media-src/brands/`, outside
 * `public/` so they are never published: this is not reversible arithmetic, and
 * the next person to look at a logo will want to see what actually arrived.
 *
 * RUN IT AGAIN when a new logo is uploaded. It is not part of the build: it
 * needs judgement about what counts as background, and a build step that
 * guesses wrong about a trademark is worse than one that does not run.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('\nMissing sharp. Run:\n\n  npm i --no-save sharp\n')
  process.exit(1)
}

const HERE = path.resolve(fileURLToPath(import.meta.url), '../../..')
/* What was uploaded. Outside `public/`, so the heavy originals are never
   published — only the cleaned PNGs are. */
const FROM = path.join(HERE, 'media-src/brands')
/* What the site points at. */
const TO = path.join(HERE, 'public/media/brands')

/*
 * One entry per uploaded file.
 *
 *  crop      pixels to keep, when the upload is a slice of a web page rather
 *            than the logo on its own
 *  on        'white' or 'black' — what the background flattened to
 *  out       the file the site points at
 */
const jobs = [
  { src: 'j-born.jpg', out: 'jborn.png', on: 'black' },
  { src: 'Moonkie.jpg', out: 'moonkie.png', on: 'white' },
  {
    src: 'stadtbaeckerei-schacht.jpg',
    out: 'schacht.png',
    on: 'white',
    /* Kept to the width of the label box, so the green banner that runs across
       the page behind it never enters the frame in the first place. */
    crop: { left: 202, top: 24, width: 338, height: 247 },
  },
]

/** Perceived brightness. The only thing either background differs by. */
const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b

/*
 * Where the background definitely is, where it definitely is not, and the band
 * between the two that becomes a soft edge.
 */
const BANDS = {
  white: { clear: 238, solid: 205 },
  black: { clear: 18, solid: 52 },
}

async function lift({ src, out, on, crop }) {
  const file = path.join(FROM, src)
  if (!existsSync(file)) {
    console.log(`skip ${src} — not there`)
    return
  }

  let image = sharp(file)
  if (crop) image = image.extract(crop)

  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const band = BANDS[on]
  const isBackground = (i) => {
    const l = lum(data[i], data[i + 1], data[i + 2])
    return on === 'white' ? l >= band.solid : l <= band.solid
  }

  /*
   * Flood from the border inwards. A stack rather than recursion: a 1000×1000
   * logo is a million pixels and recursion runs out of stack long before it
   * runs out of picture.
   */
  const seen = new Uint8Array(width * height)
  const stack = []
  for (let x = 0; x < width; x++) {
    stack.push(x, x + (height - 1) * width)
  }
  for (let y = 0; y < height; y++) {
    stack.push(y * width, width - 1 + y * width)
  }

  while (stack.length) {
    const p = stack.pop()
    if (seen[p]) continue
    const i = p * channels
    if (!isBackground(i)) continue
    seen[p] = 1

    const x = p % width
    const y = (p - x) / width
    if (x > 0) stack.push(p - 1)
    if (x < width - 1) stack.push(p + 1)
    if (y > 0) stack.push(p - width)
    if (y < height - 1) stack.push(p + width)
  }

  /*
   * Only pixels the flood actually reached lose their alpha, and they lose it
   * on a ramp: fully transparent at the background's own brightness, fully
   * opaque by the time the mark begins.
   */
  let cleared = 0
  for (let p = 0; p < width * height; p++) {
    if (!seen[p]) continue
    const i = p * channels
    const l = lum(data[i], data[i + 1], data[i + 2])
    const t =
      on === 'white'
        ? (l - band.solid) / (band.clear - band.solid)
        : (band.solid - l) / (band.solid - band.clear)
    const alpha = Math.round(255 * (1 - Math.min(Math.max(t, 0), 1)))
    data[i + 3] = Math.min(data[i + 3], alpha)
    if (alpha === 0) cleared++
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 1 }) // drop the now-empty margin the flood left behind
    .png({ compressionLevel: 9 })
    .toFile(path.join(TO, out))

  const share = Math.round((cleared / (width * height)) * 100)
  console.log(`${src} → ${out}  (${share}% of it was background)`)
}

for (const job of jobs) await lift(job)
