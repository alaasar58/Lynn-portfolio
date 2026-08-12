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
    work: 'Work',
    services: 'Services',
    about: 'About',
    process: 'Process',
    partnerships: 'Partnerships',
    pricing: 'Pricing',
    contact: 'Contact',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    skip: 'Skip to content',
    /* Landmark names, announced by screen readers. */
    ariaPrimary: 'Main navigation',
    ariaMobile: 'Main navigation, mobile',
    ariaFooter: 'Footer navigation',
  },

  hero: {
    role: 'Digital Creator',
    location: 'Hamburg, Germany',
    tagline: 'Real products. Real life. Thoughtfully created.',
    /* ctaWork opens the portfolio; ctaContact is the inquiry CTA, reused by the
       header button so the two never drift apart. */
    ctaWork: 'View My Work',
    ctaContact: 'Work With Me',
    credLanguages: ['Arabic', 'English', 'German'],
    pillarsLabel: 'What I make',
    pillars: [
      'Motherhood',
      'Skincare',
      'Get Ready With Me',
      'Unboxing',
      'Travel',
      'Everyday life',
    ],
  },

  work: {
    eyebrow: 'Selected Work',
    title: 'Videos that look like a real day.',
    lede: 'My published Reels first, then everything sorted by topic.',
    featuredHeading: 'Published on Instagram',
    viewProfile: 'View profile',
    seeMore: 'More of my work on Instagram',
    byCategory: 'By topic',
    filterLabel: 'Filter work by topic',
    all: 'All',
    empty: 'More from this topic is coming soon.',
    brandsHeading: 'Products and brands I have made content around',
    disclaimer:
      'This is a mix of paid work and content I made with products I bought myself. Where a brand paid for a video, the card says so.',
    portfolioBadge: 'My own content',
    collaborationBadge: 'Paid collaboration',
    reelBadge: 'Reel',
    watchOnInstagram: 'Watch on Instagram',
    openOnInstagram: 'Open on Instagram',
    embedFallback: 'Not showing? Open the Reel on Instagram.',
    loadingReel: 'Loading the Reel…',
    play: 'Play',
    pause: 'Pause',
    unmute: 'Sound on',
    mute: 'Sound off',
    placeholderNote: 'These are placeholder visuals. Happy to send real footage.',
    categories: {
      motherhood: 'Motherhood',
      beauty: 'Beauty & Skincare',
      grwm: 'Get Ready With Me',
      unboxing: 'Unboxing',
      travel: 'Travel',
      lifestyle: 'Everyday life',
    },
    items: {
      'morning-light': {
        title: 'Morning light',
        note: 'Quiet everyday footage, natural pace',
      },
      'everyday-ritual': {
        title: 'Everyday ritual',
        note: 'A product in the middle of a normal morning',
      },
      'product-detail': {
        title: 'Product detail',
        note: 'Close up, with text on screen',
      },
      unboxing: {
        title: 'First impression',
        note: 'Opening the box, quick cuts, voiceover',
      },
      'feeding-routine': {
        title: 'Feeding routine',
        note: 'Showing how it works, in a real situation',
      },
      'baby-care': {
        title: 'Baby care essentials',
        note: 'The useful kind of video people save',
      },
      'skincare-routine': {
        title: 'Skincare routine',
        note: 'A short routine in daylight',
      },
      'texture-closeup': {
        title: 'Texture and finish',
        note: 'Very close up, slowed down',
      },
      'grwm-evening': {
        title: 'Getting ready',
        note: 'Mirror, warm light, voiceover',
      },
      'travel-day': {
        title: 'Travel day',
        note: 'A calm travel diary',
      },
    },
  },

  services: {
    eyebrow: 'Services',
    title: 'What I can make for you.',
    lede: 'Short product videos are what I do most. Everything else supports that.',
    coreLabel: 'What I do most',
    primaryTitle: 'Short product videos',
    primaryBody:
      'I film short vertical videos with a product actually being used. I take care of the idea, the filming, the edit and the final files. You can post them as they are, or run them as ads.',
    primaryIncludes: [
      'Product videos',
      'Everyday lifestyle content',
      'UGC-style videos',
      'Showing how a product works',
      'Telling a small story around a product',
      'Reels and TikToks',
    ],
    cta: 'Start a project',
    secondary: [
      {
        title: 'Voiceover and language versions',
        body: 'I speak Arabic and English on camera and record voiceovers in both. For German I write the captions, subtitles and the text on screen. So one product can reach more than one audience.',
      },
      {
        title: 'Extra footage and product photos',
        body: 'Clean additional clips and still photos you can use in your own edits, on product pages and in ads.',
      },
      {
        title: 'Editing',
        body: 'If you already have footage, I can cut it into a short video with pacing, text on screen, music and sound.',
      },
      {
        title: 'Ideas and hooks',
        body: 'Angles, opening lines and small scripts built around your product. Useful when you need ideas, not just footage.',
      },
    ],
    future:
      'For brands I work with regularly, I can also plan content month by month and put together bigger packages.',
  },

  about: {
    eyebrow: 'About',
    title: 'A little about me.',
    paragraphs: [
      "I'm Lynn, a digital creator based in Hamburg. I make content around motherhood, skincare, getting ready, unboxing, travel and ordinary days at home.",
      "I try a product first, then I film it. That is the order, and I think it is why the videos feel believable. Around 27,000 people follow along on Instagram, and they respond best when something is genuinely useful.",
      'I work in Arabic and English on camera, and in German for captions, subtitles and scripts. So one product can reach more than one audience without filming it twice.',
      "If a product isn't for me, I would rather say so than talk it up. That is what keeps my recommendations worth something.",
    ],
    valuesTitle: 'How I pick brands',
    valuesBody:
      "I work with products that fit me and the way I live. If something isn't the right fit, I will tell you early and kindly.",
    languagesTitle: 'Languages',
    languagesNote: 'One product, more than one audience, without a second shoot.',
    languages: [
      { name: 'Arabic', detail: 'On camera and voiceover' },
      { name: 'English', detail: 'On camera and voiceover' },
      {
        name: 'German',
        detail: 'Captions, subtitles, scripts, text on screen. Spoken on request',
      },
    ],
    audienceTitle: 'Audience',
    audience: {
      instagram: 'Instagram',
      tiktok: 'TikTok',
      /* Follower counts come from `socialStats` in src/content/site.ts and are
         formatted per language, so the number lives in exactly one place. */
      followers: 'followers',
      approx: '~',
      audienceLabel: 'Mostly',
      audienceValue: 'Women, mostly 18 to 35',
      reachLabel: 'Reach',
      reachValue: 'Germany and Arabic-speaking countries',
    },
  },

  process: {
    eyebrow: 'How it works',
    title: 'Easy on your side.',
    lede: 'Send me the product and what you have in mind. I take care of the rest.',
    note: 'Whether you leave it to me or send a detailed brief, both are fine.',
    cta: 'Send me a brief',
    steps: [
      {
        title: 'Brief',
        body: 'You tell me about the product, who it is for, and anything I should keep in mind: the key messages, what I may and may not say, and where the video will be used.',
      },
      {
        title: 'Idea',
        body: 'I think of a normal situation the product belongs in. If you have a clear brief, I follow it. If you would rather I come up with something, I will.',
      },
      {
        title: 'Filming',
        body: 'I film at home or wherever the product actually gets used. Close-ups, everyday scenes, and enough extra footage to work with.',
      },
      {
        title: 'Editing',
        body: 'I cut it all into one short video, with voiceover, text on screen and music where it fits.',
      },
      {
        title: 'Delivery',
        body: 'You get the finished files in the formats we agreed, on time. One round of changes is included.',
      },
    ],
  },

  partnerships: {
    eyebrow: 'Working together',
    title: 'The second video is always better than the first.',
    lede: 'Most of my best work is with brands I keep working with. Once I know your product and your audience, briefing me gets shorter and the videos get better.',
    preferred: 'My favourite way',
    models: [
      {
        title: 'Monthly',
        body: 'You send products, and we plan a set of videos each month. This is how I like to work best.',
      },
      {
        title: 'Now and then',
        body: 'We work together around launches and campaigns, without a fixed monthly commitment.',
      },
      {
        title: 'A package',
        body: 'A set number of videos for one product or one campaign.',
      },
      {
        title: 'One video',
        body: 'One video, one product. A good way to see how I work first.',
      },
    ],
    qualities: [
      {
        title: 'I answer quickly',
        body: 'Questions get answered fast and dates are confirmed in writing. You will not have to chase me.',
      },
      {
        title: 'Feedback is welcome',
        body: 'Tell me what worked and what did not. It is the fastest way to videos that fit your brand.',
      },
      {
        title: 'Flexible',
        body: 'Creative freedom where you want it, and close to the brief where you need it.',
      },
      {
        title: 'On time',
        body: 'You get the formats and dates we agreed on. If something shifts, I tell you early.',
      },
    ],
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'What it usually costs.',
    lede: "Every project is a little different, but you shouldn't have to guess. These are the starting points.",
    from: 'from',
    customFrom: 'depends on the month, from',
    cta: 'Ask for a quote',
    factorsTitle: 'What changes the price',
    factors: [
      'How many videos',
      'How complex the idea is',
      'How much the shoot involves',
      'How many rounds of changes',
      'How quickly you need it',
      'Where and how long you use it',
      'Whether you run it as an ad',
      'Extra files or formats',
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
      'Your brand guidelines, if you have them',
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
