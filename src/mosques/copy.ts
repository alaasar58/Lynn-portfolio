/*
 * =============================================================================
 *  MOSQUE OFFER — TEXT
 * =============================================================================
 *  Copy for the standalone page at `#mosques`: an offer to build websites for
 *  mosques and Islamic associations, free of charge.
 *
 *  Why the text lives here and not in `src/i18n/`:
 *
 *  1. This page is reached from a mosque's own website, not from the media kit,
 *     and it carries a fourth language (Turkish) that the media kit does not
 *     have. Keeping it separate means Turkish can exist here without a Turkish
 *     translation of the entire portfolio.
 *  2. The page must stay independent of any single mosque. It belongs to this
 *     site, so that every mosque links *to* it and none of them hosts it.
 *
 *  To change wording, edit the same key under each language below. TypeScript
 *  reports a key that is missing or misspelled in a translation.
 * =============================================================================
 */

export type MosqueLang = 'de' | 'en' | 'tr' | 'ar'

/** Order of the buttons in the page's own language chooser. */
export const mosqueLanguages: MosqueLang[] = ['de', 'en', 'tr', 'ar']

export const mosqueDirFor = (lang: MosqueLang): 'rtl' | 'ltr' =>
  lang === 'ar' ? 'rtl' : 'ltr'

type Block = {
  title: string
  text: string
  points: string[]
}

export type MosqueCopy = {
  meta: { name: string; short: string }
  /** Browser tab title while this page is open. */
  documentTitle: string
  title: string
  lede: string
  intro: string
  example: { text: string; cta: string }
  blocks: {
    offer: Block
    costs: Block
    process: Block
    needed: Block
  }
  contact: {
    title: string
    text: string
    cta: string
    /** Subject line of the e-mail the button opens. */
    subject: string
    note: string
  }
}

/** The finished website this offer points at, as living proof. */
export const exampleUrl = 'https://alaasar58.github.io/Moschee-Bargteheide/'

