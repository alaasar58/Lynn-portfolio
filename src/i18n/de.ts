import type { Dictionary } from './en'

/**
 * German. Mirrors the structure of `en.ts` exactly.
 *
 * Address form is `du` throughout: the person reading is one marketing manager
 * or founder, not a committee, and `du` is normal in the creator field. If this
 * ever needs to be `Sie`, it is one consistent pass through this file.
 */
export const de: Dictionary = {
  meta: {
    name: 'Deutsch',
    short: 'DE',
  },

  language: {
    title: 'Wähle deine Sprache',
    subtitle: 'Du kannst das jederzeit ändern.',
    confirm: 'Weiter',
  },

  nav: {
    about: 'Über mich',
    audience: 'Zielgruppe',
    services: 'Leistungen',
    contact: 'Kontakt',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    skip: 'Zum Inhalt springen',
    ariaPrimary: 'Hauptnavigation',
    ariaMobile: 'Hauptnavigation, mobil',
    ariaFooter: 'Navigation im Fußbereich',
  },

  cover: {
    role: 'Digital Creator',
    ctaContact: 'Zusammenarbeiten',
    emailLabel: 'E-Mail',
    instagramLabel: 'Instagram',
    tiktokLabel: 'TikTok',
  },

  about: {
    eyebrow: 'Über mich',
    title: 'Ich bin Lynn.',
    paragraphs: [
      'Ich bin Mama und Lifestyle-Creator aus Hamburg.',
      'Mein Schwerpunkt liegt auf Mutterschaft, Hautpflege, GRWM, Unboxing, Reisen und ästhetischem Lifestyle-Content.',
    ],
    valuesTitle: 'Wie ich Marken aussuche',
    valuesBody:
      'Ich arbeite mit Produkten, die zu mir und meinem Alltag passen. Wenn etwas nicht passt, sage ich dir das früh und freundlich.',
    languagesTitle: 'Sprachen',
    languagesNote: 'Ein Produkt, mehrere Zielgruppen, ohne zweiten Drehtag.',
    languages: [
      { name: 'Arabisch', detail: 'Vor der Kamera und als Voiceover' },
      { name: 'Englisch', detail: 'Vor der Kamera und als Voiceover' },
      {
        name: 'Deutsch',
        detail: 'Untertitel, Captions, Skripte. Gesprochen auf Anfrage',
      },
    ],
  },


  work: {
    featuredHeading: 'Auf Instagram veröffentlicht',
    viewProfile: 'Profil ansehen',
    reelBadge: 'Reel',
    watchOnInstagram: 'Auf Instagram ansehen',
    openOnInstagram: 'Auf Instagram öffnen',
    embedFallback: 'Wird nichts angezeigt? Öffne das Reel auf Instagram.',
    loadingReel: 'Reel wird geladen …',
    /* Caption under each phone. The key is the file name in public/media/reels/. */
    captions: {
      motherhood: 'Mutterschaft',
      skincare: 'Hautpflege',
      grwm: 'GRWM',
      unboxing: 'Unboxing',
      travel: 'Reisen',
      lifestyle: 'Lifestyle',
    },
    play: 'Abspielen',
    unmute: 'Ton an',
    mute: 'Ton aus',
    brandsHeading: 'Marken, mit denen ich gearbeitet habe',
    disclaimer:
      'Eine Mischung aus bezahlten Aufträgen und Inhalten mit Produkten, die ich selbst gekauft habe.',
  },

  audience: {
    eyebrow: 'Zielgruppe',
    title: 'Wer zuschaut.',
    lede: 'Unten stehen die Zahlen, die ich heute zeigen kann. Alles, was als „auf Anfrage“ markiert ist, kommt direkt aus den Instagram- und TikTok-Insights.',
    followers: 'Follower',
    approx: '~',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    genderTitle: 'Geschlecht',
    women: 'Frauen',
    men: 'Männer und andere',
    genderNote: 'Aus den Instagram-Insights, gerundet.',
    ageTitle: 'Alter',
    ageValue: 'Meist zwischen 18 und 35',
    ageNote: 'Das ist die Spanne, in der meine Zielgruppe liegt. Feiner habe ich es nicht ausgewertet, und raten möchte ich nicht.',
    reachTitle: 'Wo sie sind',
    regions: ['Deutschland', 'Arabischsprachige Länder'],
    reachNote: 'Prozente pro Land auf Anfrage.',
    pendingTitle: 'Auf Anfrage',
    pendingLede:
      'Ich schicke dir lieber einen aktuellen Screenshot aus den Insights, als hier eine Zahl hinzuschreiben, die schnell veraltet.',
    pendingBadge: 'Auf Anfrage',
    pendingMetrics: [
      { label: 'Reichweite', note: 'Letzte 30 Tage, pro Plattform' },
      { label: 'Impressionen', note: 'Letzte 30 Tage' },
      { label: 'Interaktionsrate', note: 'Durchschnitt der letzten Reels' },
      { label: 'Beste Beiträge', note: 'Mit den dazugehörigen Zahlen' },
    ],
    note: 'Die Zahlen beziehen sich auf die letzten 30 Tage und werden am 5. jedes Monats aktualisiert, direkt aus den Instagram- und TikTok-Insights. Wenn du Fragen dazu hast, frag einfach.',
    cta: 'Vollständige Insights anfragen',
  },

  services: {
    eyebrow: 'Leistungen',
    title: 'Was ich für dich machen kann.',
    lede: 'Kurze Produktvideos mache ich am meisten. Alles andere unterstützt das. Vor der Kamera stehe ich selbst, beim Schnitt und in der Planung arbeite ich mit einem kleinen Team, dem ich vertraue.',
    offer: [
      {
        title: 'Reels und Kurzvideos',
        body: 'Hochkant-Video mit einem Produkt, das wirklich benutzt wird. Idee, Dreh, Schnitt, fertige Datei — bereit zum Posten.',
      },
      {
        title: 'UGC für deine Anzeigen',
        body: 'Dieselben Videos für bezahlte Nutzung geschnitten, mit Hooks und Einstiegen, die man gegeneinander testen kann.',
      },
      {
        title: 'Unboxing und Produktdetails',
        body: 'Erste Eindrücke, Nahaufnahmen und Texturen für Produktseiten und Launches.',
      },
      {
        title: 'Fotos, Zusatzmaterial und Schnitt',
        body: 'Fotos und saubere Clips für deine eigenen Schnitte. Wenn du schon Material hast, schneide ich stattdessen.',
      },
    ],
    howItWorksTitle: 'So läuft es ab',
    howItWorks: [
      {
        title: 'Briefing oder freie Hand',
        body: 'Schick mir dein Briefing, ich gehe es mit meinem Team durch. Oder schick einfach das Produkt und überlass den Rest uns. Beides passt.',
      },
      {
        title: 'Termine, auf die du dich verlassen kannst',
        body: 'Du bekommst die vereinbarten Formate und Termine. Was dabei ist — Korrekturrunden, zusätzliche Formate, Nutzungsrechte — hängt vom Paket ab, auf das wir uns einigen. Wenn sich etwas verschiebt, sage ich früh Bescheid.',
      },
    ],
    cta: 'Projekt anfragen',
  },

  pricing: {
    eyebrow: 'Preise',
    title: 'Meine Leistungen und Preise.',
    lede: 'Einstiegspreise, damit du nicht raten musst. Das Angebot hängt davon ab, wie das Video genutzt wird.',
    from: 'ab',
    customFrom: 'je nach Monat, ab',
    cta: 'Angebot anfragen',
    factorsTitle: 'Was den Preis verändert',
    factors: [
      'Wie viele Videos',
      'Wie viel der Dreh braucht',
      'Wie schnell du es brauchst',
      'Wo und wie lange du es nutzt',
    ],
    note: 'Was in einem Paket steckt — Korrekturrunden, Formate, wo und wie lange du das Video nutzen darfst — legen wir gemeinsam fest, das ist von Projekt zu Projekt verschieden. Agenturen sind genauso willkommen: Wenn du für eigene Kunden produzierst, rechne ich das genauso ab.',
    tiers: {
      single: {
        name: 'Ein Video',
        body: 'Ein kurzes Video: Idee, Dreh, Schnitt und die fertigen Dateien.',
        points: ['1 Hochkant-Video', 'Korrekturen nach Vereinbarung', 'Nutzungsrechte nach Vereinbarung'],
      },
      package: {
        name: 'Ein Paket',
        body: 'Mehrere Videos für ein Produkt oder eine Kampagne, zusammen geplant, damit sie als Reihe funktionieren.',
        points: ['3 bis 5 Videos', 'Verschiedene Ansätze und Einstiege', 'Extras nach Vereinbarung'],
      },
      monthly: {
        name: 'Jeden Monat',
        body: 'Eine feste Anzahl Videos pro Monat, für Marken, die regelmäßig Inhalte brauchen.',
        points: ['5 bis 10+ Videos im Monat', 'Planung und Ideen mit meinem Team', 'Vorrang in meinem Kalender'],
      },
    },
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Lass uns reden.',
    lede: 'Erzähl mir vom Produkt und davon, was du brauchst. Ich schaue mir jede Anfrage mit meinem Team an und antworte meistens innerhalb von zwei Werktagen.',
    mailSubject: 'Projektanfrage',
    honeypot: 'Website',
    fields: {
      name: 'Dein Name',
      company: 'Firma oder Marke',
      email: 'E-Mail',
      product: 'Produkt',
      link: 'Link zum Produkt oder zu deiner Seite',
      contentType: 'Was für ein Video',
      videoCount: 'Wie viele Videos',
      timeline: 'Wann du es brauchst',
      brief: 'Was du dir vorstellst',
      notes: 'Sonst noch etwas',
    },
    optional: 'optional',
    select: 'Bitte auswählen',
    submit: 'Absenden',
    sending: 'Wird gesendet …',
    success:
      'Danke, deine Nachricht ist unterwegs. Ich antworte meistens innerhalb von zwei Werktagen.',
    error: 'Da ist etwas schiefgelaufen. Du kannst mir auch direkt schreiben:',
    preferEmail: 'Lieber per E-Mail?',
    helpfulTitle: 'Gut zu wissen',
    helpful: [
      'Für wen das Video ist und was es bewirken soll',
      'Was das Produkt kann und was betont werden soll',
      'Was ich sagen muss und was auf keinen Fall',
      'Wo das Video später läuft',
    ],
    elsewhere: 'Hier findest du mich',
    contentTypes: [
      'Ein kurzes Produktvideo',
      'Alltagsnahe Inhalte',
      'Video im UGC-Stil',
      'Zeigen, wie das Produkt funktioniert',
      'Video mit Voiceover',
      'Nur Zusatzmaterial',
      'Produktfotos',
      'Ein monatliches Paket',
      'Noch unklar',
    ],
    videoCounts: ['1 Video', '2 bis 4 Videos', '5 bis 10 Videos', 'Mehr als 10', 'Jeden Monat'],
    timelines: [
      'So bald wie möglich',
      'Innerhalb von 2 Wochen',
      'Innerhalb eines Monats',
      'Ich bin flexibel',
      'Langfristige Planung',
    ],
  },

  footer: {
    cta: 'Zusammenarbeiten',
    email: 'E-Mail',
    rights: 'Digital Creator',
  },
}
