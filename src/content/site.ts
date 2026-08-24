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
  /* The custom domain. Was a github.io project URL until lynn-portfolio.com
     was connected; the build's base path had to follow (see deploy.yml). */
  url: 'https://lynn-portfolio.com/',
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
 *      public/media/about.jpg    beside the About text       4:5 portrait
 * =============================================================================
 */
export const images = {
  cover: '/media/cover.jpg',
  about: '/media/about.jpg',

  /*
   * How the cover photo sits in its frame.
   *
   * A phone photo taken at arm's length puts the subject small and off-centre,
   * which is right for the photo and wrong for a cover. Rather than asking for
   * a re-crop, the frame zooms in: `coverZoom` is how far (1 = not at all), and
   * `coverFocus` is the point it zooms towards, as `x y` across the image.
   *
   * Both only need touching when the photo is replaced. Raise the zoom to come
   * closer; move the focus left/up by lowering the percentages.
   */
  coverZoom: 1.45,
  coverFocus: '58% 56%',
}

/*
 * =============================================================================
 *  THE MOMENTS BAND — five photos, no captions
 * =============================================================================
 *  A full-width strip of stills between the profile and the audience page. It
 *  is the one place on the site that is pure image: no headline over it, no
 *  text under it, nothing to read. That is the point — a media kit that is all
 *  columns of type reads like a CV, and a creator's page has to show the work
 *  looking like the work.
 *
 *  The five sit at different heights and drift at different speeds as the page
 *  scrolls, so the band moves like a hand-laid spread rather than a row of
 *  thumbnails. Order left to right.
 *
 *  REPLACING ONE: overwrite the file, keep the name. Portrait shots work best
 *  (4:5 or 9:16); they are cropped to the frame from the centre. Anything
 *  uploaded is recompressed on the way out, so the size does not matter.
 *
 *      public/media/moments/01.jpg … 05.jpg
 *
 *  Fewer than five is fine — delete a line and the band re-flows. More than
 *  five is fine too.
 * =============================================================================
 */
export const moments = [
  '/media/moments/01.jpg',
  '/media/moments/02.jpg',
  '/media/moments/03.jpg',
  '/media/moments/04.jpg',
  '/media/moments/05.jpg',
]

/*
 * =============================================================================
 *  FOLLOWER COUNTS — edit these two numbers and nothing else
 * =============================================================================
 *  Written as plain numbers, not text — the site formats them per language
 *  ("27,200" / "27.200") and counts up to them when the audience page scrolls
 *  into view.
 *
 *  Instagram and TikTok give no public way for a website to read a follower
 *  count on its own — see README, "Keeping the follower counts current".
 * =============================================================================
 */