const de: MosqueCopy = {
  meta: { name: 'Deutsch', short: 'DE' },
  documentTitle: 'Kostenlose Website für Ihre Moschee',
  title: 'Kostenlose Website für Ihre Moschee',
  lede: 'Gebetszeiten, Kurse, Neuigkeiten und Spenden – in mehreren Sprachen. Die Erstellung ist kostenlos, als Sadaqa.',
  intro:
    'Ich baue Websites für Moscheen und islamische Vereine. Die Arbeit an der Website mache ich ehrenamtlich; bezahlt wird nur, was echte Kosten verursacht. Wenn Ihre Moschee eine Website braucht oder die alte nicht mehr passt, schreiben Sie mir einfach.',
  example: {
    text: 'So sieht eine fertige Website aus – gebaut für eine Gemeinde in Schleswig-Holstein:',
    cta: 'Beispiel ansehen',
  },
  blocks: {
    offer: {
      title: 'Das bekommt Ihre Moschee',
      text: 'Alles, was eine Moscheegemeinde im Alltag wirklich braucht.',
      points: [
        'Mehrere Sprachen, zum Beispiel Deutsch, Türkisch, Arabisch und Albanisch – weitere sind möglich.',
        'Gebetszeiten automatisch aus Mawaqit, täglich aktualisiert – ohne jede Arbeit für Sie.',
        'Nächstes Gebet mit Countdown, Iqāma-Zeiten und Freitagsgebet.',
        'Islamischer Kalender mit Hidschri-Datum, besonderen Tagen und Ramadan-Seite mit Imsakiya.',
        'Seiten für Kurse, Neuigkeiten, Veranstaltungen, Spenden, Mitgliedschaft und Kontakt.',
        'Karte mit Navigation zur Moschee.',
        'Als App auf dem Handy speicherbar; die Gebetszeiten funktionieren dann auch ohne Internet.',
        'Heller und dunkler Modus, schnell auch auf älteren Geräten.',
        'Ohne Werbung, ohne Besucherauswertung, mit Rücksicht auf den Datenschutz.',
        'Inhalte pflegen Sie selbst – ohne Programmierkenntnisse.',
      ],
    },
    costs: {
      title: 'Was kostet das?',
      text: 'Die Erstellung ist kostenlos. Es können nur diese Punkte anfallen:',
      points: [
        'Erstellung der Website: kostenlos.',
        'Hosting: kostenlos möglich, mit sicherer Verbindung.',
        'Eigene Internetadresse (z. B. moschee-musterstadt.de): empfohlen. Sie wirkt seriös, ist leicht zu merken und bleibt Ihnen erhalten, auch wenn die Website später umzieht. Etwa 10 bis 20 Euro im Jahr, direkt beim Anbieter bezahlt, nicht an mich. Die Einrichtung übernehme ich.',
        'Laufende Betreuung – nur wenn Sie möchten: Kursanmeldungen verwalten, neue Kurse und Meldungen eintragen, regelmäßige Aktualisierungen. Dafür genügt ein symbolischer Betrag nach Absprache.',
        'Sie können alles auch selbst pflegen. Dann entstehen außer der Internetadresse keine Kosten.',
      ],
    },
    process: {
      title: 'So läuft es ab',
      text: 'Von der ersten Nachricht bis zur fertigen Website. Sie können auch einfach nur fragen, ohne sich zu etwas zu verpflichten.',
      points: [
        'Sie schreiben mir kurz – eine E-Mail genügt. Wenn Sie erst einmal Fragen haben: einfach fragen. Wir klären alles in Ruhe, bevor Sie sich entscheiden.',
        'Wir besprechen, welche Seiten Ihre Moschee braucht: Gebetszeiten, Kurse, Neuigkeiten, Veranstaltungen, Spenden, Mitgliedschaft, Kontakt. Nichts davon ist Pflicht.',
        'Sie schicken mir die Angaben aus der Liste unten. Was noch fehlt, reichen Sie später nach – wir fangen mit dem an, was schon da ist.',
        'Innerhalb weniger Tage bekommen Sie einen ersten Entwurf zum Ansehen – am Handy und am Rechner.',
        'Sie sagen, was geändert werden soll. Änderungen gehören dazu und kosten nichts.',
        'Wenn der Vorstand einverstanden ist, geht die Website online. Die eigene Internetadresse richte ich auf Wunsch für Sie ein.',
        'Danach zeige ich Ihnen, wie Sie Neuigkeiten, Kurse und Termine selbst eintragen – oder ich übernehme die Pflege für Sie.',
      ],
    },
    needed: {
      title: 'Das brauche ich von Ihnen',
      text: 'Alles auf einen Blick. Nichts davon muss sofort vollständig sein – fehlende Angaben tragen wir später nach.',
      points: [
        'Name der Moschee und des Vereins in der offiziellen Schreibweise.',
        'Anschrift: Straße, Postleitzahl und Ort.',
        'Ihre Mawaqit-Kennung oder die Adresse Ihrer Mawaqit-Seite – daraus kommen die Gebetszeiten automatisch.',
        'Telefonnummer und E-Mail-Adresse, die öffentlich stehen dürfen.',
        'Logo und einige Fotos der Moschee, von außen und von innen.',
        'Ein kurzer Text über die Moschee und den Verein: seit wann es sie gibt, was angeboten wird, wofür Sie stehen.',
        'Ihr Kursangebot: Name des Kurses, für wen, Wochentag, Uhrzeit, Ort, Ansprechpartner und Gebühr.',
        'Angaben für Spenden: Kontoinhaber, IBAN und BIC – und, falls vorhanden, ein PayPal-Link.',
        'Mitgliedschaft: Höhe des Beitrags und wer die Anträge entgegennimmt.',
        'Angaben für Impressum und Datenschutz: Vertretungsberechtigte, Registergericht und Vereinsregisternummer.',
        'Welche Sprachen die Website haben soll.',
        'Wer im Verein die Website später pflegen soll – diese Person bekommt von mir eine kurze Einweisung.',
      ],
    },
  },
  contact: {
    title: 'Schreiben Sie mir',
    text: 'Eine kurze Nachricht genügt: Name der Moschee, Ort und worum es geht. Fragen kosten nichts und verpflichten zu nichts.',
    cta: 'E-Mail schreiben',
    subject: 'Website für unsere Moschee',
    note: 'Dies ist ein privates, ehrenamtliches Angebot. Es geht von mir aus und nicht von einer der Moscheen, deren Website ich erstellt habe.',
  },
}

