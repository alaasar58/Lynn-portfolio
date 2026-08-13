/*
 * =============================================================================
 *  SITE DATA
 * =============================================================================
 *  Everything here is language-independent: links, media paths, prices and the
 *  structure of the portfolio.
 *
 *  All visible *text* lives in `src/i18n/en.ts`, `de.ts` and `ar.ts`.
 *  A work item's title and description are looked up by its `id`, under
 *  `work.items` in those files.
 *
 *  Placeholders that still need real values are marked with  // TODO
 * =============================================================================
 */

export const site = {
  name: 'Lynn',
  /** Full name, used in the hero wordmark and the footer. */
  fullName: 'Lynn Kawqge',
  email: 'lynnkawqge.ads@gmail.com',
  // TODO: only needs changing if a custom domain is added.
  url: 'https://alaasar58.github.io/Lynn-portfolio/',
  socials: [
    {
      label: 'Instagram',
      handle: '@lynn_kawqge',
      href: 'https://www.instagram.com/lynn_kawqge/',
    },
    {
      label: 'TikTok',
      handle: '@lynn.kawqge',
      href: 'https://www.tiktok.com/@lynn.kawqge',
    },
  ],
} as const

/*
 * =============================================================================
 *  IMAGES — every one of these is a temporary file you replace
 * =============================================================================
 *  Overwrite the file at the path below, keeping the same name, and the site
 *  picks it up. No code change, ever. See public/media/UPLOAD.md for the full
 *  list with formats and sizes.
 *
 *      public/media/cover.jpg    the large image on page 1   4:5 portrait
 *      public/media/about.jpg    beside the About text       5:4 landscape
 * =============================================================================
 */
export const images = {
  cover: '/media/cover.jpg',
  about: '/media/about.jpg',
}

/*
 * =============================================================================
 *  FOLLOWER COUNTS — edit these two numbers and nothing else
 * =============================================================================
 *  Written as plain numbers, not text. The site formats them per language and
 *  uses them in two places: the figure in the hero strip ("27K" / "27 Tsd." /
 *  "27 ألف") and the audience list under About ("~27,000 followers").
 *
 *  Instagram and TikTok give no public way for a website to read a follower
 *  count on its own — see README, "Keeping the follower counts current".
 * =============================================================================
 */
export const socialStats = {
  instagramFollowers: 27000,
  tiktokFollowers: 1000,
}

/*
 * =============================================================================
 *  AUDIENCE — only figures that actually exist
 * =============================================================================
 *  The audience page shows what can be verified today and nothing else.
 *  A metric with `pending: true` renders as a designed "on request" state
 *  instead of a number. To publish a real figure, put it in `value` and drop
 *  the `pending` flag — no component changes.
 *
 *  Do not put an estimate in here. An invented reach figure is the one thing
 *  a brand can check and catch.
 * =============================================================================
 */
export const audienceFacts = {
  /** Share of the audience that is women, from Instagram Insights. Rounded. */
  womenPercent: 98,
  /** Month the follower counts and the split above were last read off Insights. */
  updated: '2026-08',
}

/** Section anchors. Labels come from `nav` in the dictionaries. */
export const nav = [
  { key: 'about', href: '#about' },
  { key: 'audience', href: '#audience' },
  { key: 'services', href: '#services' },
] as const

/* -------------------------------------------------------------------------- */
/*  THE THREE REELS                                                           */
/* -------------------------------------------------------------------------- */

/*
 * The three clips that play in the phone frames on page 2.
 *
 * Each one is ONE file in `public/media/reels/`, named after its `id`:
 *
 *     reel-1.mp4    the clip that plays
 *
 * REPLACING ONE: overwrite the file, keep the name. Nothing in the code
 * changes, and the size does not matter — it is recompressed on the way out.
 * See public/media/UPLOAD.md.
 *
 * ADDING A FOURTH: one entry here plus one file.
 *
 * The still and the .webm are NOT uploaded — both are cut from the MP4 when the
 * site is built (scripts/media/optimize.mjs), so they can never drift apart
 * from the clip. `posterAt` picks the second the still is taken from; leave it
 * out for half a second in.
 *
 * `code` is the shortcode from a published Reel's URL —
 * instagram.com/reel/<code>/ — and is optional. With it, the frame carries a
 * link to the original post; without it, no link is shown rather than a broken
 * one.
 */
export type Reel = {
  /** File base name in public/media/reels/. */
  id: string
  video: string
  poster: string
  /** Second the still is cut from. Default 0.5. */
  posterAt?: number
  code?: string
}

export const featuredReels: Reel[] = [
  {
    id: 'reel-1',
    video: '/media/reels/reel-1.mp4',
    poster: '/media/reels/reel-1.jpg',
    code: 'DabNET8N0QF',
  },
  {
    id: 'reel-2',
    video: '/media/reels/reel-2.mp4',
    poster: '/media/reels/reel-2.jpg',
    code: 'DZ5mjgghM2X',
  },
  {
    id: 'reel-3',
    video: '/media/reels/reel-3.mp4',
    poster: '/media/reels/reel-3.jpg',
    code: 'DZDj6BZttNH',
  },
]

export const reelUrl = (code: string) => `https://www.instagram.com/reel/${code}/`

/* -------------------------------------------------------------------------- */
/*  BRANDS                                                                    */
/* -------------------------------------------------------------------------- */

/*
 * Brands content has been created around. Presented as portfolio experience —
 * not as a claim that each one was a paid collaboration.
 *
 * ADDING ONE
 * ----------
 * Add a line here. A name on its own is enough and looks finished:
 *
 *     { name: 'Your Brand' },
 *
 * To show a logo instead, drop the file into `public/media/brands/` and point
 * at it. SVG is best; a PNG with a transparent background also works. Logos
 * render in greyscale and come to colour on hover, which is what keeps a mixed
 * set of marks from looking like a patchwork:
 *
 *     { name: 'Your Brand', logo: '/media/brands/your-brand.svg' },
 *
 * `name` is used as the image's alt text, so fill it in either way. The grid
 * fills row by row and handles any number of entries.
 */
export type Brand = { name: string; logo?: string }

export const brands: Brand[] = [
  { name: 'Farida Baby' },
  { name: 'MAM' },
  { name: 'Philips Avent' },
  { name: 'The Ordinary' },
]

/* -------------------------------------------------------------------------- */
/*  PRICING                                                                   */
/* -------------------------------------------------------------------------- */

/*
 * TODO: replace €XXX with the real starting prices.
 *
 * Prices live here and nowhere else — no component hard-codes a figure. Tier
 * names, descriptions and bullet points are translated under `pricing.tiers`
 * in the dictionaries.
 */
export const pricingTiers = [
  { key: 'single', price: '€XXX', unit: 'from' },
  { key: 'package', price: '€XXX', unit: 'from', featured: true },
  { key: 'monthly', price: '€XXX', unit: 'customFrom' },
] as const
