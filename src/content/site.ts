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
 *  picks it up. No code change, ever.
 *
 *      public/media/hero/portrait.jpg     the large hero image
 *      public/media/about/portrait.jpg    the image beside the About text
 *      public/media/work/<id>.jpg|mp4     portfolio covers and clips
 *      public/media/reels/<code>.jpg      covers for the featured Reels
 *
 *  What is there now was generated for this site: warm, soft-focus scenes in
 *  the palette, so nothing reads as an empty box before your photos arrive.
 *  Both portraits are 4:5 — a 4:5 crop replaces them cleanly.
 * =============================================================================
 */
export const images = {
  heroPortrait: '/media/hero/portrait.jpg',
  aboutPortrait: '/media/about/portrait.jpg',
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
/*  FEATURED INSTAGRAM REELS                                                  */
/* -------------------------------------------------------------------------- */

export type Reel = {
  /** The shortcode from the Reel URL: instagram.com/reel/<code>/ */
  code: string
  /** Cover image shown on the card. See the note below. */
  poster?: string
}

/*
 * Instagram does not let a website read a Reel's thumbnail without an approved
 * API token, so each cover has to be an image we host ourselves.
 *
 * The files below are placeholders in the site palette. To use the real ones:
 * take a still from each Reel (a screenshot of the best frame is fine), and
 * overwrite the matching file keeping the same name —
 *
 *     public/media/reels/DabNET8N0QF.jpg
 *
 * No code change needed. Export at 1080 × 1920, vertical, around 200 KB.
 */
export const featuredReels: Reel[] = [
  { code: 'DabNET8N0QF', poster: '/media/reels/DabNET8N0QF.jpg' },
  { code: 'DZ5mjgghM2X', poster: '/media/reels/DZ5mjgghM2X.jpg' },
  { code: 'DZDj6BZttNH', poster: '/media/reels/DZDj6BZttNH.jpg' },
]

export const reelUrl = (code: string) => `https://www.instagram.com/reel/${code}/`

export const reelEmbedUrl = (code: string) =>
  `https://www.instagram.com/reel/${code}/embed/captioned/`

/**
 * How a Reel card behaves when clicked.
 *
 *   'embed'  Opens the Reel in a lightbox using Instagram's official embed, so
 *            the visitor stays on the site. A direct link to the original post
 *            sits underneath in case the embed is blocked (ad blockers and some
 *            privacy settings refuse it).
 *   'link'   Skips the lightbox and opens the original Instagram post directly.
 */
export const reelDisplay: 'embed' | 'link' = 'embed'

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
