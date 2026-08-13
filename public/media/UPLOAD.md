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

| Datei | Was es ist | Format | Hochkant / Quer |
| ----- | ---------- | ------ | --------------- |
| `cover.jpg` | Das große Bild auf der ersten Seite | JPG | hochkant **4:5** |
| `about.jpg` | Bild neben „I am Lynn." | JPG | hochkant **4:5** |
| `reels/reel-1.mp4` | Video im **linken** Handy | MP4 | hochkant **9:16** |
| `reels/reel-2.mp4` | Video im **mittleren** Handy | MP4 | hochkant **9:16** |
| `reels/reel-3.mp4` | Video im **rechten** Handy | MP4 | hochkant **9:16** |
| `brands/…` | Logos der Marken, optional | SVG oder PNG | egal |

**Das ist alles. Pro Handy eine einzige Datei.**

Das Standbild, das man vor dem Abspielen sieht, wird automatisch aus deinem
Video geschnitten (aus der ersten halben Sekunde). Willst du ein anderes Bild,
sag mir einfach die Sekunde — zum Beispiel „nimm Sekunde 3" — das ist eine Zahl
im Code und in einer Minute geändert.

Du musst nicht alles auf einmal machen. Jede Datei, die du hochlädst, ersetzt
genau einen Platzhalter, der Rest bleibt so lange, wie er ist.

---

## Wie du es hochlädst

1. Auf GitHub in diesem Projekt den Ordner `public/media` öffnen (für die Videos
   weiter in `reels`).
2. Oben rechts **Add file → Upload files**.
3. Datei reinziehen. **Der Name muss exakt stimmen** — `reel-1.mp4`, nicht
   `Reel-1.MP4` oder `reel1.mp4`. Groß- und Kleinschreibung zählt.
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

## Ein viertes Handy?

Dafür braucht es eine Zeile Code — sag mir Bescheid, das ist in einer Minute
erledigt. Die Datei wäre dann `reels/reel-4.mp4`.
