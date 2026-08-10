/*
 * =============================================================================
 *  SITE CONTENT
 * =============================================================================
 *  Everything written on the website lives in this one file. Editing text,
 *  prices, portfolio pieces or contact details never requires touching a
 *  component — change the values below and the site updates.
 *
 *  Placeholders that still need real values are marked with  // TODO
 * =============================================================================
 */

export const site = {
  name: 'Lynn',
  role: 'Lifestyle & Product Content Creator',
  email: 'lynnkawqge.ads@gmail.com',
  location: 'Germany · Working with brands worldwide',
  // TODO: set to the deployed URL (used for SEO / social share tags).
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

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'Pricing', href: '#pricing' },
] as const

export const hero = {
  eyebrow: 'Lifestyle & Product Content Creator',
  title: 'Lifestyle & product content for brands.',
  lede: 'Authentic short-form content designed to make products feel natural, useful and worth discovering.',
  primaryCta: { label: 'Work With Me', href: '#contact' },
  secondaryCta: { label: 'View My Work', href: '#work' },
  // Short credibility strip under the hero. Kept factual and understated.
  proof: [
    { value: '27K', label: 'Instagram community' },
    { value: '3', label: 'Languages on camera & in text' },
    { value: '5', label: 'Content categories' },
    { value: '48h', label: 'Typical reply time' },
  ],
}

/* -------------------------------------------------------------------------- */
/*  FEATURED INSTAGRAM REELS                                                  */
/* -------------------------------------------------------------------------- */

export type Reel = {
  /** The shortcode from the Reel URL: instagram.com/reel/<code>/ */
  code: string
  /** Card headline. TODO: rename each one to describe the actual video. */
  title: string
  /** One short supporting line under the title. */
  note: string
  /**
   * Optional cover image — save a still from the Reel into
   * `public/media/reels/<code>.jpg` and set the path here. Without one the card
   * shows a warm tonal panel, which still looks intentional.
   */
  poster?: string
}

/**
 * How a Reel card behaves when clicked.
 *
 *   'embed'  Opens the Reel in a lightbox using Instagram's official embed, so
 *            the visitor stays on the site. A direct link to the original post
 *            sits underneath in case the embed is blocked (ad blockers and some
 *            privacy settings refuse it).
 *   'link'   Skips the lightbox and opens the original Instagram post directly.
 *
 * Switch to 'link' if the embed ever proves unreliable — no other change needed.
 */
export const reelDisplay: 'embed' | 'link' = 'embed'

/**
 * Published Reels shown as featured work. Each card opens the real Instagram
 * post — embedded in a lightbox on the site, with a direct link to the original
 * always available.
 */
export const featuredReels: Reel[] = [
  {
    code: 'DabNET8N0QF',
    title: 'Featured Reel',
    note: 'Watch on Instagram',
  },
  {
    code: 'DZ5mjgghM2X',
    title: 'Featured Reel',
    note: 'Watch on Instagram',
  },
  {
    code: 'DZDj6BZttNH',
    title: 'Featured Reel',
    note: 'Watch on Instagram',
  },
]

/** Canonical public URL for a Reel. */
export const reelUrl = (code: string) => `https://www.instagram.com/reel/${code}/`

/** Instagram's official embed endpoint, used inside the lightbox. */
export const reelEmbedUrl = (code: string) =>
  `https://www.instagram.com/reel/${code}/embed/captioned/`

/* -------------------------------------------------------------------------- */
/*  WORK                                                                      */
/* -------------------------------------------------------------------------- */

export type WorkCategory =
  | 'Lifestyle'
  | 'Product'
  | 'Family & Baby'
  | 'Beauty'
  | 'Fashion & Accessories'

export const workCategories: WorkCategory[] = [
  'Lifestyle',
  'Product',
  'Family & Baby',
  'Beauty',
  'Fashion & Accessories',
]

export type WorkItem = {
  id: string
  title: string
  category: WorkCategory
  /** Short line describing the piece — format, angle or deliverable. */
  note: string
  /**
   * Optional media. Drop files into `public/media/work/` and reference them as
   * `/media/work/<file>`. Until a file is added, a styled placeholder shows in
   * its place, so the layout is already correct before the media lands.
   */
  video?: string
  poster?: string
  /** Marks confirmed paid brand work. Everything else reads as portfolio work. */
  paid?: boolean
  /** Optional brand name, only where the collaboration is confirmed. */
  brand?: string
}

/*
 * Category portfolio, shown below the featured Reels.
 *
 * Order matters — the strongest pieces should sit first, they carry the page.
 * These are open slots waiting for media: each one renders as a styled
 * placeholder until a `video` / `poster` path is added, so the grid always
 * looks finished. Delete any slot that is not needed.
 *
 * TODO: add video + poster paths as the files become available.
 */