const en: MosqueCopy = {
  meta: { name: 'English', short: 'EN' },
  documentTitle: 'A free website for your mosque',
  title: 'A free website for your mosque',
  lede: 'Prayer times, classes, news and donations — in several languages. Building it costs nothing; I do it as sadaqa.',
  intro:
    'I build websites for mosques and Islamic associations. The work itself is voluntary; you only pay for what actually costs money. If your mosque needs a website, or the old one no longer fits, just write to me.',
  example: {
    text: 'This is what a finished website looks like — built for a congregation in Schleswig-Holstein:',
    cta: 'See the example',
  },
  blocks: {
    offer: {
      title: 'What your mosque gets',
      text: 'Everything a congregation actually needs day to day.',
      points: [
        'Several languages, for example German, Turkish, Arabic and Albanian — more are possible.',
        'Prayer times pulled from Mawaqit automatically and refreshed daily — no work for you.',
        'Next prayer with a countdown, iqāma times and the Friday prayer.',
        'Islamic calendar with the Hijri date, special days and a Ramadan page with the imsakiya.',
        'Pages for classes, news, events, donations, membership and contact.',
        'A map with directions to the mosque.',
        'Can be saved to a phone like an app; prayer times then work without an internet connection.',
        'Light and dark mode, and fast even on older phones.',
        'No advertising, no visitor tracking, built with data protection in mind.',
        'You keep the content up to date yourselves — no programming knowledge needed.',
      ],
    },
    costs: {
      title: 'What does it cost?',
      text: 'Building it is free. Only these items can come up:',
      points: [
        'Building the website: free.',
        'Hosting: available free of charge, with a secure connection.',
        'Your own web address (e.g. mosque-yourtown.de): recommended. It looks trustworthy, is easy to remember and stays yours even if the site moves later. Around 10 to 20 euros a year, paid directly to the provider, not to me. I set it up for you.',
        'Ongoing care — only if you want it: handling class registrations, adding new classes and announcements, regular updates. A symbolic amount, agreed between us, is enough.',
        'You can also maintain everything yourselves. Then there is no cost beyond the web address.',
      ],
    },
    process: {
      title: 'How it works',
      text: 'From the first message to the finished website. You are also welcome to just ask, without committing to anything.',
      points: [
        'You write me a short message — an e-mail is enough. If you have questions first, simply ask. We go through everything calmly before you decide.',
        'We discuss which pages your mosque needs: prayer times, classes, news, events, donations, membership, contact. None of them is compulsory.',
        'You send me the details from the list below. Anything missing can follow later — we start with what you already have.',
        'Within a few days you get a first draft to look at, on a phone and on a computer.',
        'You tell me what should change. Revisions are part of the work and cost nothing.',
        'Once the board agrees, the website goes live. If you want your own web address, I set it up.',
        'After that I show you how to add news, classes and dates yourselves — or I take care of it for you.',
      ],
    },
    needed: {
      title: 'What I need from you',
      text: 'Everything at a glance. None of it has to be complete straight away — missing details can follow.',
      points: [
        'The name of the mosque and of the association, spelled as it is used officially.',
        'The address: street, postcode and town.',
        'Your Mawaqit ID or the address of your Mawaqit page — the prayer times come from there automatically.',
        'A phone number and an e-mail address that may be shown publicly.',
        'The logo and a few photos of the mosque, outside and inside.',
        'A short text about the mosque and the association: how long it has existed, what is offered, what you stand for.',
        'Your classes: name of the class, who it is for, weekday, time, place, contact person and fee.',
        'Donation details: account holder, IBAN and BIC — and a PayPal link if you have one.',
        'Membership: the fee and who receives the applications.',
        'Details for the imprint and the privacy notice: legal representatives, register court and association register number.',
        'Which languages the website should have.',
        'Who in the association will look after the website later — that person gets a short introduction from me.',
      ],
    },
  },
  contact: {
    title: 'Write to me',
    text: 'A short message is enough: the name of the mosque, the town and what it is about. Asking costs nothing and commits you to nothing.',
    cta: 'Send an e-mail',
    subject: 'A website for our mosque',
    note: 'This is a private, voluntary offer. It comes from me and not from any of the mosques whose websites I have built.',
  },
}

