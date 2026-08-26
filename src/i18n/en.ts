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
    /* Caption under each phone. The key is the file name in public/media/reels/. */
    captions: {
      motherhood: 'Motherhood',
      beauty: 'Beauty & Style',
      unboxing: 'Unboxing',
      travel: 'Travel',
      lifestyle: 'Lifestyle',
      food: 'Food',
    },
    play: 'Play',
    unmute: 'Sound on',
    mute: 'Sound off',
    brandsHeading: "Brands I've worked with",
    disclaimer:
      'Brands that sent me products or booked me for paid UGC. A mix of both — not every name here is a paid campaign.',
  },

  /* ---------------------------------------------------------------- page 3 */
  /* The picture band between the profile and the audience page. It carries no
     visible text — this is the label a screen reader announces for it. */
  moments: {
    label: 'Moments from my content',
  },

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
    /* Tick labels under the age band. Numerals, but still on-screen text. */
    ageScale: ['13', '25', '35', '45', '65+'],
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
    note: 'These figures cover the last 30 days and are updated on the 5th of every month, straight from Instagram and TikTok Insights. Any question about them, just ask.',
    cta: 'Ask for the full insights',
  },

  /* ---------------------------------------------------------------- page 4 */
  services: {
    eyebrow: 'Services',
    title: 'What I can make for you.',
    lede: 'Short product videos are what I do most. Everything else supports that. I film and I am on camera; editing and planning I do with a small team I trust.',
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
        body: 'Send your brief and I go through it with my team, or send the product and leave it to us. Both are fine.',
      },
      {
        title: 'Dates you can plan around',
        body: 'You get the formats and dates we agreed on. What is included — revisions, extra formats, usage — depends on the package we settle on. If something shifts, you hear it from me early.',
      },
    ],
    cta: 'Start a project',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'My services and prices.',
    lede: 'Starting points, so you do not have to guess. The final quote depends on how the video is used.',
    from: 'from',
    cta: 'Ask for a quote',
    factorsTitle: 'What changes the price',
    factors: [
      'How many videos',
      'How much the shoot involves',
      'How quickly you need it',
      'Where and how long you use it',
    ],
    note: 'What each package covers — revisions, formats, how long and where you may use the video — we agree together, because it differs from project to project. Agencies are welcome: if you produce for your own clients, I quote it the same way.',
    tiers: {
      starter: {
        name: 'Startpaket',
        body: 'One product, one video, one clear idea. The quickest way to see how your product looks in someone real\u2019s hands.',
        points: [
          '1 vertical video, 15 to 30 seconds',
          'Hook, script and edit by me',
          'Filmed in daylight, at home, the way I film everything',
          'Raw footage on request',
          'Revisions and usage rights as agreed',
        ],
      },
      content: {
        name: 'Content Paket',
        body: 'A set, not a stack. Several videos for one product, planned together so they open differently, tell different halves of the story and still look like they belong to each other.',
        points: [
          '3 to 5 UGC videos',
          'Different hooks, so you can see which opening holds',
          'Cut for Reels, TikTok and Stories',
          'Stills from the shoot for your feed',
          'Revisions and usage rights as agreed',
        ],
      },
      ads: {
        name: 'Ad Creative Paket',
        body: 'Content built to be put behind a budget. Same product, several angles, each one written so the first two seconds do the work — because in an ad, that is all you get.',
        points: [
          '5 to 8 videos, made as ad creatives',
          'Several hooks per video, ready to test against each other',
          'Formats for Meta and TikTok Ads',
          'Voiceover in German, English or Arabic',
          'Ad usage rights as agreed',
        ],
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's talk.",
    lede: 'Tell me about the product and what you need. I go through every enquiry with my team and usually reply within two working days.',
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
    requiredNote: 'Fields marked * are required.',
    errors: {
      required: 'Please fill this in.',
      email: 'Please check this email address.',
      summary: 'Please complete the highlighted fields.',
    },
    submit: 'Send',
    sending: 'Sending…',
    success: 'Thank you, your message is on its way. I usually reply within two working days.',
    error: 'Something went wrong. You can email me directly at',
    fallback:
      'Direct sending did not work, so your email program is opening with everything already filled in — please press send there.',
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

  /* -------------------------------------------------------------- legal
     Two pages of their own, reached from the footer.

     The postal address and phone number are deliberately not here yet: Lynn
     is adding them herself. Nothing invented stands in for them, and no
     placeholder is published — an imprint with a made-up address is worse
     than one that is short. The VAT number says plainly that it has been
     applied for, which is true and is what the law expects while it is
     pending. A German imprint does require the address, so this stays
     incomplete until she fills it in.

     Anything still to be filled in is written between [square brackets] and
     rendered highlighted, so it cannot go unnoticed.

     The privacy text describes what this site actually does and nothing more:
     no cookies, no analytics, no embeds, no form endpoint. If any of that
     changes — in particular if VITE_FORM_ENDPOINT is ever set — the contact
     form section below has to be rewritten to match. */
  legal: {
    navLabel: 'Legal',
    back: 'Back to the site',
    updatedLabel: 'Last updated',
    updated: 'August 2026',

    imprint: {
      navLabel: 'Imprint',
      title: 'Imprint',
      intro: 'Information required under § 5 of the German Digital Services Act (DDG).',
      blocks: [
        {
          title: 'Service provider',
          lines: ['Lynn Kawqge', 'Germany'],
        },
        {
          title: 'Contact',
          lines: ['Email: hello@lynn-portfolio.com'],
        },
        {
          title: 'VAT identification number',
          lines: [
            'A VAT identification number under § 27a of the German VAT Act (UStG) has been applied for at the tax office and has not been issued yet. It will be added here as soon as it arrives.',
          ],
        },
        {
          title: 'Responsible for editorial content',
          lines: ['Lynn Kawqge (§ 18 (2) MStV)'],
        },
      ],
      disputeTitle: 'Consumer dispute resolution',
      dispute:
        'I am neither obliged nor willing to take part in dispute resolution proceedings before a consumer arbitration board.',
      liabilityTitle: 'Liability and copyright',
      liability: [
        'The content of this site was written with care. I am responsible for my own content under general law, but I am not obliged to monitor third-party information transmitted or stored here.',
        'This site links to external sites whose content I have no influence over. Responsibility lies with their respective providers. Nothing unlawful was apparent when the links were set.',
        'The photos, videos and texts here are mine unless marked otherwise. Any use beyond what copyright permits needs my written consent.',
      ],
    },

    privacy: {
      navLabel: 'Privacy',
      title: 'Privacy policy',
      intro:
        'This site collects as little as it possibly can: no cookies, no analytics, no tracking, no advertising. What follows describes exactly what happens — and deliberately claims nothing that does not.',
      sections: [
        {
          title: 'Who is responsible',
          body: [
            'Lynn Kawqge, Germany. Email: hello@lynn-portfolio.com'
          ],
        },
        {
          title: 'Hosting',
          body: [
            'This site is hosted on GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Like every web server, GitHub logs your IP address, the time, the file requested and your browser details in order to deliver the site and keep it secure. I have no access to those logs.',
            'Legal basis: Art. 6 (1) (f) GDPR. Processing takes place partly in the USA; GitHub belongs to Microsoft, which is certified under the EU-U.S. Data Privacy Framework.',
          ],
        },
        {
          title: 'No cookies, no tracking',
          body: [
            'No cookies, no analytics, no advertising, no embedded Instagram or TikTok content, and fonts served from this site rather than from Google. Nothing about your visit is measured, so no consent banner is needed.',
            'The only thing stored on your device is your language choice, under the key "lynn.lang". It contains nothing personal, is never sent anywhere, and is strictly necessary for a service you asked for (§ 25 (2) TDDDG). Clearing this site\u2019s data in your browser removes it.',
          ],
        },
        {
          title: 'Getting in touch',
          body: [
            'When you press send, the form transmits what you entered to FormSubmit (Sagitta Studio LLC, USA), which forwards it to me as an email. FormSubmit is the postman here and keeps no copy for me — no database, no spreadsheet, no account of any kind. Transmitted are: your name, company, email address, product and link, the three answers you chose, your brief, and any note you added.',
            'Legal basis: Art. 6 (1) (b) GDPR where a contract is involved, otherwise (f) — my interest in receiving enquiries at all. The transfer includes the USA. If you would rather not use the form, write to hello@lynn-portfolio.com directly; the address is on this page and works just as well.',
            'When you do write to me, I process what is in your message in order to answer it: Art. 6 (1) (b) GDPR where a contract is involved, otherwise Art. 6 (1) (f). I keep it as long as the enquiry and any resulting work require, then delete it. My mailbox is provided by Google Ireland Limited.',
          ],
        },
        {
          title: 'Links to Instagram and TikTok',
          body: [
            'Ordinary links, not plugins. A connection to those platforms is made only when you click one, and from that point their privacy policies apply, not this one.',
          ],
        },
        {
          title: 'Your rights',
          body: [
            'You can ask what data is held about you, and have it corrected, erased, restricted or handed over; you can object to processing based on legitimate interests (Art. 15 to 21 GDPR). An email to the address above is enough. You may also complain to a supervisory authority — for me, the Hamburg Commissioner for Data Protection and Freedom of Information.',
            'There is no automated decision-making and no profiling here. If the site ever gains a function that handles data differently, this page is updated with it.',
          ],
        },
      ],
    },
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
