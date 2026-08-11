/*
 * English — the primary language and the reference dictionary.
 *
 * The German and Arabic files must mirror this shape exactly; TypeScript will
 * flag any key that is missing or misspelled in a translation.
 */
export const en = {
  meta: {
    name: 'English',
    /** Shown in the language switcher. */
    short: 'EN',
  },

  language: {
    title: 'Choose your language',
    subtitle: 'You can change this at any time.',
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
  },

  hero: {
    role: 'Mom & Lifestyle Digital Creator',
    location: 'Hamburg, Germany',
    /* The headline is set in two parts so the second can be styled in italic. */
    title: 'Motherhood, beauty, and',
    titleAccent: 'everything in between.',
    lede: "I'm Lynn — a mom and lifestyle creator in Hamburg, making aesthetic short-form content around motherhood, skincare, getting ready, unboxing and travel.",
    primaryCta: 'Work With Me',
    secondaryCta: 'View My Work',
    pillarsLabel: 'What I create',
    pillars: [
      'Motherhood',
      'Skincare',
      'Get Ready With Me',
      'Unboxing',
      'Travel',
      'Aesthetic lifestyle',
    ],
    proof: {
      community: 'Instagram community',
      languages: 'Languages on camera & in text',
      categories: 'Content categories',
      reply: 'Typical reply time',
    },
  },

  work: {
    eyebrow: 'Selected Work',
    title: 'Product content that looks like real life.',
    lede: 'Published Reels first, then the categories I work across.',
    featuredHeading: 'Featured on Instagram',
    viewProfile: 'View profile',
    seeMore: 'See more of my work on Instagram',
    byCategory: 'By category',
    filterLabel: 'Filter work by category',
    all: 'All',
    empty: 'More work in this category is coming soon.',
    brandsHeading: 'Products & brands I have created content around',
    disclaimer:
      'Selected portfolio and personal product content. Not all pieces shown were paid collaborations — brand partnerships are labelled where they apply.',
    portfolioBadge: 'Portfolio work',
    collaborationBadge: 'Brand collaboration',
    reelBadge: 'Reel',
    watchOnInstagram: 'Watch on Instagram',
    openOnInstagram: 'Open on Instagram',
    embedFallback: 'Not loading? Open the Reel on Instagram.',
    loadingReel: 'Loading Reel…',
    play: 'Play',
    pause: 'Pause',
    unmute: 'Unmute',
    mute: 'Mute',
    placeholderNote: 'Placeholder preview — final footage on request.',
    categories: {
      motherhood: 'Motherhood',
      beauty: 'Beauty & Skincare',
      grwm: 'Get Ready With Me',
      unboxing: 'Unboxing',
      travel: 'Travel',
      lifestyle: 'Lifestyle',
    },
    items: {
      'morning-light': {
        title: 'Morning light',
        note: 'Lifestyle B-roll · calm, natural pacing',
      },
      'everyday-ritual': {
        title: 'Everyday ritual',
        note: 'Lifestyle storytelling · product in real use',
      },
      'product-detail': {
        title: 'Product detail',
        note: 'Close-up demonstration · on-screen text',
      },
      unboxing: {
        title: 'First impression',
        note: 'Unboxing · fast cuts · voiceover',
      },
      'feeding-routine': {
        title: 'Feeding routine',
        note: 'Product demonstration · everyday situation',
      },
      'baby-care': {
        title: 'Baby care essentials',
        note: 'Useful-information format · high saves',
      },
      'skincare-routine': {
        title: 'Skincare routine',
        note: 'Short-form routine · natural light',
      },
      'texture-closeup': {
        title: 'Texture & finish',
        note: 'Macro detail · slow motion',
      },
      'grwm-evening': {
        title: 'Evening get ready',
        note: 'GRWM · natural light · voiceover',
      },
      'travel-day': {
        title: 'Travel day',
        note: 'Travel diary · slow, aesthetic pacing',
      },
    },
  },

  services: {
    eyebrow: 'Services',
    title: 'What I make for brands.',
    lede: 'Short-form product content is the core. Everything else exists to support it.',
    coreLabel: 'Core service',
    primaryTitle: 'Short-Form Product Content',
    primaryBody:
      'The core of what I do: vertical video built around a product being genuinely used. Concept, filming, editing and delivery — ready to post or run as an ad.',
    primaryIncludes: [
      'Product videos',
      'Lifestyle product content',
      'UGC-style content',
      'Product demonstrations',
      'Product storytelling',
      'Reels & TikTok content',
    ],
    cta: 'Start a Project',
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
    future:
      'Monthly content packages, content planning and social media management can be added for long-term partners.',
  },

  about: {
    eyebrow: 'About',
    title: 'A mom, a creator, and a soft spot for the everyday.',
    paragraphs: [
      "I'm Lynn, a mom and lifestyle creator based in Hamburg, Germany. My focus is on motherhood, skincare, get ready with me, unboxing, traveling, and aesthetic lifestyle content.",
      'For brands, that means short-form video built around products I actually use. Real product, real use, real experience — that is the order I work in, and it is the reason the content lands. My community of around 27,000 responds best to content that is genuinely useful, so that is what I build.',
      'I work in Arabic and English on camera and as voiceover, and in German for captions, subtitles, scripts and on-screen text — which makes it straightforward to adapt one product for several markets.',
      'I am honest about what a product does. If something is worth mentioning, I mention it. That is what keeps the recommendation credible, and it is what makes the content work.',
    ],
    valuesTitle: 'How I choose brands',
    valuesBody:
      'I selectively collaborate with brands and products that align with my personal values. When something is not the right fit, I will say so early and openly.',
    languagesTitle: 'Languages',
    languagesNote:
      'One product, several markets — content adapted for German and Arabic-speaking audiences without a second production.',
    languages: [
      { name: 'Arabic', detail: 'On camera · Voiceover' },
      { name: 'English', detail: 'On camera · Voiceover' },
      {
        name: 'German',
        detail: 'Captions · Subtitles · Scripts · On-screen text · Spoken on request',
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
      audienceLabel: 'Audience',
      audienceValue: '~98% women, mainly 18–35',
      reachLabel: 'Reach',
      reachValue: 'Germany & Arabic-speaking markets',
    },
  },

  process: {
    eyebrow: 'Process',
    title: 'Simple on your side.',
    lede: 'Send the product and the brief. I handle everything between that and the finished files.',
    note: 'Creative freedom or a tight brief — both work.',
    cta: 'Send a brief',
    steps: [
      {
        title: 'Briefing',
        body: 'You send the product, the goal and anything I need to respect: target audience, key messages, required and prohibited claims, brand guidelines and usage.',
      },
      {
        title: 'Concept',
        body: 'I develop a natural concept around a real situation the product belongs in. I work well with creative freedom, and just as well with a tightly defined brief.',
      },
      {
        title: 'Create',
        body: 'Filming in a real lifestyle or usage setting — demonstrations, storytelling, lifestyle footage, B-roll and product close-ups.',
      },
      {
        title: 'Edit',
        body: 'Multiple clips cut into dynamic short-form video, with voiceover, on-screen text, music and sound design as the concept requires.',
      },
      {
        title: 'Deliver',
        body: 'Final content delivered in your agreed formats and aspect ratios, on schedule, with a revision round included.',
      },
    ],
  },

  partnerships: {
    eyebrow: 'Partnerships',
    title: 'The second video is always better than the first.',
    lede: 'Most of my best work comes from brands I keep working with. Once I know your product, your audience and how you like things framed, every round gets sharper — and briefing me gets shorter.',
    preferred: 'Preferred',
    models: [
      {
        title: 'Monthly content partnership',
        body: 'You send products, we plan a set of videos each month. The most effective way to work together, and my preferred model.',
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
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Transparent starting points.',
    lede: 'Every project is quoted individually, but you should not have to guess at the level. These are the starting points.',
    from: 'starting from',
    customFrom: 'custom, starting from',
    cta: 'Request a quote',
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
    tiers: {
      single: {
        name: 'Single Video',
        body: 'One short-form video: concept, filming, editing and delivery in your formats.',
        points: ['1 vertical video', '1 revision round', 'Organic usage included'],
      },
      package: {
        name: 'Content Package',
        body: 'A set of videos around one product or campaign, planned together so the pieces work as a series.',
        points: ['3–5 videos', 'Varied hooks & angles', 'B-roll and stills on request'],
      },
      monthly: {
        name: 'Monthly Content',
        body: 'Recurring monthly production for brands who want a steady stream of content and a creator who knows their product.',
        points: ['5–10+ videos per month', 'Planning & concepts included', 'Priority scheduling'],
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Start a project.',
    lede: 'Tell me about the product and what you need. I usually reply within two working days.',
    fields: {
      name: 'Name',
      company: 'Company / Brand',
      email: 'Email',
      product: 'Product',
      link: 'Product or website link',
      contentType: 'Type of content',
      videoCount: 'Number of videos',
      timeline: 'Desired timeline',
      brief: 'Brief / campaign goal',
      notes: 'Additional information',
    },
    optional: 'optional',
    select: 'Select…',
    submit: 'Send inquiry',
    sending: 'Sending…',
    success: 'Thank you — your inquiry is on its way. I usually reply within two working days.',
    error: 'Something went wrong. Please email me directly at',
    preferEmail: 'Prefer email?',
    helpfulTitle: 'Helpful to include',
    helpful: [
      'Target audience and campaign goal',
      'Product features and key messages',
      'Required and prohibited claims',
      'Brand guidelines and desired style',
      'Where the content will be used',
    ],
    elsewhere: 'Elsewhere',
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
    videoCounts: ['1 video', '2–4 videos', '5–10 videos', '10+ videos', 'Monthly, ongoing'],
    timelines: [
      'As soon as possible',
      'Within 2 weeks',
      'Within a month',
      'Flexible',
      'Planning ahead',
    ],
  },

  footer: {
    cta: 'Work With Me',
    email: 'Email',
    rights: 'Mom & Lifestyle Digital Creator',
  },
}

/**
 * The contract every translation must satisfy. Types stay widened (plain
 * `string`, not literals) so other languages can supply their own wording while
 * TypeScript still enforces that no key is missing or misspelled.
 */
export type Dictionary = typeof en