const tr: MosqueCopy = {
  meta: { name: 'Türkçe', short: 'TR' },
  documentTitle: 'Camininiz için ücretsiz web sitesi',
  title: 'Camininiz için ücretsiz web sitesi',
  lede: 'Namaz vakitleri, kurslar, haberler ve bağışlar – birden çok dilde. Kurulum ücretsizdir, sadaka olarak yapıyorum.',
  intro:
    'Camiler ve İslami dernekler için web siteleri hazırlıyorum. Sitedeki emeği gönüllü veriyorum; yalnızca gerçekten masraf çıkaran kalemler ödenir. Camininizin bir web sitesine ihtiyacı varsa ya da mevcut site artık yetmiyorsa, bana yazmanız yeterli.',
  example: {
    text: 'Tamamlanmış bir web sitesi böyle görünüyor – Schleswig-Holstein’daki bir cemaat için hazırlandı:',
    cta: 'Örneği görün',
  },
  blocks: {
    offer: {
      title: 'Camininiz neler alır',
      text: 'Bir cami cemaatinin günlük hayatta gerçekten ihtiyaç duyduğu her şey.',
      points: [
        'Birden çok dil, örneğin Almanca, Türkçe, Arapça ve Arnavutça – başkaları da eklenebilir.',
        'Namaz vakitleri Mawaqit’ten otomatik gelir ve her gün güncellenir – sizin için hiç iş yok.',
        'Geri sayımlı sonraki namaz, ikamet vakitleri ve cuma namazı.',
        'Hicri tarihli İslami takvim, özel günler ve imsakiyeli Ramazan sayfası.',
        'Kurslar, haberler, etkinlikler, bağış, üyelik ve iletişim sayfaları.',
        'Camiye yol tarifi veren harita.',
        'Telefona uygulama gibi eklenebilir; namaz vakitleri o zaman internetsiz de çalışır.',
        'Açık ve koyu görünüm, eski cihazlarda bile hızlı.',
        'Reklamsız, ziyaretçi takibi olmadan, veri korumasına özen göstererek.',
        'İçerikleri kendiniz güncellersiniz – programlama bilgisi gerekmez.',
      ],
    },
    costs: {
      title: 'Bunun maliyeti nedir?',
      text: 'Kurulum ücretsizdir. Yalnızca şu kalemler söz konusu olabilir:',
      points: [
        'Web sitesinin kurulumu: ücretsiz.',
        'Barındırma: güvenli bağlantıyla ücretsiz mümkündür.',
        'Kendi internet adresiniz (ör. moschee-musterstadt.de): tavsiye edilir. Ciddi bir izlenim bırakır, akılda kalır ve site ileride taşınsa bile sizde kalır. Yılda yaklaşık 10–20 Euro, doğrudan sağlayıcıya ödenir, bana değil. Kurulumunu ben üstlenirim.',
        'Sürekli destek – yalnızca isterseniz: kurs kayıtlarının yönetimi, yeni kurs ve duyuruların eklenmesi, düzenli güncellemeler. Bunun için anlaşmaya göre sembolik bir tutar yeterlidir.',
        'Her şeyi kendiniz de yönetebilirsiniz. O zaman internet adresi dışında masraf olmaz.',
      ],
    },
    process: {
      title: 'Süreç nasıl işler',
      text: 'İlk mesajdan hazır web sitesine kadar. Hiçbir yükümlülük olmadan yalnızca sormanız da mümkündür.',
      points: [
        'Bana kısaca yazarsınız – bir e-posta yeterlidir. Önce sorularınız varsa çekinmeden sorun. Karar vermeden önce her şeyi rahatça konuşuruz.',
        'Camininizin hangi sayfalara ihtiyacı olduğunu konuşuruz: namaz vakitleri, kurslar, haberler, etkinlikler, bağış, üyelik, iletişim. Hiçbiri zorunlu değildir.',
        'Aşağıdaki listedeki bilgileri gönderirsiniz. Eksik kalanları sonra iletirsiniz – elimizde olanla başlarız.',
        'Birkaç gün içinde ilk taslağı görmek üzere alırsınız – telefonda ve bilgisayarda.',
        'Nelerin değişmesini istediğinizi söylersiniz. Değişiklikler işin bir parçasıdır ve ücretsizdir.',
        'Yönetim onayladığında site yayına girer. İsterseniz kendi internet adresinizi sizin için ayarlarım.',
        'Sonrasında haberleri, kursları ve tarihleri kendiniz nasıl gireceğinizi gösteririm – ya da bakımı ben üstlenirim.',
      ],
    },
    needed: {
      title: 'Sizden neye ihtiyacım var',
      text: 'Hepsi bir arada. Hiçbirinin hemen eksiksiz olması gerekmiyor – eksikleri sonra tamamlarız.',
      points: [
        'Caminin ve derneğin resmî yazımıyla adı.',
        'Adres: sokak, posta kodu ve şehir.',
        'Mawaqit kimliğiniz veya Mawaqit sayfanızın adresi – namaz vakitleri oradan otomatik gelir.',
        'Herkese açık gösterilebilecek telefon numarası ve e-posta adresi.',
        'Logo ve caminin dıştan ve içten birkaç fotoğrafı.',
        'Cami ve dernek hakkında kısa bir metin: ne zamandan beri var, neler sunuluyor, neyi temsil ediyorsunuz.',
        'Kurs programınız: kursun adı, kime yönelik, gün, saat, yer, ilgili kişi ve ücret.',
        'Bağış bilgileri: hesap sahibi, IBAN ve BIC – varsa bir PayPal bağlantısı.',
        'Üyelik: aidat tutarı ve başvuruları kimin aldığı.',
        'Künye ve veri koruması için bilgiler: temsile yetkili kişiler, sicil mahkemesi ve dernek sicil numarası.',
        'Web sitesinin hangi dillerde olacağı.',
        'Dernekte web sitesini ileride kimin yöneteceği – bu kişiye kısa bir eğitim veririm.',
      ],
    },
  },
  contact: {
    title: 'Bana yazın',
    text: 'Kısa bir mesaj yeterlidir: caminin adı, şehir ve konu. Soru sormak ücretsizdir ve hiçbir yükümlülük getirmez.',
    cta: 'E-posta gönder',
    subject: 'Camimiz için web sitesi',
    note: 'Bu, kişisel ve gönüllü bir tekliftir. Benden gelmektedir; web sitesini hazırladığım camilerden herhangi biri adına sunulmamaktadır.',
  },
}

