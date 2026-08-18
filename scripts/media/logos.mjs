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
 *   - `holes: true` clears every background-coloured pixel, wherever it sits.
 *     Closed shapes need this: the counters of Moonkie's two o's and its e, and
 *     the insides of JBØRN's outlined B, Ø, R and N, are all background that no
 *     fill coming from the edge can ever reach. Left alone they read as solid
 *     white ovals and solid black letters — which is exactly what they looked
 *     like before this option existed.
 *   - `holes: false` floods inwards from the four edges instead, so enclosed
 *     background survives. Schacht needs that: the white inside its label box
 *     is the logo, not the background behind it.
 *   - either way the edge is feathered over a few shades, because a JPEG has no
 *     hard edges left to cut along.
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
 *  holes     true when enclosed background must go too (see above)
 *  out       the file the site points at
 */
const jobs = [
  { src: 'j-born.jpg', out: 'jborn.png', on: 'black', holes: true },
  { src: 'Moonkie.jpg', out: 'moonkie.png', on: 'white', holes: true },
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
 *
 * The black band is tight for a reason. JBØRN's background is dead black
 * (brightness 0 to 3 across 708,000 pixels) while the bear's pupil sits at 32.
 * A generous threshold would take the pupil with it and leave the bear
 * blank-eyed — so the cut-off is 16, well clear of both.
 */
const BANDS = {
  white: { clear: 238, solid: 205 },
  black: { clear: 4, solid: 16 },
}

async function lift({ src, out, on, crop, holes = false }) {
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

  const seen = new Uint8Array(width * height)

  if (holes) {
    // Background is background wherever it is, enclosed or not.
    for (let p = 0; p < width * height; p++) {
      if (isBackground(p * channels)) seen[p] = 1
    }
  } else {
    /*
     * Flood from the border inwards, so enclosed background survives. A stack
     * rather than recursion: a 1000×1000 logo is a million pixels, and
     * recursion runs out of stack long before it runs out of picture.
     */
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
  }

  /*
   * Only pixels marked as background lose their alpha, and they lose it
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
