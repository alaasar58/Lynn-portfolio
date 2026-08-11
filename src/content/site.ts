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

/** Section anchors. Labels come from `nav` in the dictionaries. */
export const nav = [
  { key: 'work', href: '#work' },
  { key: 'services', href: '#services' },
  { key: 'about', href: '#about' },
  { key: 'process', href: '#process' },
  { key: 'partnerships', href: '#partnerships' },
  { key: 'pricing', href: '#pricing' },
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
/*  PORTFOLIO                                                                 */
/* -------------------------------------------------------------------------- */

export type CategoryKey =
  | 'motherhood'
  | 'beauty'
  | 'grwm'
  | 'unboxing'
  | 'travel'
  | 'lifestyle'

/** Filter order in the portfolio. Labels come from `work.categories`. */
export const categoryKeys: CategoryKey[] = [
  'motherhood',
  'beauty',
  'grwm',
  'unboxing',
  'travel',
  'lifestyle',
]

export type WorkItem = {
  /** Also the translation key under `work.items` in the dictionaries. */
  id: string
  category: CategoryKey
  /** Looping preview. Autoplays muted once the card scrolls into view. */
  video?: string
  /** Still shown before playback starts. Always worth providing. */
  poster?: string
  /** Gives an item a double-width tile, for the strongest pieces. */
  featured?: boolean
  /** Only for confirmed paid work — shows a "Brand collaboration" badge. */
  paid?: boolean
  brand?: string
}

/*
 * REPLACING THE MEDIA
 * -------------------
 * Every file below lives in `public/media/work/` and is named after the item's
 * id. To swap in real footage, overwrite the file keeping the same name — no
 * code change needed:
 *
 *     public/media/work/morning-light.mp4   ← your video
 *     public/media/work/morning-light.jpg   ← your cover image
 *
 * The current files are generated placeholders in the site's palette. See
 * `public/media/README.md` for recommended export settings.
 *
 * To add an item: copy a block, give it a new id, drop in the two files, and
 * add the same id under `work.items` in each dictionary.
 */
export const work: WorkItem[] = [
  {
    id: 'morning-light',
    category: 'lifestyle',
    video: '/media/work/morning-light.mp4',
    poster: '/media/work/morning-light.jpg',
    featured: true,
  },
  {
    id: 'grwm-evening',
    category: 'grwm',
    video: '/media/work/grwm-evening.mp4',
    poster: '/media/work/grwm-evening.jpg',
  },
  {
    id: 'skincare-routine',
    category: 'beauty',
    video: '/media/work/skincare-routine.mp4',
    poster: '/media/work/skincare-routine.jpg',
  },
  {
    id: 'feeding-routine',
    category: 'motherhood',
    video: '/media/work/feeding-routine.mp4',
    poster: '/media/work/feeding-routine.jpg',
  },
  {
    id: 'unboxing',
    category: 'unboxing',
    video: '/media/work/unboxing.mp4',
    poster: '/media/work/unboxing.jpg',
  },
  {
    id: 'travel-day',
    category: 'travel',
    video: '/media/work/travel-day.mp4',
    poster: '/media/work/travel-day.jpg',
    featured: true,
  },
  {
    id: 'baby-care',
    category: 'motherhood',
    video: '/media/work/baby-care.mp4',
    poster: '/media/work/baby-care.jpg',
  },
  {
    id: 'texture-closeup',
    category: 'beauty',
    video: '/media/work/texture-closeup.mp4',
    poster: '/media/work/texture-closeup.jpg',
  },
  {
    id: 'product-detail',
    category: 'unboxing',
    video: '/media/work/product-detail.mp4',
    poster: '/media/work/product-detail.jpg',
  },
  {
    id: 'everyday-ritual',
    category: 'lifestyle',
    video: '/media/work/everyday-ritual.mp4',
    poster: '/media/work/everyday-ritual.jpg',
  },
]

/**
 * Products and brands content has been created around. Presented as portfolio
 * experience — not as a claim that each one was a paid collaboration.
 */
export const experienceBrands = ['Farida Baby', 'MAM', 'Philips Avent', 'The Ordinary']

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