export const work: WorkItem[] = [
  {
    id: 'baby-feeding-set',
    title: 'Baby feeding set',
    category: 'Family & Baby',
    note: 'Product demonstration · voiceover · everyday feeding routine',
  },
  {
    id: 'breast-pump',
    title: 'Breast pump & milk storage',
    category: 'Family & Baby',
    note: 'Product storytelling · real use at home',
  },
  {
    id: 'skincare-routine',
    title: 'Skincare routine',
    category: 'Beauty',
    note: 'Short-form routine video · close-ups · natural light',
  },
  {
    id: 'hijab-styling',
    title: 'Hijab & accessories',
    category: 'Fashion & Accessories',
    note: 'Styling video · texture and fabric detail',
  },
  {
    id: 'morning-lifestyle',
    title: 'Morning at home',
    category: 'Lifestyle',
    note: 'Lifestyle B-roll · calm, clean, natural pacing',
  },
  {
    id: 'sterilizer',
    title: 'Bottle sterilizer',
    category: 'Product',
    note: 'How-it-works demonstration · on-screen text',
  },
  {
    id: 'postpartum-essentials',
    title: 'Postpartum essentials',
    category: 'Family & Baby',
    note: 'Useful-information format · one of the strongest performing angles',
  },
  {
    id: 'everyday-carry',
    title: 'Everyday product picks',
    category: 'Product',
    note: 'Multi-product short-form edit · fast cuts',
  },
  {
    id: 'hospital-bag',
    title: 'Hospital bag preparation',
    category: 'Lifestyle',
    note: 'Preparation guide · high saves and shares',
  },
]

/*
 * Products and brands the creator has produced content around. Presented as
 * portfolio experience — not as a claim that each one was a paid collaboration.
 */
export const experienceBrands = [
  'Farida Baby',
  'MAM',
  'Philips Avent',
  'The Ordinary',
]

/* -------------------------------------------------------------------------- */
/*  SERVICES                                                                  */
/* -------------------------------------------------------------------------- */

export const services = {
  primary: {
    title: 'Short-Form Product Content',
    body: 'The core of what I do: vertical video built around a product being genuinely used. Concept, filming, editing and delivery — ready to post or run as an ad.',
    includes: [
      'Product videos',
      'Lifestyle product content',
      'UGC-style content',
      'Product demonstrations',
      'Product storytelling',
      'Reels & TikTok content',
    ],
  },
  secondary: [
    {
      title: 'Voiceover & Language Versions',
      body: 'Arabic and English on camera and as voiceover, German captions, subtitles and on-screen text — the same product, adapted per market.',
    },
    {
      title: 'B-Roll & Product Photography',
      body: 'Clean supporting footage and still imagery for your own edits, product pages, ads and social channels.',
    },
    {
      title: 'Editing & Post-Production',
      body: 'Multi-clip short-form edits with pacing, on-screen text, music, sound design and product close-ups.',
    },
    {
      title: 'Creative Concepts & Hooks',
      body: 'Angles, hooks and scripts developed around your product and audience — useful when you need ideas, not just footage.',
    },
  ],
  // Kept deliberately understated: production is the current core business.
  future:
    'Monthly content packages, content planning and social media management can be added for long-term partners.',
}

/* -------------------------------------------------------------------------- */
/*  ABOUT                                                                     */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: 'About',
  title: 'I make products feel like part of a real life — because they are.',
  paragraphs: [
    'I create lifestyle and product content for brands: short-form video built around products I actually use. Real product, real use, real experience — that is the order I work in, and it is the reason the content lands.',
    'My background is in everyday lifestyle content, with a strong specialisation in family and baby products, alongside beauty, skincare, fashion and everyday e-commerce products. My community of around 27,000 responds best to content that is genuinely useful, so that is what I build.',
    'I work in Arabic and English on camera and as voiceover, and in German for captions, subtitles, scripts and on-screen text — which makes it straightforward to adapt one product for several markets.',
    'I am honest about what a product does. If something is worth mentioning, I mention it. That is what keeps the recommendation credible, and it is what makes the content work.',
  ],
  values: {
    title: 'How I choose brands',
    body: 'I selectively collaborate with brands and products that align with my personal values. When something is not the right fit, I will say so early and openly.',
  },
  languages: [
    { name: 'Arabic', detail: 'On camera · Voiceover' },
    { name: 'English', detail: 'On camera · Voiceover' },
    {
      name: 'German',
      detail: 'Captions · Subtitles · Scripts · On-screen text · Spoken on request',
    },
  ],
  audience: [
    { label: 'Instagram', value: '~27,000 followers' },
    { label: 'TikTok', value: '~1,000 followers' },
    { label: 'Audience', value: '~98% women, mainly 18–35' },
    { label: 'Reach', value: 'Germany & Arabic-speaking markets' },
  ],
}

/* -------------------------------------------------------------------------- */
/*  PROCESS                                                                   */
/* -------------------------------------------------------------------------- */

