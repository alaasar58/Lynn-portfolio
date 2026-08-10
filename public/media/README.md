# Media

Drop portfolio media in here, then reference it from `src/content/site.ts`.

```
public/media/work/baby-feeding-set.mp4     ->  video:  '/media/work/baby-feeding-set.mp4'
public/media/work/baby-feeding-set.jpg     ->  poster: '/media/work/baby-feeding-set.jpg'
```

Any work item without a `video` or `poster` renders a styled placeholder tile, so
the layout is already correct before the files land — media can be added one
piece at a time.

## Recommended export settings

| Setting     | Value                                                  |
| ----------- | ------------------------------------------------------ |
| Format      | MP4 (H.264 + AAC)                                      |
| Aspect      | 9:16 vertical                                          |
| Resolution  | 1080 × 1920 (720 × 1280 is fine for web previews)       |
| Length      | 6–15 seconds for the grid — a short loop, not the full edit |
| File size   | Aim for under 3 MB per clip                            |
| Poster      | JPG or WebP, same aspect, ~200 KB                      |

Cards autoplay muted on hover (desktop) and on tap (mobile), and video is only
fetched once a card is near the viewport — so keeping clips short and light
keeps the page fast even with a full grid.

Always add a poster image: it is what visitors see before playback starts.
