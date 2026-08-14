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
/*
 * One scene per topic in the phone frames. Each renders a still and a looping
 * video. The middle and the top-left stay clear: the play mark sits in one, the
 * Dynamic Island over the other.
 */
const reels = {
  motherhood: (d) => ({
    ...W9,
    body:
      S.babyBottle(12 + sway(d, 0.45), W9.floorY, 19, 36) +
      S.stack(60, W9.floorY, 28, 3) +
      S.plant(40, W9.floorY, 14, 24),
  }),
  /* One tile for both halves of the topic: the skincare shelf on the floor,
     the ring light and the brushes behind it. */
  beauty: (d) => ({
    ...W9,
    body:
      S.ringLight(62, 38 + sway(d, 0.5), 16, W9.floorY) +
      S.mirror(28, 42, 13) +
      S.pumpBottle(12 + sway(d, 0.4), W9.floorY, 14, 32, C.bone) +
      S.jar(34, W9.floorY, 22, 15, C.sand) +
      S.brushCup(62, W9.floorY, 14, 16) +
      S.dropper(82, W9.floorY, 12, 25, C.blush),
  }),
  unboxing: (d) => ({
    ...W9,
    body:
      S.openBox(18 + sway(d, 0.4), W9.floorY, 46, 30) +
      S.dropper(76, W9.floorY, 12, 26, C.blush) +
      S.plain(20, W9.floorY - 34, 30, 3, C.sand, 0.7),
  }),
  travel: (d) => ({
    ...W9,
    body:
      S.suitcase(16 + sway(d, 0.5), W9.floorY, 52, 33) +
      S.circle(78, W9.floorY - 12, 9, C.blush) +
      S.plain(70, W9.floorY - 3, 20, 3, C.sand, 0.6),
  }),
  lifestyle: (d) => ({
    ...W9,
    body:
      S.window_(18 + sway(d, 0.6), 34, 44, 52) +
      S.mug(30, W9.floorY, 13, 11) +
      S.plant(70, W9.floorY, 15, 30),
  }),
  /* The bakery shoot: rolls on a board, the paper bag they came in, coffee. */
  food: (d) => ({
    ...W9,
    body:
      S.plain(16, 54 + sway(d, 0.6), 46, 2.5, C.sandDeep, 0.6) +
      S.jar(24, 54 + sway(d, 0.6), 13, 11, C.bone) +
      S.roll(52, 54 + sway(d, 0.6), 14, C.clay) +
      S.paperBag(74 + sway(d, 0.4), W9.floorY, 20, 34) +
      S.board(24, W9.floorY - 3, 44) +
      S.roll(38 + sway(d, 0.3), W9.floorY - 3, 20, C.clay) +
      S.roll(58, W9.floorY - 3, 16, C.clayDeep) +
      S.mug(6, W9.floorY, 14, 12),
  }),
}

/** Cover: 4:5, padded ~8% because the organic clip path eats the edges. */
const cover = (d) => ({
  vbW: 100,
  vbH: 125,
  floorY: 96,
  body:
    S.ringLight(68, 38 + sway(d, 0.5), 18, 96) +
    S.figure(40 + sway(d, 0.25), 96, 74, C.clay) +
    S.phoneOnTripod(74, 74, 9, 15, 96) +
    S.plant(10, 96, 14, 28),
})

/** About: 5:4 landscape, matching how Profile.tsx renders it. A flat-lay desk. */
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

async function loop(sceneFn, out, seed) {
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
    '-crf', '30', '-movflags', '+faststart', '-an', `${out}.mp4`])
  execFileSync(ffmpeg, [...input, '-c:v', 'libvpx-vp9', '-crf', '40', '-b:v', '0', '-row-mt', '1',
    '-an', `${out}.webm`])
  rmSync(TMP, { recursive: true, force: true })
}

/* Optional filter so one thing can be re-rendered: `npm run media cover travel` */
const only = process.argv.slice(2)
const want = (name) => only.length === 0 || only.includes(name)

mkdirSync(`${ROOT}/reels`, { recursive: true })

if (want('cover')) await still(cover, { w: 1200, h: 1500 }, `${ROOT}/cover.jpg`, 11)
if (want('about')) await still(about, { w: 1200, h: 960 }, `${ROOT}/about.jpg`, 12)

let seed = 20
for (const [id, fn] of Object.entries(reels)) {
  if (!want(id)) { seed++; continue }
  await still(fn, { w: 540, h: 960 }, `${ROOT}/reels/${id}.jpg`, seed)
  await loop(fn, `${ROOT}/reels/${id}`, seed++)
  console.log('reel', id)
}

console.log('done')
