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
    work: 'Arbeiten',
    services: 'Leistungen',
    about: 'Über mich',
    process: 'Ablauf',
    partnerships: 'Zusammenarbeit',
    pricing: 'Preise',
    contact: 'Kontakt',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    skip: 'Zum Inhalt springen',
    ariaPrimary: 'Hauptnavigation',
    ariaMobile: 'Hauptnavigation, mobil',
    ariaFooter: 'Navigation im Fußbereich',
  },

  hero: {
    role: 'Digital Creator',
    location: 'Hamburg, Deutschland',
    tagline: 'Echte Produkte. Echter Alltag. Mit Ruhe gemacht.',
    ctaWork: 'Meine Arbeiten',
    ctaContact: 'Zusammenarbeiten',
    credLanguages: ['Arabisch', 'Englisch', 'Deutsch'],
    pillarsLabel: 'Worüber ich Inhalte mache',
    pillars: [
      'Mutterschaft',
      'Hautpflege',
      'Get Ready With Me',
      'Unboxing',
      'Reisen',
      'Alltag',
    ],
  },

  work: {
    eyebrow: 'Ausgewählte Arbeiten',
    title: 'Videos, die wie ein echter Tag aussehen.',
    lede: 'Zuerst meine veröffentlichten Reels, danach alles nach Themen sortiert.',
    featuredHeading: 'Auf Instagram veröffentlicht',
    viewProfile: 'Profil ansehen',
    seeMore: 'Mehr von mir auf Instagram',
    byCategory: 'Nach Thema',
    filterLabel: 'Arbeiten nach Thema filtern',
    all: 'Alle',
    empty: 'Zu diesem Thema kommt bald mehr.',
    brandsHeading: 'Produkte und Marken, zu denen ich Inhalte gemacht habe',
    disclaimer:
      'Das hier ist eine Mischung aus bezahlten Aufträgen und Inhalten mit Produkten, die ich selbst gekauft habe. Wo eine Marke für ein Video bezahlt hat, steht es auf der Karte.',
    portfolioBadge: 'Eigener Inhalt',
    collaborationBadge: 'Bezahlte Zusammenarbeit',
    reelBadge: 'Reel',
    watchOnInstagram: 'Auf Instagram ansehen',
    openOnInstagram: 'Auf Instagram öffnen',
    embedFallback: 'Wird nichts angezeigt? Öffne das Reel auf Instagram.',
    loadingReel: 'Reel wird geladen …',
    play: 'Abspielen',
    pause: 'Pause',
    unmute: 'Ton an',
    mute: 'Ton aus',
    placeholderNote: 'Das sind Platzhalter. Echtes Material schicke ich dir gern.',
    categories: {
      motherhood: 'Mutterschaft',
      beauty: 'Beauty und Hautpflege',
      grwm: 'Get Ready With Me',
      unboxing: 'Unboxing',
      travel: 'Reisen',
      lifestyle: 'Alltag',
    },
    items: {
      'morning-light': {
        title: 'Morgenlicht',
        note: 'Ruhige Alltagsaufnahmen, natürliches Tempo',
      },
      'everyday-ritual': {
        title: 'Alltagsritual',
        note: 'Ein Produkt mitten in einem normalen Morgen',
      },
      'product-detail': {
        title: 'Produktdetail',
        note: 'Nah dran, mit Text im Bild',
      },
      unboxing: {
        title: 'Erster Eindruck',
        note: 'Karton auf, schnelle Schnitte, Voiceover',
      },
      'feeding-routine': {
        title: 'Fütterungsroutine',
        note: 'Zeigen, wie es funktioniert, in einer echten Situation',
      },
      'baby-care': {
        title: 'Baby-Essentials',
        note: 'Die nützliche Sorte Video, die man sich speichert',
      },
      'skincare-routine': {
        title: 'Hautpflege-Routine',
        note: 'Eine kurze Routine bei Tageslicht',
      },
      'texture-closeup': {
        title: 'Textur',
        note: 'Ganz nah, in Zeitlupe',
      },
      'grwm-evening': {
        title: 'Fertigmachen',
        note: 'Spiegel, warmes Licht, Voiceover',
      },
      'travel-day': {
        title: 'Reisetag',
        note: 'Ein ruhiges Reisetagebuch',
      },
    },
  },

  services: {
    eyebrow: 'Leistungen',
    title: 'Was ich für dich machen kann.',
    lede: 'Kurze Produktvideos mache ich am meisten. Alles andere unterstützt das.',
    coreLabel: 'Das mache ich am meisten',
    primaryTitle: 'Kurze Produktvideos',
    primaryBody:
      'Ich drehe kurze Hochkant-Videos mit Produkten, die wirklich benutzt werden. Idee, Dreh, Schnitt und fertige Datei übernehme ich. Du kannst sie direkt posten oder als Anzeige schalten.',
    primaryIncludes: [
      'Produktvideos',
      'Alltagsnahe Inhalte',
      'Videos im UGC-Stil',
      'Zeigen, wie ein Produkt funktioniert',
      'Eine kleine Geschichte rund ums Produkt',
      'Reels und TikToks',
    ],
    cta: 'Projekt anfragen',
    secondary: [
      {
        title: 'Voiceover und Sprachversionen',
        body: 'Arabisch und Englisch spreche ich vor der Kamera und als Voiceover. Auf Deutsch schreibe ich Untertitel, Captions und den Text im Bild. So erreicht ein Produkt mehr als eine Zielgruppe.',
      },
      {
        title: 'Zusatzmaterial und Produktfotos',
        body: 'Saubere zusätzliche Aufnahmen und Fotos, die du für eigene Schnitte, Produktseiten und Anzeigen nutzen kannst.',
      },
      {
        title: 'Schnitt',
        body: 'Wenn du schon Material hast, schneide ich daraus ein kurzes Video, mit Tempo, Text im Bild, Musik und Ton.',
      },
      {
        title: 'Ideen und Hooks',
        body: 'Ansätze, erste Sätze und kleine Skripte rund um dein Produkt. Praktisch, wenn du Ideen brauchst und nicht nur Aufnahmen.',
      },
    ],
    future:
      'Für Marken, mit denen ich regelmäßig arbeite, plane ich Inhalte auch von Monat zu Monat und stelle größere Pakete zusammen.',
  },

  about: {
    eyebrow: 'Über mich',
    title: 'Kurz zu mir.',
    paragraphs: [
      'Ich bin Lynn, Digital Creator aus Hamburg. Ich mache Inhalte über Mutterschaft, Hautpflege, Fertigmachen, Unboxing, Reisen und ganz normale Tage zu Hause.',
      'Ich probiere ein Produkt zuerst aus und filme es danach. In der Reihenfolge, und ich glaube, deshalb wirken die Videos glaubwürdig. Auf Instagram folgen mir rund 27.000 Menschen, und am besten kommt an, was wirklich nützlich ist.',
      'Vor der Kamera arbeite ich auf Arabisch und Englisch, auf Deutsch schreibe ich Untertitel, Captions und Skripte. So erreicht ein Produkt mehrere Zielgruppen, ohne dass zweimal gedreht wird.',
      'Wenn ein Produkt nichts für mich ist, sage ich das lieber, als es schönzureden. Genau das macht meine Empfehlungen etwas wert.',
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
        detail: 'Untertitel, Captions, Skripte, Text im Bild. Gesprochen auf Anfrage',
      },
    ],
    audienceTitle: 'Wer mir folgt',
    audience: {
      instagram: 'Instagram',
      tiktok: 'TikTok',
      followers: 'Follower',
      approx: '~',
      audienceLabel: 'Überwiegend',
      audienceValue: 'Frauen, meist zwischen 18 und 35',
      reachLabel: 'Reichweite',
      reachValue: 'Deutschland und arabischsprachige Länder',
    },
  },

  process: {
    eyebrow: 'So läuft es ab',
    title: 'Für dich ganz einfach.',
    lede: 'Schick mir das Produkt und deine Vorstellung. Um den Rest kümmere ich mich.',
    note: 'Ob du mir freie Hand lässt oder ein genaues Briefing schickst, beides passt.',
    cta: 'Briefing schicken',
    steps: [
      {
        title: 'Briefing',
        body: 'Du erzählst mir vom Produkt, für wen es ist und worauf ich achten soll: die wichtigsten Aussagen, was ich sagen darf und was nicht, und wo das Video später läuft.',
      },
      {
        title: 'Idee',
        body: 'Ich überlege mir eine normale Situation, in die das Produkt gehört. Wenn du ein klares Briefing hast, halte ich mich daran. Wenn du lieber möchtest, dass ich mir etwas ausdenke, mache ich das.',
      },
      {
        title: 'Dreh',
        body: 'Ich drehe zu Hause oder dort, wo das Produkt wirklich benutzt wird. Nahaufnahmen, Alltagsszenen und genug Zusatzmaterial zum Arbeiten.',
      },
      {
        title: 'Schnitt',
        body: 'Ich schneide alles zu einem kurzen Video zusammen, mit Voiceover, Text im Bild und Musik, wo es passt.',
      },
      {
        title: 'Übergabe',
        body: 'Du bekommst die fertigen Dateien in den vereinbarten Formaten, pünktlich. Eine Korrekturrunde ist dabei.',
      },
    ],
  },

  partnerships: {
    eyebrow: 'Zusammenarbeit',
    title: 'Das zweite Video ist immer besser als das erste.',
    lede: 'Meine besten Arbeiten entstehen mit Marken, mit denen ich länger arbeite. Sobald ich dein Produkt und deine Zielgruppe kenne, wird das Briefing kürzer und die Videos werden besser.',
    preferred: 'Am liebsten so',
    models: [
      {
        title: 'Monatlich',
        body: 'Du schickst Produkte, und wir planen jeden Monat eine feste Anzahl Videos. So arbeite ich am liebsten.',
      },
      {
        title: 'Immer mal wieder',
        body: 'Wir arbeiten rund um Launches und Kampagnen zusammen, ohne feste monatliche Bindung.',
      },
      {
        title: 'Ein Paket',
        body: 'Eine feste Anzahl Videos für ein Produkt oder eine Kampagne.',
      },
      {
        title: 'Ein Video',
        body: 'Ein Video, ein Produkt. Ein guter Weg, um erst einmal zu sehen, wie ich arbeite.',
      },
    ],
    qualities: [
      {
        title: 'Ich antworte schnell',
        body: 'Fragen beantworte ich zügig und Termine bestätige ich schriftlich. Du musst mir nicht hinterherlaufen.',
      },
      {
        title: 'Feedback ist willkommen',
        body: 'Sag mir, was funktioniert hat und was nicht. Das ist der schnellste Weg zu Videos, die zu dir passen.',
      },
      {
        title: 'Flexibel',
        body: 'Freie Hand, wo du sie mir lässt, und nah am Briefing, wo du es brauchst.',
      },
      {
        title: 'Pünktlich',
        body: 'Du bekommst die Formate und Termine, die wir vereinbart haben. Wenn sich etwas verschiebt, sage ich früh Bescheid.',
      },
    ],
  },

  pricing: {
    eyebrow: 'Preise',
    title: 'Was es ungefähr kostet.',
    lede: 'Jedes Projekt ist ein bisschen anders, aber raten sollst du nicht müssen. Das sind die Einstiegspreise.',
    from: 'ab',
    customFrom: 'je nach Monat, ab',
    cta: 'Angebot anfragen',
    factorsTitle: 'Was den Preis verändert',
    factors: [
      'Wie viele Videos',
      'Wie aufwendig die Idee ist',
      'Wie viel der Dreh braucht',
      'Wie viele Korrekturrunden',
      'Wie schnell du es brauchst',
      'Wo und wie lange du es nutzt',
      'Ob du es als Anzeige schaltest',
      'Zusätzliche Dateien oder Formate',
    ],
    note: 'Agenturen sind genauso willkommen. Wenn du Inhalte für eigene Kunden produzierst, rechne ich das genauso ab.',
    tiers: {
      single: {
        name: 'Ein Video',
        body: 'Ein kurzes Video: Idee, Dreh, Schnitt und die fertigen Dateien.',
        points: ['1 Hochkant-Video', '1 Korrekturrunde', 'Normale Social-Nutzung inklusive'],
      },
      package: {
        name: 'Ein Paket',
        body: 'Mehrere Videos für ein Produkt oder eine Kampagne, zusammen geplant, damit sie als Reihe funktionieren.',
        points: ['3 bis 5 Videos', 'Verschiedene Ansätze und Einstiege', 'Zusatzmaterial und Fotos auf Wunsch'],
      },
      monthly: {
        name: 'Jeden Monat',
        body: 'Eine feste Anzahl Videos pro Monat, für Marken, die regelmäßig Inhalte brauchen.',
        points: ['5 bis 10+ Videos im Monat', 'Planung und Ideen inklusive', 'Du bekommst Vorrang im Kalender'],
      },
    },
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Lass uns reden.',
    lede: 'Erzähl mir vom Produkt und davon, was du brauchst. Ich antworte meistens innerhalb von zwei Werktagen.',
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
      'Deine Markenrichtlinien, falls du welche hast',
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
