/*
 * English — the primary language and the reference dictionary.
 *
 * The German and Arabic files must mirror this shape exactly; TypeScript will
 * flag any key that is missing or misspelled in a translation.
 *
 * VOICE
 * -----
 * First person, short sentences, one thought per sentence. Warm and polite,
 * the way you would write to one person who is considering working with you.
 * No agency vocabulary ("deliverables", "core service", "assets"), no
 * superlatives, and no sales pitch. If a sentence sounds like a brochure,
 * rewrite it.
 *
 * The site is four pages in one scroll: cover, profile, audience, offer.
 */
export const en = {
  meta: {
    name: 'English',
    /** Shown in the language switcher. */
    short: 'EN',
  },

  language: {
    title: 'Choose your language',
    subtitle: 'You can change this any time.',
    confirm: 'Continue',
  },

  nav: {
    about: 'About',
    audience: 'Audience',
    services: 'Services',
    contact: 'Contact',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    skip: 'Skip to content',
    /* Landmark names, announced by screen readers. */
    ariaPrimary: 'Main navigation',
    ariaMobile: 'Main navigation, mobile',
    ariaFooter: 'Footer navigation',
  },

  /* ---------------------------------------------------------------- page 1 */
  cover: {
    role: 'Digital Creator',
    /** Also the header and footer button, so the two never drift apart. */
    ctaContact: 'Work With Me',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    tiktokLabel: 'TikTok',
  },

  /* ---------------------------------------------------------------- page 2 */
  about: {
    eyebrow: 'About Me',
    title: 'I am Lynn.',
    paragraphs: [
      "I'm a mom and lifestyle creator based in Hamburg, Germany.",
      'My focus is on motherhood, skincare, GRWM, unboxing, travel and aesthetic lifestyle content.',
    ],
    valuesTitle: 'How I pick brands',
    valuesBody:
      'I work with products that fit me and the way I live. If something is not the right fit, I will tell you early and kindly.',
    languagesTitle: 'Languages',
    languagesNote: 'One product, more than one audience, without a second shoot.',
    languages: [
      { name: 'Arabic', detail: 'On camera and voiceover' },
      { name: 'English', detail: 'On camera and voiceover' },
      {
        name: 'German',
        detail: 'Captions, subtitles, scripts. Spoken on request',
      },
    ],
  },

  /* What is left of the old portfolio section: the three published Reels, the
     lightbox that plays them, and the brand wall. */
  work: {
    featuredHeading: 'Published on Instagram',
    viewProfile: 'View profile',
    reelBadge: 'Reel',
    watchOnInstagram: 'Watch on Instagram',
    openOnInstagram: 'Open on Instagram',
    embedFallback: 'Not showing? Open the Reel on Instagram.',
    loadingReel: 'Loading the Reel…',
    /* Caption under each phone. The key is the file name in public/media/reels/. */
    captions: {
      motherhood: 'Motherhood',
      skincare: 'Skincare',
      grwm: 'GRWM',
      unboxing: 'Unboxing',
      travel: 'Travel',
      lifestyle: 'Lifestyle',
    },
    play: 'Play',
    unmute: 'Sound on',
    mute: 'Sound off',
    brandsHeading: "Brands I've worked with",
    disclaimer:
      'A mix of paid work and content I made with products I bought myself.',
  },

  /* ---------------------------------------------------------------- page 3 */
  audience: {
    eyebrow: 'Audience',
    title: 'Who is watching.',
    lede: 'The numbers below are the ones I can show today. Anything marked as available on request comes straight from Instagram and TikTok Insights.',
    followers: 'followers',
    /* Prefix for approximate figures. */
    approx: '~',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    genderTitle: 'Gender',
    women: 'Women',
    men: 'Men and other',
    genderNote: 'From Instagram Insights, rounded.',
    ageTitle: 'Age',
    ageValue: 'Mostly 18 to 35',
    ageNote: 'The band my audience sits in. I have not broken it down further, so I am not going to guess at brackets.',
    reachTitle: 'Where they are',
    regions: ['Germany', 'Arabic-speaking countries'],
    reachNote: 'Country-level percentages on request.',
    /** Heading over the metrics that have no verified figure yet. */
    pendingTitle: 'Available on request',
    pendingLede:
      'I would rather send you a current screenshot from Insights than put a number here that ages badly.',
    pendingBadge: 'On request',
    pendingMetrics: [
      { label: 'Reach', note: 'Last 30 days, per platform' },
      { label: 'Impressions', note: 'Last 30 days' },
      { label: 'Engagement rate', note: 'Average across recent Reels' },
      { label: 'Best performing posts', note: 'With their figures' },
    ],
    note: 'Follower counts are updated by hand from Instagram and TikTok Insights.',
    cta: 'Ask for the full insights',
  },

  /* ---------------------------------------------------------------- page 4 */
  services: {
    eyebrow: 'Services',
    title: 'What I can make for you.',
    lede: 'Short product videos are what I do most. Everything else supports that.',
    offer: [
      {
        title: 'Reels and short-form video',
        body: 'Vertical video with a product actually being used. Idea, filming, edit, finished file — ready to post.',
      },
      {
        title: 'UGC for your ads',
        body: 'The same videos cut for paid use, with hooks and openings built to be tested against each other.',
      },
      {
        title: 'Unboxing and product detail',
        body: 'First impressions, close-ups and texture shots for product pages and launches.',
      },
      {
        title: 'Photos, extra footage and editing',
        body: 'Stills and clean clips for your own edits. If you already have footage, I can cut it instead.',
      },
    ],
    howItWorksTitle: 'How it works',
    howItWorks: [
      {
        title: 'Brief or free rein',
        body: 'Send a detailed brief, or send the product and leave it to me. Both are fine.',
      },
      {
        title: 'Dates you can plan around',
        body: 'You get the formats and dates we agreed on, with one round of changes. If something shifts, I tell you early.',
      },
    ],
    cta: 'Start a project',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'My services and prices.',
    lede: 'Starting points, so you do not have to guess. The final quote depends on how the video is used.',
    from: 'from',
    customFrom: 'depends on the month, from',
    cta: 'Ask for a quote',
    factorsTitle: 'What changes the price',
    factors: [
      'How many videos',
      'How much the shoot involves',
      'How quickly you need it',
      'Where and how long you use it',
    ],
    note: 'Agencies are welcome too. If you produce content for your own clients, I quote it the same way.',
    tiers: {
      single: {
        name: 'One video',
        body: 'One short video: the idea, the filming, the edit and the final files.',
        points: ['1 vertical video', '1 round of changes', 'Normal social use included'],
      },
      package: {
        name: 'A package',
        body: 'A few videos for one product or campaign, planned together so they work as a set.',
        points: ['3 to 5 videos', 'Different angles and openings', 'Extra clips and photos on request'],
      },
      monthly: {
        name: 'Every month',
        body: 'A set of videos every month, for brands who want content regularly.',
        points: ['5 to 10+ videos a month', 'Planning and ideas included', 'You get priority in my calendar'],
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's talk.",
    lede: 'Tell me about the product and what you need. I usually reply within two working days.',
    /** Subject line of the email the form opens when no endpoint is configured. */
    mailSubject: 'Project inquiry',
    /** Honeypot field label. Hidden from people, tempting to bots. */
    honeypot: 'Website',
    fields: {
      name: 'Your name',
      company: 'Company or brand',
      email: 'Email',
      product: 'Product',
      link: 'Link to the product or your site',
      contentType: 'What kind of video',
      videoCount: 'How many videos',
      timeline: 'When you need it',
      brief: 'What you have in mind',
      notes: 'Anything else',
    },
    optional: 'optional',
    select: 'Please choose',
    submit: 'Send',
    sending: 'Sending…',
    success: 'Thank you, your message is on its way. I usually reply within two working days.',
    error: 'Something went wrong. You can email me directly at',
    preferEmail: 'Prefer email?',
    helpfulTitle: 'Helpful to know',
    helpful: [
      'Who the video is for and what it should do',
      'What the product does and what to highlight',
      'Anything I must or must not say',
      'Where the video will be used',
    ],
    elsewhere: 'Find me here',
    contentTypes: [
      'A short product video',
      'Everyday lifestyle content',
      'UGC-style video',
      'Showing how the product works',
      'Video with voiceover',
      'Extra footage only',
      'Product photos',
      'A monthly package',
      'Not sure yet',
    ],
    videoCounts: ['1 video', '2 to 4 videos', '5 to 10 videos', 'More than 10', 'Every month'],
    timelines: [
      'As soon as possible',
      'Within 2 weeks',
      'Within a month',
      "I'm flexible",
      'Planning ahead',
    ],
  },

  footer: {
    cta: 'Work With Me',
    email: 'Email',
    rights: 'Digital Creator',
  },
}

/**
 * The contract every translation must satisfy. Types stay widened (plain
 * `string`, not literals) so other languages can supply their own wording while
 * TypeScript still enforces that no key is missing or misspelled.
 */
export type Dictionary = typeof en
