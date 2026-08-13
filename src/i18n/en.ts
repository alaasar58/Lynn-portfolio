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
    customFrom: 'depends on the month, from',
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
      single: {
        name: 'One video',
        body: 'One short video: the idea, the filming, the edit and the final files.',
        points: ['1 vertical video', 'Revisions as agreed', 'Usage rights as agreed'],
      },
      package: {
        name: 'A package',
        body: 'A few videos for one product or campaign, planned together so they work as a set.',
        points: ['3 to 5 videos', 'Different angles and openings', 'Extras as agreed'],
      },
      monthly: {
        name: 'Every month',
        body: 'A set of videos every month, for brands who want content regularly.',
        points: ['5 to 10+ videos a month', 'Planning and ideas with my team', 'Priority in my calendar'],
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

  /* -------------------------------------------------------------- legal
     Two pages of their own, reached from the footer. Everything factual in
     here — address, phone, VAT — has to come from Lynn; anything still
     missing is written between [square brackets] and rendered highlighted,
     so it cannot go unnoticed.

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
          lines: [
            'Lynn Kawqge',
            '[Street and house number]',
            '[Postcode and town]',
            'Germany',
          ],
        },
        {
          title: 'Contact',
          lines: ['Email: lynnkawqge.ads@gmail.com', 'Phone: [Phone number]'],
        },
        {
          title: 'VAT identification number',
          lines: [
            'VAT identification number under § 27a of the German VAT Act (UStG): [VAT ID — or state that none has been issued]',
          ],
        },
        {
          title: 'Responsible for editorial content',
          lines: ['Lynn Kawqge, address as above (§ 18 (2) MStV)'],
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
            'Lynn Kawqge, [Street and house number], [Postcode and town], Germany. Email: lynnkawqge.ads@gmail.com',
          ],
        },
        {
          title: 'Hosting and server log files',
          body: [
            'This site is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.',
            'When you open the site, your browser sends technical data to GitHub that any web server receives: IP address, date and time, the file requested, the referring page, and browser and operating system details. GitHub processes this to deliver the site and to keep it secure. I have no access to these log files and cannot read them.',
            'The legal basis is Art. 6 (1) (f) GDPR: the legitimate interest in making the site available reliably and securely. Processing takes place partly in the USA; GitHub is part of the Microsoft group, which is certified under the EU-U.S. Data Privacy Framework.',
          ],
        },
        {
          title: 'No cookies, no analytics',
          body: [
            'This site sets no cookies, uses no analytics or statistics service, no advertising network, no heatmaps and no A/B testing. Nothing about your visit is measured or passed on, so no consent banner is needed.',
          ],
        },
        {
          title: 'Language setting',
          body: [
            'Your language choice is saved in your own browser under the key "lynn.lang", so you are not asked again on the next visit. It is a plain value on your device, contains nothing personal and is never sent to a server.',
            'Under § 25 (2) TDDDG this storage is strictly necessary for a service you explicitly requested, so it does not require consent. You can delete it at any time by clearing this site\u2019s data in your browser settings.',
          ],
        },
        {
          title: 'Fonts, photos and video',
          body: [
            'The typefaces are delivered from this site itself. No connection to Google Fonts or any other font service is made, and your IP address is not passed to a third party for that purpose.',
            'All photos and clips are files on this site. There is no external video player and no embedded Instagram or TikTok content, so those platforms learn nothing about your visit.',
          ],
        },
        {
          title: 'Contact form',
          body: [
            'The form sends nothing to a server of mine — there is none. When you press send, your own email program opens with the text you entered already filled in, and nothing leaves your device until you send that email yourself.',
            'What happens to the message after that is described in the next section.',
          ],
        },
        {
          title: 'Contact by email',
          body: [
            'If you write to me, I process the data in your message — name, email address, and whatever you tell me about your enquiry — to answer it. The legal basis is Art. 6 (1) (b) GDPR where it concerns a contract or its preparation, otherwise Art. 6 (1) (f) GDPR: the legitimate interest in answering enquiries.',
            'I keep the message for as long as answering it and any resulting collaboration require, and delete it once it is no longer needed and no statutory retention period applies. Email reaches me at the address above, hosted by Google Ireland Limited as the provider of that mailbox.',
          ],
        },
        {
          title: 'Links to Instagram and TikTok',
          body: [
            'The links to my profiles are ordinary links, not plugins. Nothing loads from those platforms while you are on this site. A connection is only made once you click a link, and from that moment the privacy policy of Meta Platforms Ireland Ltd. or TikTok Technology Ltd. applies, not this one.',
          ],
        },
        {
          title: 'Your rights',
          body: [
            'You have the right to access the data held about you, to have it corrected or erased, to have its processing restricted, to data portability, and to object to processing based on legitimate interests (Art. 15 to 21 GDPR). One email to the address above is enough.',
            'You may also complain to a supervisory authority. For me that is the Hamburg Commissioner for Data Protection and Freedom of Information.',
            'There is no automated decision-making and no profiling on this site.',
          ],
        },
        {
          title: 'Changes to this policy',
          body: [
            'If this site gains a function that processes data differently, this page is updated with it. The date above tells you which version you are reading.',
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
