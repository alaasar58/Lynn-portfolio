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
      'Mein Schwerpunkt liegt auf Motherhood, Skincare, GRWM, Unboxing, Travel und ästhetischem Lifestyle-Content.',
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
    /* Caption under each phone. The key is the file name in public/media/reels/. */
    captions: {
      motherhood: 'Motherhood',
      beauty: 'Beauty & Style',
      unboxing: 'Unboxing',
      travel: 'Travel',
      lifestyle: 'Lifestyle',
      food: 'Food',
    },
    play: 'Abspielen',
    unmute: 'Ton an',
    mute: 'Ton aus',
    brandsHeading: 'Marken, mit denen ich gearbeitet habe',
    disclaimer:
      'Brands, die mir Produkte geschickt oder mich für bezahlte UGC gebucht haben. Eine Mischung aus beidem — nicht jeder Name hier ist eine bezahlte Kampagne.',
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
    ageScale: ['13', '25', '35', '45', '65+'],
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
    lede: 'Kurze Produktvideos mache ich am meisten, alles andere unterstützt das. Vor der Kamera stehe ich selbst; beim Schnitt und in der Planung arbeite ich mit einem kleinen Team, dem ich vertraue.',
    offer: [
      {
        title: 'Reels und Kurzvideos',
        body: 'Hochkant-Video mit einem Produkt, das wirklich benutzt wird: Idee, Dreh, Schnitt, fertige Datei. Bereit zum Posten.',
      },
      {
        title: 'UGC für deine Anzeigen',
        body: 'Dieselben Videos, für bezahlte Nutzung geschnitten, mit Hooks und Einstiegen, die sich gegeneinander testen lassen.',
      },
      {
        title: 'Unboxing und Produktdetails',
        body: 'Erste Eindrücke, Nahaufnahmen und Texturen für Produktseiten und Launches.',
      },
      {
        title: 'Fotos, Zusatzmaterial und Schnitt',
        body: 'Fotos und saubere Clips für deine eigenen Schnitte. Wenn du schon Material hast, übernehme ich stattdessen den Schnitt.',
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
    lede: 'Einstiegspreise, damit du nicht raten musst. Das endgültige Angebot hängt davon ab, wie das Video genutzt wird.',
    from: 'ab',
    customFrom: 'je nach Monat, ab',
    cta: 'Angebot anfragen',
    factorsTitle: 'Was den Preis verändert',
    factors: [
      'Wie viele Videos',
      'Wie aufwendig der Dreh ist',
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
      'Alltagsnaher Lifestyle-Content',
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

  legal: {
    navLabel: 'Rechtliches',
    back: 'Zurück zur Website',
    updatedLabel: 'Stand',
    updated: 'August 2026',

    imprint: {
      navLabel: 'Impressum',
      title: 'Impressum',
      intro: 'Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).',
      blocks: [
        {
          title: 'Diensteanbieterin',
          lines: [
            'Lynn Kawqge',
            '[Straße und Hausnummer]',
            '[PLZ und Ort]',
            'Deutschland',
          ],
        },
        {
          title: 'Kontakt',
          lines: ['E-Mail: lynnkawqge.ads@gmail.com', 'Telefon: [Telefonnummer]'],
        },
        {
          title: 'Umsatzsteuer-Identifikationsnummer',
          lines: [
            'Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr. — oder Hinweis, dass keine erteilt wurde]',
          ],
        },
        {
          title: 'Verantwortlich für den Inhalt',
          lines: ['Lynn Kawqge, Anschrift wie oben (§ 18 Abs. 2 MStV)'],
        },
      ],
      disputeTitle: 'Verbraucherstreitbeilegung',
      dispute:
        'Ich bin weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      liabilityTitle: 'Haftung und Urheberrecht',
      liability: [
        'Die Inhalte dieser Seite habe ich mit Sorgfalt erstellt. Für eigene Inhalte bin ich nach den allgemeinen Gesetzen verantwortlich, zu einer Überwachung fremder übermittelter oder gespeicherter Informationen bin ich jedoch nicht verpflichtet.',
        'Diese Seite verlinkt auf externe Seiten, auf deren Inhalte ich keinen Einfluss habe. Dafür ist der jeweilige Anbieter verantwortlich. Als die Links gesetzt wurden, waren keine Rechtsverstöße erkennbar.',
        'Die Fotos, Videos und Texte auf dieser Seite stammen von mir, sofern nicht anders gekennzeichnet. Jede Nutzung über das urheberrechtlich Erlaubte hinaus braucht meine schriftliche Zustimmung.',
      ],
    },

    privacy: {
      navLabel: 'Datenschutz',
      title: 'Datenschutzerklärung',
      intro:
        'Diese Seite erhebt so wenig wie irgend möglich: keine Cookies, keine Analyse, kein Tracking, keine Werbung. Was hier steht, beschreibt genau das, was tatsächlich passiert — und behauptet bewusst nichts, was es nicht gibt.',
      sections: [
        {
          title: 'Verantwortliche',
          body: [
            'Lynn Kawqge, [Straße und Hausnummer], [PLZ und Ort], Deutschland. E-Mail: lynnkawqge.ads@gmail.com',
          ],
        },
        {
          title: 'Hosting',
          body: [
            'Diese Seite läuft auf GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Wie jeder Webserver protokolliert GitHub deine IP-Adresse, den Zeitpunkt, die angeforderte Datei und Angaben zu deinem Browser, um die Seite auszuliefern und abzusichern. Ich habe auf diese Logfiles keinen Zugriff.',
            'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Die Verarbeitung findet teilweise in den USA statt; GitHub gehört zu Microsoft und ist nach dem EU-U.S. Data Privacy Framework zertifiziert.',
          ],
        },
        {
          title: 'Keine Cookies, kein Tracking',
          body: [
            'Keine Cookies, keine Analyse, keine Werbung, keine eingebetteten Instagram- oder TikTok-Inhalte, und die Schriften kommen von dieser Seite statt von Google. Dein Besuch wird nirgends gemessen — deshalb gibt es auch kein Einwilligungsbanner.',
            'Gespeichert wird auf deinem Gerät nur deine Sprachwahl, unter dem Schlüssel „lynn.lang". Sie enthält nichts Persönliches, wird nirgendwohin gesendet und ist für einen von dir gewünschten Dienst unbedingt erforderlich (§ 25 Abs. 2 TDDDG). Löschen kannst du sie, indem du in den Browsereinstellungen die Daten dieser Seite entfernst.',
          ],
        },
        {
          title: 'Kontaktaufnahme',
          body: [
            'Das Kontaktformular sendet nichts an einen Server: Beim Absenden öffnet sich dein eigenes E-Mail-Programm mit den eingegebenen Angaben, und bis du die Mail selbst abschickst, verlässt nichts dein Gerät.',
            'Wenn du mir schreibst, verarbeite ich den Inhalt deiner Nachricht, um sie zu beantworten — Art. 6 Abs. 1 lit. b DSGVO, soweit ein Vertrag betroffen ist, sonst lit. f. Ich bewahre sie so lange auf, wie die Anfrage und eine daraus entstehende Zusammenarbeit es erfordern, und lösche sie danach. Anbieterin meines Postfachs ist die Google Ireland Limited.',
          ],
        },
        {
          title: 'Links zu Instagram und TikTok',
          body: [
            'Gewöhnliche Links, keine Plugins. Eine Verbindung zu diesen Plattformen entsteht erst, wenn du einen Link anklickst — ab dann gilt deren Datenschutzerklärung, nicht diese.',
          ],
        },
        {
          title: 'Deine Rechte',
          body: [
            'Du kannst Auskunft über deine Daten verlangen und sie berichtigen, löschen, einschränken oder übertragen lassen; Verarbeitungen auf Grundlage berechtigter Interessen kannst du widersprechen (Art. 15 bis 21 DSGVO). Eine E-Mail an die oben genannte Adresse genügt. Beschweren kannst du dich außerdem bei einer Aufsichtsbehörde — für mich ist das der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit.',
            'Eine automatisierte Entscheidungsfindung oder ein Profiling findet hier nicht statt. Sollte die Seite eine Funktion bekommen, die Daten anders verarbeitet, wird diese Erklärung mit angepasst.',
          ],
        },
      ],
    },
  },

  footer: {
    cta: 'Zusammenarbeiten',
    email: 'E-Mail',
    rights: 'Digital Creator',
  },
}
