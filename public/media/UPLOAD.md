# Was du hochladen musst

Alles, was auf der Website zu sehen ist, liegt in diesem Ordner. Was gerade drin
liegt, sind gezeichnete Platzhalter — damit nie ein leeres Kästchen zu sehen ist,
bis deine eigenen Dateien da sind.

**Eine einzige Regel: Datei überschreiben, Namen genau so lassen.**
Am Code ändert sich nichts. Ein bis zwei Minuten nach dem Hochladen ist es live.

**Die Dateigröße ist dir egal.** Die Website rechnet dein Video beim
Veröffentlichen selbst klein — aus 186 MB wurden im Test 1,1 MB, und im
Handy-Rahmen sieht man davon nichts. Du musst nichts komprimieren, nichts
umwandeln, kein Standbild machen.

---

## Die Liste

| Datei | Was es ist | Format |
| ----- | ---------- | ------ |
| `cover.jpg` | Das große Bild auf der ersten Seite | JPG, hochkant **4:5** |
| `about.jpg` | Bild neben „I am Lynn." | JPG, hochkant **4:5** |
| `reels/motherhood.mp4` | Handy 1 — **Motherhood** | MP4, hochkant **9:16** |
| `reels/beauty.mp4` | Handy 2 — **Beauty & Style** | MP4, hochkant **9:16** |
| `reels/unboxing.mp4` | Handy 3 — **Unboxing** | MP4, hochkant **9:16** |
| `reels/travel.mp4` | Handy 4 — **Travel** | MP4, hochkant **9:16** |
| `reels/lifestyle.mp4` | Handy 5 — **Lifestyle** | MP4, hochkant **9:16** |
| `reels/food.mp4` | Handy 6 — **Food** | MP4, hochkant **9:16** |
| `brands/…` | Die Logos deiner Brands | SVG oder PNG mit transparentem Hintergrund |

**Der Dateiname ist das Thema.** Was `motherhood.mp4` heißt, landet unter der
Überschrift „Motherhood" — du musst mir nichts sagen, leg die Datei einfach
richtig benannt ab.

Ein Handy kann auch **ein Foto statt eines Videos** zeigen: dann heißt die Datei
`motherhood.jpg` statt `.mp4`. Genau so steht es gerade bei Motherhood, Unboxing
und Lifestyle — dort liegen deine Fotos. Sobald du dort ein Video hochlädst,
sag mir Bescheid: ich schalte diese drei mit einer Zeile auf Video um.

Das Standbild vor dem Abspielen wird automatisch aus deinem Video geschnitten.
Willst du ein anderes, sag mir die Sekunde.

Du musst nicht alles auf einmal machen. Jede Datei ersetzt genau einen
Platzhalter, der Rest bleibt so lange, wie er ist.

---

## Die Logos deiner Brands

In `public/media/brands/` — ein Logo pro Brand, am besten **SVG**, sonst **PNG
mit transparentem Hintergrund** (kein weißer Kasten drumherum). Dateiname klein
und ohne Umlaute, z. B. `stadtbaeckerei.svg`.