export const socialStats = {
  instagramFollowers: 27200,
  tiktokFollowers: 1200,
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
/*  THE SIX REELS                                                             */
/* -------------------------------------------------------------------------- */

/*
 * The six clips that play in the phone frames on page 2.
 *
 * A frame can hold either a clip or a photo:
 *
 *     reel-1.mp4    a clip — plays by itself, muted, and loops
 *     reel-1.jpg    a photo — shown as it is
 *
 * With a clip, the still and the .webm are cut from the MP4 when the site is
 * built (scripts/media/optimize.mjs), so they can never drift apart from it and
 * neither is ever uploaded. `posterAt` picks the second the still comes from.
 *
 * With only a photo, leave `video` out. The frame then shows the photo, with no
 * sound button and no player — which is right: there is nothing to play.
 *
 * REPLACING ONE: overwrite the file, keep the name. Nothing in the code
 * changes, and the size does not matter — it is recompressed on the way out.
 * See public/media/UPLOAD.md.
 *
 * ADDING ANOTHER: one entry here plus one file.
 *
 * `code` is the shortcode from a published Reel's URL —
 * instagram.com/reel/<code>/ — and is optional. With it, the frame carries a
 * "watch on Instagram" link to that post; without it, no link is shown.
 *
 * None are set right now on purpose: which published Reel each photo belongs to
 * is not known here, and a link under the wrong topic is a claim the page
 * should not make. Add the shortcode to an entry once it is confirmed.
 */
export type Reel = {
  /**
   * File base name in `public/media/reels/` AND the caption key under
   * `reels.captions` in the dictionaries. One word, one topic, one file.
   */
  id: 'motherhood' | 'beauty' | 'unboxing' | 'travel' | 'lifestyle' | 'food'
  /** Leave out until a clip is uploaded — the photo then stands on its own. */
  video?: string
  poster: string
  /** Second the still is cut from. Default 0.5. */
  posterAt?: number
  code?: string
}

/*
 * THE ORDER HERE IS THE ORDER ON THE PAGE: three across the top row, three
 * across the bottom. Move a line to move a phone.
 *
 * Where `video` is commented out, no clip has been uploaded for that topic yet
 * and the frame shows the photo instead. Uncomment the line and drop the file
 * in to turn a frame back into a clip.
 */
export const featuredReels: Reel[] = [
  {
    id: 'motherhood',
    poster: '/media/reels/motherhood.jpg',
    video: '/media/reels/motherhood.mp4',
  },
  {
    id: 'beauty',
    poster: '/media/reels/beauty.jpg',
    video: '/media/reels/beauty.mp4',
  },
  {
    id: 'unboxing',
    poster: '/media/reels/unboxing.jpg',
    video: '/media/reels/unboxing.mp4',
  },
  {
    id: 'travel',
    poster: '/media/reels/travel.jpg',
    video: '/media/reels/travel.mp4',
  },
  {
    id: 'lifestyle',
    poster: '/media/reels/lifestyle.jpg',
    video: '/media/reels/lifestyle.mp4',
  },
  {
    id: 'food',
    poster: '/media/reels/food.jpg',
    video: '/media/reels/food.mp4',
  },
]

export const reelUrl = (code: string) => `https://www.instagram.com/reel/${code}/`

/* -------------------------------------------------------------------------- */
/*  BRANDS                                                                    */
/* -------------------------------------------------------------------------- */

/*
 * ONLY REAL BRANDS BELONG IN THIS LIST.
 *
 * A brand goes in here if Lynn actually received products from it or produced
 * paid UGC for it. Nothing aspirational, nothing "would fit the feed" — a name
 * on a media kit is a claim, and it is the one claim a brand manager can check
 * in a single message.
 *
 * ADDING ONE
 * ----------
 * A name on its own is enough and looks finished:
 *
 *     { name: 'Your Brand' },
 *
 * With a logo it looks like a media kit. Drop the file into
 * `public/media/brands/` and point at it. SVG is best; a PNG with a
 * transparent background works too:
 *
 *     { name: 'Your Brand', logo: '/media/brands/your-brand.svg', color: '#0a7b3c' },
 *
 * `color` is that brand's own colour, and it is what the tile lights up in
 * when the pointer is over it — the logo comes out of grey into full colour and
 * the cell takes a soft glow in the same tone. Leave it out and the tile uses
 * the site's blush instead, which still looks deliberate.
 *
 * `href` is optional and makes the tile a link to the brand.
 *
 * `name` is the image's alt text, so fill it in either way. The grid fills row
 * by row and handles any number of entries.
 */
export type Brand = {
  name: string
  logo?: string
  /** The brand's own colour, e.g. '#0a7b3c'. Used for the hover glow. */
  color?: string
  href?: string
}

/*
 * Names are spelled as the brands spell themselves: JBØRN with the slashed O,
 * StadtBäckerei with the capital B.
 *
 * The `.png` files are not what was uploaded. The uploads were JPEGs with a
 * background baked in — black behind JBØRN, white behind Moonkie, and a slice
 * of the shop's green banner behind Schacht — which on a sand tile is a black
 * square, a white square and a green stripe. `scripts/media/logos.mjs` lifts
 * the background off each one and writes the PNG; the originals are kept
 * beside them in `brands/_original/`. Run that script after uploading a new
 * logo.
 *
 * `color` is sampled from the logo itself, so the rule that appears under it on
 * hover is the brand's own colour rather than an approximation of it.
 */
export const brands: Brand[] = [
  {
    name: 'JBØRN',
    logo: '/media/brands/jborn.png',
    color: '#8e6f68',
    href: 'https://j-born.eu/de',
  },
  {
    name: 'Moonkie',
    logo: '/media/brands/moonkie.png',
    color: '#4b4b4b',
    href: 'https://moonkie.de',
  },
  {
    name: 'StadtBäckerei Schacht',
    logo: '/media/brands/schacht.png',
    color: '#84b52d',
    href: 'https://www.stadtbaeckerei-schacht.de/',
  },
]

/* -------------------------------------------------------------------------- */
/*  PRICING                                                                   */
/* -------------------------------------------------------------------------- */

/*
 * Starting prices, given by Lynn.
 *
 * Every one is a *starting* price — the word in front of it comes from `unit`,
 * which is a key under `pricing` in the dictionaries. That matters: a number
 * with no "from" in front of it is a quote, and a quote made before anyone has
 * said how the video will be used is a quote you have to take back.
 *
 * Prices live here and nowhere else — no component hard-codes a figure. Tier
 * names, descriptions and bullet points are translated under `pricing.tiers`
 * in the dictionaries.
 */
export const pricingTiers = [
  { key: 'starter', price: '€99', unit: 'from' },
  { key: 'content', price: '€299', unit: 'from' },
  { key: 'ads', price: '€599', unit: 'from' },
] as const
