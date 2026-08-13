# Was du hochladen musst

Alles, was auf der Website zu sehen ist, liegt in diesem Ordner. Was gerade drin
liegt, sind gezeichnete Platzhalter — damit nie ein leeres Kästchen zu sehen ist,
bis deine eigenen Dateien da sind.

**Eine einzige Regel: Datei überschreiben, Namen genau so lassen.**
Am Code ändert sich nichts. Ein bis zwei Minuten nach dem Hochladen ist es live.

---

## Die Liste

| Datei | Was es ist | Format | Hochkant / Quer | Größe |
| ----- | ---------- | ------ | --------------- | ----- |
| `cover.jpg` | Das große Bild auf der ersten Seite | JPG | hochkant **4:5** | ~1000 × 1250 px |
| `about.jpg` | Bild neben „I am Lynn." | JPG | quer **5:4** | ~1200 × 960 px |
| `reels/reel-1.mp4` | Video im **linken** Handy | MP4 | hochkant **9:16** | 1080 × 1920 px |
| `reels/reel-1.jpg` | Standbild dazu | JPG | hochkant **9:16** | 1080 × 1920 px |
| `reels/reel-2.mp4` | Video im **mittleren** Handy | MP4 | hochkant **9:16** | 1080 × 1920 px |
| `reels/reel-2.jpg` | Standbild dazu | JPG | hochkant **9:16** | 1080 × 1920 px |
| `reels/reel-3.mp4` | Video im **rechten** Handy | MP4 | hochkant **9:16** | 1080 × 1920 px |
| `reels/reel-3.jpg` | Standbild dazu | JPG | hochkant **9:16** | 1080 × 1920 px |
| `brands/…` | Logos der Marken, optional | SVG oder PNG | egal | transparenter Hintergrund |

Du musst nicht alles auf einmal machen. Jede Datei, die du hochlädst, ersetzt
genau einen Platzhalter — der Rest bleibt so lange, wie er ist.

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

## Videos: worauf es ankommt

- **MP4**, Codec H.264, Ton als AAC. Das ist, was jedes Handy beim Export
  ausspuckt — du musst nichts umwandeln.
- **Hochkant 9:16**, so wie du es für Instagram schneidest.
- **Unter 5 MB pro Clip.** Über die GitHub-Oberfläche gehen höchstens 25 MB pro
  Datei, aber viel wichtiger: ein schweres Video macht die Seite auf dem Handy
  langsam, und dann klickt niemand weiter.
- **6 bis 15 Sekunden.** Ein Ausschnitt, der in Schleife läuft, nicht der ganze
  Schnitt. Die lange Fassung sieht man ja, wenn man draufklickt.
- **Standbild immer mitschicken.** Das ist, was man sieht, bevor das Video
  startet — und was jemand mit langsamem Internet vielleicht überhaupt nur
  sieht. Ein Screenshot vom schönsten Bild aus dem Video reicht.

### Das `.webm` daneben

Neben jedem `.mp4` liegt eine Datei mit demselben Namen und der Endung `.webm`.
Die brauchen nur ein paar Linux-Browser, die kein MP4 abspielen können.

**Wenn du ein `.mp4` austauschst, lösche das gleichnamige `.webm`.** Sonst
sehen diese wenigen Besucher weiter das alte Platzhaltervideo. Nichts geht
kaputt, wenn du es vergisst — es ist nur unsauber.

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

---

## Ein viertes Handy?

Dafür braucht es eine Zeile Code — sag mir Bescheid, das ist in einer Minute
erledigt. Die Dateien wären dann `reels/reel-4.mp4` und `reels/reel-4.jpg`.