export const process = [
  {
    step: '01',
    title: 'Briefing',
    body: 'You send the product, the goal and anything I need to respect: target audience, key messages, required and prohibited claims, brand guidelines and usage.',
  },
  {
    step: '02',
    title: 'Concept',
    body: 'I develop a natural concept around a real situation the product belongs in. I work well with creative freedom, and just as well with a tightly defined brief.',
  },
  {
    step: '03',
    title: 'Create',
    body: 'Filming in a real lifestyle or usage setting — demonstrations, storytelling, lifestyle footage, B-roll and product close-ups.',
  },
  {
    step: '04',
    title: 'Edit',
    body: 'Multiple clips cut into dynamic short-form video, with voiceover, on-screen text, music and sound design as the concept requires.',
  },
  {
    step: '05',
    title: 'Deliver',
    body: 'Final content delivered in your agreed formats and aspect ratios, on schedule, with a revision round included.',
  },
]

/* -------------------------------------------------------------------------- */
/*  PARTNERSHIPS                                                              */
/* -------------------------------------------------------------------------- */

export const partnerships = {
  eyebrow: 'Partnerships',
  title: 'The second video is always better than the first.',
  lede: 'Most of my best work comes from brands I keep working with. Once I know your product, your audience and how you like things framed, every round gets sharper — and briefing me gets shorter.',
  models: [
    {
      title: 'Monthly content partnership',
      body: 'You send products, we plan a set of videos each month. The most effective way to work together, and my preferred model.',
      featured: true,
    },
    {
      title: 'Recurring collaborations',
      body: 'Ongoing work around launches, seasons and campaigns, without a fixed monthly commitment.',
    },
    {
      title: 'Content packages',
      body: 'A defined set of videos around one product or campaign.',
    },
    {
      title: 'Single product video',
      body: 'One video, one product. A good place to start if you want to see how I work first.',
    },
  ],
  qualities: [
    {
      title: 'Clear communication',
      body: 'Questions answered quickly, timelines confirmed in writing, no chasing.',
    },
    {
      title: 'Feedback is welcome',
      body: 'Tell me what worked and what did not. It is the fastest route to content that fits your brand.',
    },
    {
      title: 'Flexible within your rules',
      body: 'Creative freedom where you want it, tight brief adherence where you need it.',
    },
    {
      title: 'Reliable delivery',
      body: 'Agreed formats, agreed dates. If something changes, you hear it from me first.',
    },
  ],
}

/* -------------------------------------------------------------------------- */
/*  PRICING                                                                   */
/* -------------------------------------------------------------------------- */

/*
 * TODO: confirm the starting prices below before the site goes live.
 * These are placeholders — every tier is phrased as "starting from" so the
 * final quote always depends on scope.
 */
export const pricing = {
  eyebrow: 'Pricing',
  title: 'Transparent starting points.',
  lede: 'Every project is quoted individually, but you should not have to guess at the level. These are the starting points.',
  tiers: [
    {
      name: 'Single Video',
      price: '€XXX', // TODO
      unit: 'starting from',
      body: 'One short-form video: concept, filming, editing and delivery in your formats.',
      points: ['1 vertical video', '1 revision round', 'Organic usage included'],
    },
    {
      name: 'Content Package',
      price: '€XXX', // TODO
      unit: 'starting from',
      body: 'A set of videos around one product or campaign, planned together so the pieces work as a series.',
      points: ['3–5 videos', 'Varied hooks & angles', 'B-roll and stills on request'],
      featured: true,
    },
    {
      name: 'Monthly Content',
      price: '€XXX', // TODO
      unit: 'custom, starting from',
      body: 'Recurring monthly production for brands who want a steady stream of content and a creator who knows their product.',
      points: ['5–10+ videos per month', 'Planning & concepts included', 'Priority scheduling'],
    },
  ],
  factorsTitle: 'What shapes the final quote',
  factors: [
    'Number of videos',
    'Creative complexity',
    'Production effort',
    'Revision rounds',
    'Turnaround time',
    'Usage rights & duration',
    'Paid advertising usage',
    'Additional deliverables',
  ],
  note: 'Agencies producing content for their own clients are welcome — white-label and multi-brand production can be quoted on the same basis.',
}

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                   */
/* -------------------------------------------------------------------------- */

export const contact = {
  eyebrow: 'Contact',
  title: 'Start a project.',
  lede: 'Tell me about the product and what you need. I usually reply within two working days.',
  contentTypes: [
    'Short-form product video',
    'Lifestyle product content',
    'UGC-style content',
    'Product demonstration',
    'Voiceover video',
    'B-roll',
    'Product photography',
    'Monthly content package',
    'Not sure yet',
  ],
  timelines: ['As soon as possible', 'Within 2 weeks', 'Within a month', 'Flexible', 'Planning ahead'],
  videoCounts: ['1 video', '2–4 videos', '5–10 videos', '10+ videos', 'Monthly, ongoing'],
}
