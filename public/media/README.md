# Media

## Portfolio work — `work/`

Every portfolio item uses two files named after its `id` in
`src/content/site.ts`:

```
public/media/work/morning-light.mp4   ← the looping preview
public/media/work/morning-light.jpg   ← the cover image
```

**To replace a placeholder, overwrite the file keeping the same name.** No code
change, no component edit — the card picks up the new file automatically.

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
