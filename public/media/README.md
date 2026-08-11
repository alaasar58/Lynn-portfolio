# Media

Every visual on the site is a file in this folder. All of them are temporary and
all of them are replaced the same way: **overwrite the file, keep the name.**

```
hero/portrait.jpg          the large hero image          4:5, ~1000 × 1250
about/portrait.jpg         image beside the About text   4:5, ~900 × 1125
work/<id>.jpg  + .mp4      portfolio cover and clip      9:16 vertical
reels/<shortcode>.jpg      cover for a featured Reel     9:16 vertical
```

Nothing in the code references an image by URL — the paths live in
`images`, `work` and `featuredReels` in `src/content/site.ts`, and nowhere else.

**What is here now** was generated for this site: warm, very shallow-focus
scenes in the palette, so no section reads as an empty box before your own
photos arrive. They are not photographs of anyone.

## Portfolio work — `work/`

Every portfolio item uses two files named after its `id` in
`src/content/site.ts`:

```
public/media/work/morning-light.mp4   ← the looping preview
public/media/work/morning-light.jpg   ← the cover image
```

**To replace a placeholder, overwrite the file keeping the same name.** No code
change, no component edit — the card picks up the new file automatically.

You may also see a `.webm` next to each `.mp4`. Browsers pick the first source
they can decode, and Chrome, Safari, Edge and iOS all take the MP4 — so
**replacing the MP4 alone is enough for effectively every visitor**. The WebM is
only reached by Chromium builds shipped without the H.264 decoder (some Linux
distributions), which would otherwise show a frozen cover image. If you replace
an MP4 and want to be thorough, just delete the matching `.webm`; nothing
breaks either way.

The files currently in this folder are generated placeholders: soft-focus
gradients in the site's palette, so the portfolio looks finished before the real
footage arrives. They are small on purpose (~25 KB each).

### Recommended export settings

| Setting    | Value                                                       |
| ---------- | ----------------------------------------------------------- |
| Format     | MP4 (H.264), `faststart` enabled                            |
| Aspect     | 9:16 vertical                                               |
| Resolution | 1080 × 1920 (720 × 1280 is plenty for a grid preview)        |
| Length     | 6–15 seconds — a short loop, not the full edit              |
| File size  | Under 3 MB per clip; under 1 MB is better                   |
| Audio      | Keep it — cards start muted, with a sound toggle            |
| Cover      | JPG, same aspect, ~200 KB                                    |

Cards autoplay muted when they scroll into view and pause when they leave, and a
video is only fetched once its card is near the viewport — so a full grid stays
fast on mobile data. Short, well-compressed clips keep it that way.

Always provide a cover image: it is what shows before playback starts, and what
a visitor sees if their browser blocks autoplay.

### Adding a new item

1. Drop `<id>.mp4` and `<id>.jpg` into this folder.
2. Add an entry to `work` in `src/content/site.ts` with that `id` and a category.
3. Add the same `id` under `work.items` in `src/i18n/en.ts`, `de.ts` and `ar.ts`.

Set `featured: true` on an item to give it a double-width tile.

Set `paid: true` and `brand: 'Name'` **only** for confirmed paid collaborations —
that switches the card badge from "Portfolio work" to the brand name.

## Reel covers — `reels/`

Optional stills for the three featured Instagram Reels. Save one as
`reels/<shortcode>.jpg` and set `poster` on that entry in `featuredReels`.
Without a cover the card shows a warm tonal panel, which still looks
intentional.
