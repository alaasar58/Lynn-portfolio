#!/usr/bin/env node
/*
 * Generates every temporary visual on the site.
 *
 *   npm run media
 *
 * Needs two heavy tools that are deliberately NOT in package.json, so the
 * GitHub Pages deploy does not download a 30 MB ffmpeg on every push:
 *
 *   npm i --no-save sharp ffmpeg-static
 *
 * Everything it writes is a placeholder. Replace any file with a real photo or
 * clip of the same name and the site picks it up — no code change. Once all the
 * real media is in, this whole folder can be deleted.
 */
import { mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

let sharp, ffmpeg
try {
  sharp = (await import('sharp')).default
  ffmpeg = (await import('ffmpeg-static')).default
} catch {
  console.error('\nMissing generator dependencies. Run:\n\n  npm i --no-save sharp ffmpeg-static\n')
  process.exit(1)
}

import * as S from './scenes.mjs'
const { C } = S

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../../../public/media')
const TMP = '/tmp/lynn-frames'
const FRAMES = 144 // 6 s at 24 fps — a 2 s loop is obviously repetitive on a drawn scene
const FPS = 24

/* -------------------------------------------------------------------- scenes */

/*
 * Each scene is a function of `d`, a drift value in [0,1) that wraps exactly at
 * 1 so the loop is seamless. Only the camera moves: the light pool drifts and
 * the subject shifts by a fraction of a unit. Objects never animate — a
 * placeholder that acts reads as a cartoon, one that breathes reads as a shot.
 */
const sway = (d, amp) => Math.sin(d * Math.PI * 2) * amp

/** 9:16 work covers. Floor at 100 of 178 keeps detail clear of the caption. */
const W9 = { vbW: 100, vbH: 178, floorY: 108 }
/** The two `featured` items are centre-cropped to ~2:1, so they sit lower. */
const W9F = { vbW: 100, vbH: 178, floorY: 116 }

const scenes = {
  'morning-light': (d) => ({
    ...W9F,
    body:
      S.window_(20 + sway(d, 0.6), 40, 46, 54) +
      S.plant(72, W9F.floorY, 16, 34) +
      S.mug(30, W9F.floorY, 11, 9) +
      S.circle(52, W9F.floorY - 3, 3, C.blush),
  }),
  'everyday-ritual': (d) => ({
    ...W9,
    body:
      S.jar(24 + sway(d, 0.4), W9.floorY, 17, 14, C.bone) +
      S.mug(48, W9.floorY, 13, 11) +
      S.stack(66, W9.floorY, 20, 2, [C.blush, C.sand]) +
      S.plant(6, W9.floorY, 13, 26),
  }),
  'product-detail': (d) => ({
    ...W9,
    body:
      S.plain(28, W9.floorY - 5, 44, 5, C.bone, 1) +
      S.pumpBottle(42 + sway(d, 0.3), W9.floorY - 5, 17, 40, C.bone) +
      S.circle(28, 52, 7, C.blush, false),
  }),
  unboxing: (d) => ({
    ...W9,
    body:
      S.openBox(24 + sway(d, 0.4), W9.floorY, 44, 30) +
      S.pumpBottle(70, W9.floorY, 14, 26, C.blush) +
      S.plain(16, W9.floorY - 3, 12, 3, C.sand, 0.6),
  }),
  'feeding-routine': (d) => ({
    ...W9,
    body:
      S.babyBottle(36 + sway(d, 0.35), W9.floorY, 20, 38) +
      S.stack(62, W9.floorY, 22, 2, [C.bone, C.blush]) +
      S.circle(22, 62, 8, C.blush, false),
  }),
  'baby-care': (d) => ({
    ...W9,
    body:
      S.stack(22 + sway(d, 0.3), W9.floorY, 30, 3, [C.bone, C.blush, C.sand]) +
      S.dropper(60, W9.floorY, 13, 26, C.sandDeep) +
      S.circle(78, W9.floorY - 8, 8, C.blushMid),
  }),
  'skincare-routine': (d) => ({
    ...W9,
    body:
      S.mirror(50, 46 + sway(d, 0.5), 22) +
      S.pumpBottle(26, W9.floorY, 15, 32, C.bone) +
      S.dropper(48, W9.floorY, 12, 24, C.blush) +
      S.jar(66, W9.floorY, 17, 15, C.sand),
  }),
  'texture-closeup': (d) => ({
    ...W9,
    floorY: 130,
    body:
      S.ellipse(50 + sway(d, 0.6), 96, 30, 20, C.bone, true) +
      S.ellipse(44, 90, 12, 8, C.blush) +
      S.path('M76,124 l10,-26', 'none', true, 1.2) +
      S.circle(84, 66, 5, C.blushMid),
  }),
  'grwm-evening': (d) => ({
    ...W9,
    body:
      S.ringLight(62, 44 + sway(d, 0.5), 22, W9.floorY) +
      S.figure(36, W9.floorY, 74, C.clay) +
      S.brushCup(74, W9.floorY, 13, 15),
  }),
  'travel-day': (d) => ({
    ...W9F,
    body:
      S.suitcase(18 + sway(d, 0.5), W9F.floorY, 54, 34) +
      S.circle(80, W9F.floorY - 10, 9, C.blush) +
      S.plain(74, W9F.floorY - 3, 18, 3, C.sand, 0.6),
  }),
}

/* Reel covers keep the middle and the top-left clear. */
const reels = {
  DabNET8N0QF: () => ({
    ...W9,
    body: S.ringLight(64, 40, 17, W9.floorY) + S.brushCup(22, W9.floorY, 15, 17) + S.mirror(30, 44, 13),
  }),
  DZ5mjgghM2X: () => ({
    ...W9,
    body:
      S.pumpBottle(14, W9.floorY, 15, 34, C.bone) +
      S.dropper(74, W9.floorY, 13, 27, C.blush) +
      S.jar(38, W9.floorY, 24, 16, C.sand) +
      S.mirror(64, 40, 15),
  }),
  DZDj6BZttNH: () => ({
    ...W9,
    body: S.babyBottle(12, W9.floorY, 19, 36) + S.stack(60, W9.floorY, 28, 3) + S.plant(40, W9.floorY, 14, 24),
  }),
}

/** Hero: 4:5, padded ~8% because the organic clip path eats the edges. */
const hero = (d) => ({
  vbW: 100,
  vbH: 125,
  floorY: 96,
  body:
    S.ringLight(68, 38 + sway(d, 0.5), 18, 96) +
    S.figure(40 + sway(d, 0.25), 96, 74, C.clay) +
    S.phoneOnTripod(74, 74, 9, 15, 96) +
    S.plant(10, 96, 14, 28),
})

/** About: 5:4 landscape, matching how About.tsx renders it. A flat-lay desk. */
const about = (d) => ({
  vbW: 125,
  vbH: 100,
  floorY: 40,
  wall: C.sandDeep,
  floor: C.sand,
  body:
    S.plain(0, 40, 125, 60, C.sand) +
    S.mug(20 + sway(d, 0.4), 82, 13, 11) +
    S.plain(40, 62, 34, 22, C.bone, 1) +
    S.path('M46,70 h22 M46,76 h16', 'none', true, 0.6) +
    S.phoneOnTripod(92, 80, 11, 18, 84) +
    S.pumpBottle(106, 84, 12, 22, C.blush) +
    S.plant(4, 84, 12, 24),
})

/* ----------------------------------------------------------------- rendering */

const jpeg = (svg, out, q = 84) =>
  sharp(svg).jpeg({ quality: q, progressive: true, mozjpeg: true }).toFile(out)

async function still(sceneFn, size, out, seed) {
  const s = sceneFn(0)
  await jpeg(S.frame({ ...size, ...s, seed }), out)
}

async function loop(sceneFn, slug, seed) {
  rmSync(TMP, { recursive: true, force: true })
  mkdirSync(TMP, { recursive: true })
  for (let i = 0; i < FRAMES; i++) {
    // i / FRAMES, never FRAMES - 1: that is what makes the loop seamless.
    const s = sceneFn(i / FRAMES)
    await sharp(S.frame({ w: 540, h: 960, ...s, seed }))
      .png()
      .toFile(path.join(TMP, `f${String(i).padStart(4, '0')}.png`))
  }
  const input = ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(TMP, 'f%04d.png')]
  execFileSync(ffmpeg, [...input, '-c:v', 'libx264', '-profile:v', 'baseline', '-pix_fmt', 'yuv420p',
    '-crf', '30', '-movflags', '+faststart', '-an', `${ROOT}/work/${slug}.mp4`])
  execFileSync(ffmpeg, [...input, '-c:v', 'libvpx-vp9', '-crf', '40', '-b:v', '0', '-row-mt', '1',
    '-an', `${ROOT}/work/${slug}.webm`])
  rmSync(TMP, { recursive: true, force: true })
}

/* Optional filter so a single scene can be re-rendered: `npm run media hero grwm-evening` */
const only = process.argv.slice(2)
const want = (name) => only.length === 0 || only.includes(name)

for (const dir of ['hero', 'about', 'work', 'reels']) mkdirSync(`${ROOT}/${dir}`, { recursive: true })

if (want('hero')) await still(hero, { w: 1200, h: 1500 }, `${ROOT}/hero/portrait.jpg`, 11)
if (want('about')) await still(about, { w: 1200, h: 960 }, `${ROOT}/about/portrait.jpg`, 12)

let seed = 20
for (const [code, fn] of Object.entries(reels)) {
  if (want('reels')) await still(fn, { w: 540, h: 960 }, `${ROOT}/reels/${code}.jpg`, seed)
  seed++
}

for (const [slug, fn] of Object.entries(scenes)) {
  if (!want(slug)) { seed++; continue }
  await still(fn, { w: 540, h: 960 }, `${ROOT}/work/${slug}.jpg`, seed)
  await loop(fn, slug, seed++)
  console.log('work', slug)
}

console.log('done')