const ar: MosqueCopy = {
  meta: { name: 'العربية', short: 'AR' },
  documentTitle: 'موقع إلكتروني مجاني لمسجدكم',
  title: 'موقع إلكتروني مجاني لمسجدكم',
  lede: 'أوقات الصلاة والدورات والأخبار والتبرعات بعدّة لغات. والإنشاء مجاني، أقوم به صدقةً.',
  intro:
    'أُنشئ مواقع إلكترونية للمساجد والجمعيات الإسلامية. العمل على الموقع تطوّعي، ولا يُدفَع إلا ما له تكلفة حقيقية. فإن كان مسجدكم بحاجة إلى موقع، أو لم يعد الموقع القديم مناسبًا، فاكتبوا لي ببساطة.',
  example: {
    text: 'هكذا يبدو موقع جاهز، أنشأتُه لجمعية في ولاية شليسفيغ هولشتاين:',
    cta: 'مشاهدة المثال',
  },
  blocks: {
    offer: {
      title: 'ما الذي يحصل عليه مسجدكم',
      text: 'كل ما تحتاجه جماعة المسجد فعليًا في حياتها اليومية.',
      points: [
        'عدّة لغات، مثل الألمانية والتركية والعربية والألبانية، ويمكن إضافة غيرها.',
        'أوقات الصلاة تلقائيًا من Mawaqit وتُحدَّث يوميًا دون أي جهد منكم.',
        'الصلاة القادمة مع عدّاد تنازلي، وأوقات الإقامة، وصلاة الجمعة.',
        'تقويم إسلامي بالتاريخ الهجري والمناسبات وصفحة رمضان مع الإمساكية.',
        'صفحات للدورات والأخبار والفعاليات والتبرعات والعضوية والتواصل.',
        'خريطة مع توجيه إلى المسجد.',
        'يمكن حفظه كتطبيق على الهاتف، وعندها تعمل أوقات الصلاة حتى بدون إنترنت.',
        'وضع فاتح ووضع داكن، وسرعة جيدة حتى على الأجهزة القديمة.',
        'بلا إعلانات ولا تتبّع للزوار ومع مراعاة حماية البيانات.',
        'تديرون المحتوى بأنفسكم دون أي معرفة برمجية.',
      ],
    },
    costs: {
      title: 'ما التكلفة؟',
      text: 'الإنشاء مجاني، وقد تُوجد هذه البنود فقط:',
      points: [
        'إنشاء الموقع: مجانًا.',
        'الاستضافة: ممكنة مجانًا ومع اتصال آمن.',
        'عنوان إنترنت خاص (مثل moschee-musterstadt.de): موصى به. فهو يترك انطباعًا موثوقًا، ويسهل تذكّره، ويبقى لكم حتى لو انتقل الموقع لاحقًا. التكلفة نحو 10 إلى 20 يورو سنويًا تُدفع لمزوّد النطاق مباشرة لا لي، وأتولّى أنا إعداده.',
        'متابعة مستمرة، وهي اختيارية تمامًا: إدارة طلبات التسجيل في الدورات، وإدراج الدورات والأخبار الجديدة، والتحديثات الدورية — بمبلغ رمزي بالاتفاق.',
        'وتستطيعون إدارة كل شيء بأنفسكم، وعندها لا توجد أي تكلفة سوى عنوان الإنترنت.',
      ],
    },
    process: {
      title: 'كيف تسير الأمور',
      text: 'من أول رسالة حتى الموقع الجاهز. ويمكنكم أيضًا أن تسألوا فقط دون أي التزام.',
      points: [
        'تكتبون لي رسالة قصيرة، ويكفي بريد إلكتروني. وإن كانت لديكم أسئلة أولًا فاسألوا؛ نوضّح كل شيء بهدوء قبل أن تقرّروا.',
        'نتحدّث معًا عن الصفحات التي يحتاجها مسجدكم: أوقات الصلاة، والدورات، والأخبار، والفعاليات، والتبرعات، والعضوية، والتواصل. ولا شيء منها إلزامي.',
        'ترسلون البيانات المذكورة في القائمة أدناه، وما ينقص يمكن إرساله لاحقًا؛ نبدأ بما هو متوفّر.',
        'خلال أيام قليلة تستلمون نسخة أولى للمعاينة على الهاتف وعلى الحاسوب.',
        'تخبرونني بما تريدون تغييره؛ فالتعديلات جزء من العمل ولا تكلّف شيئًا.',
        'وحين توافق الإدارة يُنشر الموقع، وأتولّى عند الرغبة إعداد عنوان الإنترنت الخاص بكم.',
        'ثم أُريكم كيف تُدخلون الأخبار والدورات والمواعيد بأنفسكم، أو أتولّى أنا المتابعة نيابةً عنكم.',
      ],
    },
    needed: {
      title: 'ما الذي أحتاجه منكم',
      text: 'كل ما يلزم في مكان واحد. ولا يلزم أن يكتمل كل شيء فورًا؛ نُكمل الناقص لاحقًا.',
      points: [
        'اسم المسجد واسم الجمعية بصيغتهما الرسمية.',
        'العنوان: الشارع والرمز البريدي والمدينة.',
        'معرّف Mawaqit الخاص بكم أو رابط صفحتكم عليه؛ منه تأتي أوقات الصلاة تلقائيًا.',
        'رقم هاتف وبريد إلكتروني يمكن نشرهما للعموم.',
        'الشعار وبعض صور المسجد من الخارج ومن الداخل.',
        'نص قصير عن المسجد والجمعية: متى تأسّسا، وما الذي يُقدَّم، وما الذي تمثّلونه.',
        'برنامج الدورات: اسم الدورة، ولمن هي، واليوم، والوقت، والمكان، والمسؤول، والرسوم.',
        'بيانات التبرّع: صاحب الحساب ورقم IBAN ورمز BIC، ورابط PayPal إن وُجد.',
        'العضوية: قيمة الاشتراك ومَن يستلم الطلبات.',
        'بيانات صفحة البيانات القانونية (Impressum) وحماية البيانات: الممثّلون القانونيون، ومحكمة السجل، ورقم قيد الجمعية.',
        'اللغات التي تريدون أن يظهر بها الموقع.',
        'مَن سيتولّى تحديث الموقع لاحقًا داخل الجمعية — أقدّم لهذا الشخص شرحًا قصيرًا.',
      ],
    },
  },
  contact: {
    title: 'اكتبوا لي',
    text: 'تكفي رسالة قصيرة: اسم المسجد والمدينة وموضوع الطلب. السؤال مجاني ولا يُلزمكم بشيء.',
    cta: 'إرسال بريد إلكتروني',
    subject: 'موقع إلكتروني لمسجدنا',
    note: 'هذا عرض خاص وتطوّعي، صادر عنّي أنا وليس عن أي من المساجد التي أنشأتُ مواقعها.',
  },
}

export const mosqueCopy: Record<MosqueLang, MosqueCopy> = { de, en, tr, ar }

/** Pre-selects the visitor's own language, falling back to German. */
export function detectMosqueLang(): MosqueLang {
  if (typeof navigator === 'undefined') return 'de'
  for (const entry of navigator.languages ?? [navigator.language]) {
    const code = entry?.slice(0, 2).toLowerCase()
    if (code === 'de') return 'de'
    if (code === 'tr') return 'tr'
    if (code === 'ar') return 'ar'
    if (code === 'en') return 'en'
  }
  return 'de'
}
