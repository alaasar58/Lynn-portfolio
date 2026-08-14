/*
 * The drawing vocabulary for the placeholder illustrations.
 *
 * Flat shapes, one contour colour, a single light wash, no gradients inside
 * objects. Silhouettes only — a drawn face would read as "some other person"
 * in the slot where a real photo is going to go.
 *
 * COMPOSITION RULES, forced on us by what the site paints on top:
 *  - Work covers (9:16): VideoCard lays an ink gradient over the bottom 60% and
 *    puts the title there. Everything that must stay readable lives above
 *    y = 100 of 178, and the floor below it is left plain on purpose.
 *  - Reel covers (9:16): FeaturedReels centres a play button and puts a badge
 *    top-left, so the middle and the top-left corner stay clear.
 *  - `featured: true` items are rendered in a double-width tile and centre-
 *    cropped to roughly 2:1, so their detail has to sit in the vertical middle.
 *  - The hero image is clipped to an organic contour that eats the corners, so
 *    it gets ~8% padding on every side.
 */

/** From the @theme block in src/index.css — that file is the source of truth. */
export const C = {
  bone: '#faf7f3',
  sand: '#f2ebe3',
  sandDeep: '#e7ddd2',
  blush: '#f0dcd8',
  blushMid: '#d9a9a3',
  clay: '#b98a70',
  clayDeep: '#9c6f57',
  sage: '#8c9484',
  ink: '#221f1c',
}

const L = C.clayDeep // contour
const SW = 0.7 // contour width

/* ---------------------------------------------------------------- primitives */