Schick mir dazu bitte **die Farbe der Brand** (den Farbcode wie `#0a7b3c`, oder
einfach „das Grün aus ihrem Logo") — in dieser Farbe leuchtet die Kachel auf,
wenn jemand mit der Maus darübergeht.

Solange kein Logo da ist, steht dort einfach der Name in der Schrift der Seite.
Das sieht fertig aus, kein leerer Kasten.

**Nur echte Brands.** In die Liste kommt, wovon du wirklich Produkte bekommen
oder für die du bezahlte UGC gemacht hast. Ein Name auf einem Media-Kit ist eine
Aussage, die eine Agentur mit einer einzigen Nachricht prüfen kann.

---

## Wo die Themen stehen, wenn du sie ändern willst

Zwei Stellen, sonst nichts:

| Was | Wo |
| --- | -- |
| Reihenfolge der Handys, welche Datei wo | `src/content/site.ts` → `featuredReels` |
| Die Beschriftung unter dem Handy, in allen drei Sprachen | `src/i18n/en.ts`, `de.ts`, `ar.ts` → `work.captions` |

Die Reihenfolge in `featuredReels` **ist** die Reihenfolge auf der Seite: die
ersten drei oben, die zweiten drei unten. Ein Thema umbenennen heißt: Datei
umbenennen, in `featuredReels` denselben Namen eintragen, und in den drei
Sprachdateien die Beschriftung setzen. Sag mir einfach, was du willst — das
mache ich in zwei Minuten.

---

## Wie du es hochlädst

1. Auf GitHub in diesem Projekt den Ordner `public/media` öffnen (für die Videos
   weiter in `reels`).
2. Oben rechts **Add file → Upload files**.
3. Datei reinziehen. **Der Name muss exakt stimmen** — `beauty.mp4`, nicht
   `Beauty.MP4` oder `beauty-style.mp4`. Groß- und Kleinschreibung zählt.
4. Unten auf **Commit changes** klicken. Fertig.

GitHub fragt beim Überschreiben nicht nach — es ersetzt die alte Datei einfach.
Das ist genau, was wir wollen.

---

## Wenn die Datei größer als 25 MB ist

Das ist die einzige Grenze, die dich noch betrifft: **über die GitHub-Website
gehen höchstens 25 MB pro Datei.** Nicht weil die Seite das braucht, sondern weil
der Upload-Weg im Browser dort aufhört.

Drei Wege, von einfach nach gründlich:

**1. Kürzen — bringt am meisten und ist sowieso richtig.**
Ein 75-MB-Video ist meistens eine ganze Minute. Auf der Seite läuft aber nur eine
Schleife von acht bis zwölf Sekunden. Schneide dein Video auf ~10 Sekunden, und
aus 75 MB werden etwa 12 MB. Das passt, und die Seite sieht dadurch sogar besser
aus, weil die Schleife enger ist.

**2. GitHub Desktop statt Browser — dort sind 100 MB erlaubt.**
[desktop.github.com](https://desktop.github.com) installieren, mit deinem Konto
anmelden, das Projekt einmal herunterladen („Clone"), Dateien im Finder/Explorer
in den Ordner legen, im Programm auf **Commit** und **Push** klicken. Damit
kannst du dein 75-MB-Video direkt hochladen, ohne es vorher anzufassen.

**3. Kleiner exportieren.**
Wenn dein Schnittprogramm es anbietet: **1080p statt 4K** und **30 statt 60
Bilder pro Sekunde**. Das allein viertelt die Datei oft. Nimmt dir aber keiner
übel, wenn du stattdessen einfach Weg 1 oder 2 nimmst — die Seite rechnet
ohnehin auf 720p herunter.

---

## Bilder: kein HEIC

iPhone-Fotos sind manchmal `.heic`. **Das zeigt kein Browser an.** Zwei
Möglichkeiten:

- Auf dem iPhone unter **Einstellungen → Kamera → Formate** auf **„Maximale
  Kompatibilität"** stellen — dann kommen ab sofort JPG-Dateien heraus.
- Oder ein vorhandenes Foto einmal in der Fotos-App bearbeiten (irgendeinen
  Filter drauf und wieder weg) und teilen — dabei wird meist ein JPG erzeugt.

Die Datei muss am Ende `cover.jpg` bzw. `about.jpg` heißen.

---

## Wie sich die Videos auf der Seite verhalten

- Sie starten **von selbst und stumm**, sobald man zu ihnen scrollt, und laufen
  in Schleife. Anders erlauben es die Browser nicht.
- **Maus drüber → Ton an**, Maus weg → Ton aus. Ehrlicherweise: manche Browser
  lassen das erst zu, nachdem der Besucher irgendwo einmal geklickt hat, und auf
  dem Handy gibt es kein „Maus drüber". Deshalb sitzt unten rechts in jedem
  Handy ein kleiner Lautsprecher-Knopf, der immer funktioniert.
- **Klick auf ein Handy** öffnet das Video groß, mit Ton und Steuerung.
- Wer in seinem System „weniger Bewegung" eingestellt hat, sieht das Standbild
  mit einem Abspielknopf. Das ist Absicht.
- Die Seite zeigt höchstens die **ersten 20 Sekunden**. Ist dein Video länger,
  wird der Rest beim Veröffentlichen abgeschnitten.

---

## Ein siebtes Handy, oder ein anderes Thema?

Dafür braucht es eine Zeile in `src/content/site.ts` und die Beschriftung in den
drei Sprachdateien — sag mir Bescheid, das ist in zwei Minuten erledigt.

---

## Das Bilderband („Moments")

Zwischen „Über mich" und „Zielgruppe" läuft ein Band aus **fünf Fotos** quer
über die Seite — ohne Text, nur Bilder. Sie liegen auf verschiedenen Höhen und
schieben sich beim Scrollen leicht gegeneinander.

| Datei | |
| ----- | - |
| `moments/01.jpg` … `moments/05.jpg` | JPG, hochkant (4:5 oder 9:16) |

Hochkant funktioniert am besten, weil die Rahmen hochkant sind. Die Bilder
werden mittig zugeschnitten. Weniger als fünf geht auch — sag mir einfach, wie
viele du hast.

Gerade liegen dort noch gezeichnete Platzhalter.
