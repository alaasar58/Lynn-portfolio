# Lynn — Lifestyle & Product Content Creator

Portfolio and inquiry site for a multilingual lifestyle and product content
creator, aimed at consumer brands, e-commerce companies and agencies.

Built with **React + TypeScript + Vite + Tailwind CSS v4**. Static output — it
runs on GitHub Pages, Netlify, Vercel or any static host, with no server needed.

---

## Running it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint
```

---

## Editing the site

Almost everything you would want to change lives in **one file**:

### `src/content/site.ts`

| What you want to change            | Where in the file      |
| ---------------------------------- | ---------------------- |
| Name, email, social links          | `site`                 |
| Headline and hero text             | `hero`                 |
| Featured Instagram Reels           | `featuredReels`        |
| Portfolio pieces and categories    | `work`, `workCategories` |
| Brands / products listed under Work | `experienceBrands`     |
| Services                           | `services`             |
| About text, languages, audience    | `about`                |
| The 5 process steps                | `process`              |
| Collaboration models               | `partnerships`         |
| Prices and quote factors           | `pricing`              |
| Contact form dropdown options      | `contact`              |

Anything still needing a real value is marked `// TODO` in that file. Before
going live, the ones that matter are:

- `featuredReels[].title` / `.note` — rename each Reel to describe the video
- `pricing.tiers[].price` — the starting prices (currently the `€XXX` placeholder)
- `site.url` and the URLs in `index.html` — only if a custom domain is added

### Featured Instagram Reels

The three published Reels shown at the top of the portfolio and in the hero are
listed in `featuredReels`. Each entry needs only the shortcode from the Reel
URL — `instagram.com/reel/DabNET8N0QF/` → `code: 'DabNET8N0QF'`.

Clicking a card opens the Reel in a lightbox using Instagram's official embed,
with a direct link to the original post always visible underneath. Instagram can
refuse to be framed (ad blockers, some privacy settings), and a cross-origin
frame cannot be inspected to detect that — hence the permanent link rather than
a hidden fallback.

If the embed ever proves unreliable, switch one value in `src/content/site.ts`:

```ts
export const reelDisplay: 'embed' | 'link' = 'link'
```

Cards then open the original Instagram post directly instead. Nothing else
changes.

To give a Reel a cover image, save a still into `public/media/reels/` and set
`poster: '/media/reels/<code>.jpg'`. Without one the card shows a warm tonal
panel, which still looks intentional.

### Pricing

All three tiers live in the `pricing` object in `src/content/site.ts` and
nowhere else — prices are never hard-coded in a component. Each tier has a
`price` (currently the `€XXX` placeholder), a `unit` line such as
"starting from", a description and its bullet points. Edit them there and the
Pricing section updates.

### Adding portfolio videos

Put files in `public/media/work/`, then point a work item at them:

```ts
{
  id: 'baby-feeding-set',
  title: 'Baby feeding set',
  category: 'Family & Baby',
  note: 'Product demonstration · voiceover',
  video: '/media/work/baby-feeding-set.mp4',
  poster: '/media/work/baby-feeding-set.jpg',
  paid: true,            // only for confirmed paid collaborations
  brand: 'Brand name',   // shown as a badge when `paid` is set
}
```

Items without media show a styled placeholder, so the grid always looks
finished. See `public/media/README.md` for export settings.

The order of the `work` array is the order on the page — strongest pieces first.

### Changing the look

All colours, fonts and radii are defined once at the top of `src/index.css` in
the `@theme` block. Change them there and the whole site follows.

The current palette is a warm editorial neutral (bone / sand / warm ink) with a
muted clay accent, chosen to sit behind natural-light lifestyle photography
without competing with it. If the Instagram identity should drive the palette
more closely, adjust `--color-*` values there — no component changes needed.

---

## The inquiry form

The form works in two modes:

1. **With a form endpoint** — set `VITE_FORM_ENDPOINT` to a Formspree, Getform,
   Basin or similar URL. Submissions post straight to it.
2. **Without one** (the default) — the form opens a pre-filled email to
   `site.email`, so it is never a dead end.

Copy `.env.example` to `.env` and fill it in for local use. For GitHub Pages,
add the endpoint as a repository secret named `VITE_FORM_ENDPOINT`; the deploy
workflow passes it through at build time.

A hidden honeypot field filters out basic spam bots.

---

## Deploying

### GitHub Pages (no custom domain needed)

The site is live at **https://alaasar58.github.io/Lynn-portfolio/**

`.github/workflows/deploy.yml` builds and publishes automatically on every push.

One thing worth knowing: GitHub only accepts a Pages deployment from the branch
configured as the Pages **source** (Settings → Pages). Right now that is
`claude/lifestyle-creator-portfolio-ehmgc6`, so the workflow triggers on that
branch as well as `main`. If the source is later changed to `main`, drop the
other branch from the `on: push: branches:` list.

### Connecting a custom domain later

No rebuild of the site is required:

1. Point the domain at the host.
2. Set `VITE_BASE=/` (on GitHub Pages, add a `CNAME` file in `public/` and change
   `VITE_BASE` in the workflow to `/`).
3. Update `site.url` and the `canonical` / `og:` URLs in `index.html`.

### Other hosts

Netlify or Vercel work with no configuration: build command `npm run build`,
publish directory `dist`.

---

## Project structure

```
src/
  content/site.ts     all site copy and data — the main file to edit
  components/         Header, Footer, Section, VideoCard
  sections/           Hero, Work, Services, About, Process,
                      Partnerships, Pricing, Contact
  lib/useReveal.ts    scroll-in animation hook
  index.css           design tokens + shared utility classes
public/
  media/work/         portfolio videos and posters
```

## Performance & accessibility notes

- Videos are never fetched on page load — a card only attaches its source once
  it is near the viewport, and plays on hover or tap.
- Fonts are self-hosted and subset, so there is no third-party request.
- Motion respects `prefers-reduced-motion`; reveal animations are skipped
  entirely for users who ask for that.
- Semantic landmarks, a skip link, visible focus rings, labelled form fields
  and a `aria-live` region for submission status.