export const rect = (x, y, w, h, fill, r = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${L}" stroke-width="${SW}"/>`

export const plain = (x, y, w, h, fill, r = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`

export const circle = (cx, cy, r, fill, stroke = true) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke ? ` stroke="${L}" stroke-width="${SW}"` : ''}/>`

export const ellipse = (cx, cy, rx, ry, fill, stroke = false) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"${stroke ? ` stroke="${L}" stroke-width="${SW}"` : ''}/>`

export const path = (d, fill = 'none', stroke = true, w = SW) =>
  `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${L}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"` : ''}/>`

/** Soft contact shadow under an object standing on the floor. */
export const shadow = (cx, cy, rx) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.16}" fill="${C.clay}" opacity="0.20"/>`

/* -------------------------------------------------------------------- objects */

/** Pump bottle — the skincare workhorse. Base sits on `y`. */
export const pumpBottle = (x, y, w, h, fill = C.bone) => {
  const neck = w * 0.3
  return [
    shadow(x + w / 2, y + 1, w * 0.72),
    rect(x, y - h, w, h, fill, w * 0.22),
    rect(x + (w - neck) / 2, y - h - h * 0.13, neck, h * 0.13, C.sandDeep, neck * 0.3),
    path(`M${x + w / 2 - neck * 0.1},${y - h - h * 0.13} v${-h * 0.1} h${w * 0.26}`),
  ].join('')
}

/** Dropper bottle. */
export const dropper = (x, y, w, h, fill = C.blush) =>
  [
    shadow(x + w / 2, y + 1, w * 0.7),
    rect(x, y - h, w, h, fill, w * 0.18),
    rect(x + w * 0.28, y - h - h * 0.18, w * 0.44, h * 0.18, C.clay, w * 0.14),
  ].join('')

/** Low, wide jar. */
export const jar = (x, y, w, h, fill = C.sand) =>
  [
    shadow(x + w / 2, y + 1, w * 0.7),
    rect(x, y - h, w, h, fill, w * 0.18),
    rect(x - w * 0.04, y - h - h * 0.3, w * 1.08, h * 0.3, C.sandDeep, w * 0.1),
  ].join('')

/** Mug with handle. */
export const mug = (x, y, w, h, fill = C.bone) =>
  [
    shadow(x + w / 2, y + 1, w * 0.65),
    path(`M${x},${y - h} h${w} v${h * 0.72} a${w / 2},${h * 0.3} 0 0 1 ${-w},0 Z`, fill),
    path(`M${x + w},${y - h + h * 0.18} a${w * 0.3},${h * 0.22} 0 0 1 0,${h * 0.42}`),
  ].join('')

/** Bread roll — a dome with a single score across it. Base sits on `y`. */
export const roll = (cx, y, w, fill = C.clay) => {
  const h = w * 0.62
  return [
    shadow(cx, y + 0.5, w * 0.56),
    path(`M${cx - w / 2},${y} a${w / 2},${h} 0 0 1 ${w},0 Z`, fill),
    path(`M${cx - w * 0.26},${y - h * 0.55} q${w * 0.26},${-h * 0.28} ${w * 0.52},0`),
  ].join('')
}

/** Wooden board the rolls stand on. */
export const board = (x, y, w, h = 3) =>
  [shadow(x + w / 2, y + h + 0.5, w * 0.52), rect(x, y, w, h, C.clayDeep, h * 0.5)].join('')

/** Paper bakery bag, folded over at the top. */
export const paperBag = (x, y, w, h) =>
  [
    shadow(x + w / 2, y + 1, w * 0.66),
    rect(x, y - h, w, h, C.sand, w * 0.06),
    rect(x - w * 0.03, y - h - h * 0.12, w * 1.06, h * 0.12, C.sandDeep, w * 0.05),
    path(`M${x + w * 0.5},${y - h} v${h}`, 'none', true, SW * 0.7),
  ].join('')

/** Baby bottle with teat. */
export const babyBottle = (x, y, w, h, fill = C.bone) =>
  [
    shadow(x + w / 2, y + 1, w * 0.7),
    rect(x, y - h, w, h, fill, w * 0.28),
    rect(x + w * 0.16, y - h - h * 0.1, w * 0.68, h * 0.1, C.blushMid, w * 0.2),
    path(`M${x + w * 0.34},${y - h - h * 0.1} q${w * 0.16},${-h * 0.16} ${w * 0.32},0`, C.blush),
    path(`M${x + w * 0.18},${y - h * 0.55} h${w * 0.64}`),
  ].join('')

/** Ring light on a stand — the one object that says "creator" instantly. */
export const ringLight = (cx, cy, r, floorY) =>
  [
    `<circle cx="${cx}" cy="${cy}" r="${r * 1.5}" fill="${C.blush}" opacity="0.45"/>`,
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${L}" stroke-width="${SW * 1.6}"/>`,
    `<circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="none" stroke="${C.blushMid}" stroke-width="${SW}"/>`,
    path(`M${cx},${cy + r} V${floorY}`),
    path(`M${cx - r * 0.42},${floorY} h${r * 0.84}`),
  ].join('')

/** Phone standing on a small tripod. */
export const phoneOnTripod = (cx, y, w, h, floorY) => {
  const top = y - h
  return [
    rect(cx - w / 2, top, w, h, C.ink, w * 0.16),
    plain(cx - w / 2 + w * 0.12, top + h * 0.08, w * 0.76, h * 0.84, C.sandDeep, w * 0.08),
    path(`M${cx},${y} V${floorY - 2}`),
    path(`M${cx - w * 0.5},${floorY} L${cx},${floorY - 2} L${cx + w * 0.5},${floorY}`),
  ].join('')
}

/** Standing figure, three-quarter from behind. Head is a plain circle. */
export const figure = (cx, floorY, h, coat = C.clay) => {
  const headR = h * 0.105
  const shoulder = floorY - h * 0.7
  const headY = shoulder - h * 0.13
  const halfW = h * 0.15
  return [
    shadow(cx, floorY + 1, halfW * 1.35),
    // Hair reads as one soft mass behind the head, falling to the shoulders.
    `<path d="M${cx - headR * 1.3},${headY} a${headR * 1.3},${headR * 1.3} 0 0 1 ${headR * 2.6},0
       l${headR * 0.15},${h * 0.19} q${-headR * 1.45},${headR * 0.5} ${-headR * 2.9},0 Z"
       fill="${C.clayDeep}"/>`,
    circle(cx, headY, headR, C.blushMid),
    path(
      `M${cx - halfW},${floorY}
       L${cx - halfW * 0.82},${shoulder + h * 0.04}
       Q${cx},${shoulder - h * 0.05} ${cx + halfW * 0.82},${shoulder + h * 0.04}
       L${cx + halfW},${floorY} Z`,
      coat,
    ),
  ].join('')
}

/** Open shipping box seen from the front, flaps out. */
export const openBox = (x, y, w, h) =>
  [
    shadow(x + w / 2, y + 1, w * 0.62),
    rect(x, y - h, w, h, C.sandDeep, 1),
    path(`M${x},${y - h} l${-w * 0.22},${-h * 0.34} l${w * 0.44},0 Z`, C.sand),
    path(`M${x + w},${y - h} l${w * 0.22},${-h * 0.34} l${-w * 0.44},0 Z`, C.sand),
    path(`M${x + w * 0.16},${y - h} q${w * 0.34},${-h * 0.5} ${w * 0.68},0`, C.blush),
  ].join('')

/** Suitcase, open, with folded clothes. */
export const suitcase = (x, y, w, h) =>
  [
    shadow(x + w / 2, y + 1, w * 0.6),
    rect(x, y - h, w, h, C.clay, w * 0.05),
    plain(x + w * 0.08, y - h * 0.78, w * 0.36, h * 0.2, C.bone, 0.6),
    plain(x + w * 0.08, y - h * 0.52, w * 0.36, h * 0.2, C.blush, 0.6),
    plain(x + w * 0.54, y - h * 0.78, w * 0.36, h * 0.46, C.sand, 0.6),
    path(`M${x},${y - h * 0.5} h${w}`),
    path(`M${x + w * 0.36},${y - h} v${-h * 0.12} h${w * 0.28} v${h * 0.12}`),
  ].join('')

/** Folded stack of clothes / towels. */
export const stack = (x, y, w, n = 3, fills = [C.bone, C.blush, C.sand]) => {
  const hh = 3.2
  const out = [shadow(x + w / 2, y + 1, w * 0.58)]
  for (let i = 0; i < n; i++) {
    out.push(rect(x + i * 0.6, y - (i + 1) * hh, w - i * 1.2, hh, fills[i % fills.length], 0.8))
  }
  return out.join('')
}

/** Potted plant. */
export const plant = (x, floorY, w, h) =>
  [
    shadow(x + w / 2, floorY + 1, w * 0.6),
    path(`M${x + w * 0.5},${floorY - h * 0.32} q${-w * 0.55},${-h * 0.3} ${-w * 0.15},${-h * 0.66}`, C.sage),
    path(`M${x + w * 0.5},${floorY - h * 0.32} q${w * 0.5},${-h * 0.24} ${w * 0.2},${-h * 0.58}`, C.sage),
    path(`M${x + w * 0.5},${floorY - h * 0.32} v${-h * 0.5}`),
    path(`M${x},${floorY - h * 0.32} h${w} l${-w * 0.14},${h * 0.32} h${-w * 0.72} Z`, C.clay),
  ].join('')

/** Round mirror on the wall. */
export const mirror = (cx, cy, r) =>
  [circle(cx, cy, r, C.sand), circle(cx, cy, r * 0.86, C.bone, false)].join('')

/** Window with a curtain — the morning-light motif. */
export const window_ = (x, y, w, h) =>
  [
    rect(x, y, w, h, C.bone, 1),
    path(`M${x + w / 2},${y} v${h}`),
    path(`M${x},${y + h / 2} h${w}`),
    path(`M${x + w},${y} q${w * 0.3},${h * 0.5} ${-w * 0.06},${h}`, C.sand),
  ].join('')

/** Cup of brushes. */
export const brushCup = (x, y, w, h) =>
  [
    shadow(x + w / 2, y + 1, w * 0.62),
    path(`M${x + w * 0.24},${y - h * 0.9} l${w * 0.1},${-h * 0.5}`, 'none', true, SW * 1.4),
    path(`M${x + w * 0.5},${y - h * 0.9} v${-h * 0.62}`, 'none', true, SW * 1.4),
    path(`M${x + w * 0.76},${y - h * 0.9} l${-w * 0.1},${-h * 0.54}`, 'none', true, SW * 1.4),
    rect(x, y - h, w, h, C.blushMid, w * 0.16),
  ].join('')

/* ------------------------------------------------------------------- assembly */

/**
 * Wraps scene markup in a full SVG: warm ground, a light wash from the upper
 * left, the floor plane, then the objects, then grain. The grain matters — flat
 * fills band badly in JPEG without it.
 */
export function frame({ w, h, vbW, vbH, floorY, wall = C.sand, floor = C.sandDeep, body, seed = 3 }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${vbW} ${vbH}">
  <defs>
    <radialGradient id="lw" cx="26%" cy="12%" r="72%">
      <stop offset="0%" stop-color="${C.bone}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${C.bone}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>
  <rect width="${vbW}" height="${vbH}" fill="${wall}"/>
  <rect x="0" y="${floorY}" width="${vbW}" height="${vbH - floorY}" fill="${floor}"/>
  <line x1="0" y1="${floorY}" x2="${vbW}" y2="${floorY}" stroke="${L}" stroke-width="${SW}" opacity="0.55"/>
  <rect width="${vbW}" height="${vbH}" fill="url(#lw)"/>
  ${body}
  <rect width="${vbW}" height="${vbH}" filter="url(#grain)" opacity="0.07"/>
</svg>`)
}
