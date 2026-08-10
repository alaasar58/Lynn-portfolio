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

/** Section anchors. Labels come from `nav` in the dictionaries. */
export const nav = [
  { key: 'work', href: '#work' },
  { key: 'services', href: '#services' },
  { key: 'about', href: '#about' },
  { key: 'process', href: '#process' },
  { key: 'partnerships', href: '#partnerships' },
  { key: 'pricing', href: '#pricing' },
] as const

/** Figures in the hero credibility strip. Labels come from `hero.proof`. */
export const heroProof = [
  { key: 'community', value: '27K' },
  { key: 'languages', value: '3' },
  { key: 'categories', value: '5' },
  { key: 'reply', value: '48h' },
] as const

/* -------------------------------------------------------------------------- */
/*  FEATURED INSTAGRAM REELS                                                  */
/* -------------------------------------------------------------------------- */

export type Reel = {
  /** The shortcode from the Reel URL: instagram.com/reel/<code>/ */
  code: string
  /**
   * Optional cover image — save a still into `public/media/reels/` and set the
   * path here, e.g. '/media/reels/DabNET8N0QF.jpg'.
   */
  poster?: string
}

export const featuredReels: Reel[] = [
  { code: 'DabNET8N0QF' },
  { code: 'DZ5mjgghM2X' },
  { code: 'DZDj6BZttNH' },
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

export type CategoryKey = 'lifestyle' | 'product' | 'family' | 'beauty' | 'fashion'

/** Filter order in the portfolio. Labels come from `work.categories`. */
export const categoryKeys: CategoryKey[] = [
  'lifestyle',
  'product',
  'family',
  'beauty',
  'fashion',
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
    id: 'feeding-routine',
    category: 'family',
    video: '/media/work/feeding-routine.mp4',
    poster: '/media/work/feeding-routine.jpg',
  },
  {
    id: 'skincare-routine',
    category: 'beauty',
    video: '/media/work/skincare-routine.mp4',
    poster: '/media/work/skincare-routine.jpg',
  },
  {
    id: 'product-detail',
    category: 'product',
    video: '/media/work/product-detail.mp4',
    poster: '/media/work/product-detail.jpg',
  },
  {
    id: 'styling',
    category: 'fashion',
    video: '/media/work/styling.mp4',
    poster: '/media/work/styling.jpg',
    featured: true,
  },
  {
    id: 'baby-care',
    category: 'family',
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
    id: 'unboxing',
    category: 'product',
    video: '/media/work/unboxing.mp4',
    poster: '/media/work/unboxing.jpg',
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
