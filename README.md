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

Text and data are kept apart, so translating and re-styling never collide.

### Text — `src/i18n/`

The site is in **English, German and Arabic**. All visible text lives in three
files with an identical shape:

```
src/i18n/en.ts    English — the reference file
src/i18n/de.ts    German
src/i18n/ar.ts    Arabic (rendered right-to-left)
```

To change wording, edit the same key in each file. TypeScript will tell you if a
key is missing or misspelled in a translation, so the three cannot drift apart.

Visitors choose their language once, in a modal on first visit; the choice is
stored in their browser and can be changed any time from the switcher in the
header. Arabic switches the whole layout to RTL and swaps in a typeface that
covers Arabic properly.

### Data — `src/content/site.ts`

Everything language-independent:

| What you want to change             | Where in the file  |
| ----------------------------------- | ------------------ |
| Email, Instagram and TikTok links   | `site`             |
| Featured Instagram Reels            | `featuredReels`    |
| Portfolio items and their media     | `work`             |
| Portfolio categories                | `categoryKeys`     |
| Brands listed under Work            | `experienceBrands` |
| Prices                              | `pricingTiers`     |
| Hero figures (27K, 3, 5, 48h)       | `heroProof`        |

Anything still needing a real value is marked `// TODO`.

### Portfolio media

Portfolio videos and covers are named after each item's `id`:

```
public/media/work/morning-light.mp4
public/media/work/morning-light.jpg
```

**Overwrite the file keeping the same name and the site picks it up** — no code
change. The files currently there are generated placeholders in the site's
palette. See `public/media/README.md` for export settings and how to add items.

Cards autoplay muted when scrolled into view, loop, pause when they scroll away,
and carry a sound toggle. Video is only fetched once a card is near the
viewport, so a full grid stays fast on mobile.

### Design

All colours, fonts and radii are defined once at the top of `src/index.css` in
the `@theme` block. Change them there and the whole site follows.

The palette is a warm editorial neutral (bone / sand / warm ink) with a muted
clay tone and a **dusty blush accent** used selectively — buttons, hover states,
selected filters and small highlights. The neutrals stay dominant by design; if
you want more or less pink, adjust `--color-blush*` in that one block.

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
  i18n/               en.ts / de.ts / ar.ts — all visible text
                      index.tsx — language state, storage, RTL
  content/site.ts     links, media paths, prices, portfolio structure
  components/         Header, Footer, Section, VideoCard,
                      FeaturedReels, ReelLightbox,
                      LanguageModal, LanguageSwitcher
  sections/           Hero, Work, Services, About, Process,
                      Partnerships, Pricing, Contact
  lib/useReveal.ts    scroll-in animation hook
  index.css           design tokens + shared utility classes
public/
  media/work/         portfolio videos and covers
  media/reels/        optional Reel covers
```

## Performance & accessibility notes

- Videos are never fetched on page load — a card attaches its source only once
  it is near the viewport, plays muted while on screen, and pauses when it
  scrolls away. If a browser refuses unattended playback, the cover stays and a
  play button appears, so a tile is never dead.
- Fonts are self-hosted and subset (Latin and Arabic), so there is no
  third-party request.
- Motion respects `prefers-reduced-motion`; reveal animations are skipped
  entirely for users who ask for that.
- Semantic landmarks, a skip link, visible focus rings, labelled form fields
  and an `aria-live` region for submission status.
- `lang` and `dir` are set on the document from the chosen language, and layout
  uses logical properties so RTL mirrors correctly rather than being patched.
