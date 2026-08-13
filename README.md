# Lynn Kawqge — Digital Creator

A media kit for a multilingual digital creator, aimed at consumer brands,
e-commerce companies and agencies.

It is **four pages in one scroll**:

| Page | Anchor | What is on it |
| ---- | ------ | ------------- |
| 1. Cover | `#top` | Name, role, and the three ways to reach her. Nothing else. |
| 2. Profile | `#about` | About Me, the published Reels in iPhone frames, and the brands |
| 3. Audience | `#audience` | Who is watching — only figures that can be verified |
| 4. Offer | `#services` `#contact` | Services, starting prices, and the inquiry form |

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
| Cover and About images              | `images`           |
| The three clips in the phone frames | `featuredReels`    |
| Brands worked with (and their logos)| `brands`           |
| Follower counts                     | `socialStats`      |
| Audience gender split, updated date | `audienceFacts`    |

Anything still needing a real value is marked `// TODO`.

### Uploading your photos and clips

Everything visible on the site is a file under `public/media/`, and every one of
them is replaced the same way: **overwrite the file, keep the name.** No code
changes; the new file is live on the next deploy.

**`public/media/UPLOAD.md` is the checklist** — every filename, what it is,
which format and which size, written for whoever is doing the uploading. Point
them at that file and nothing else.

The short version:

```
cover.jpg              page 1, the large image        4:5   ~1000 × 1250
about.jpg              beside the About text          5:4   ~1200 × 960
reels/reel-1.mp4/.jpg  left phone                     9:16  1080 × 1920
reels/reel-2.mp4/.jpg  middle phone
reels/reel-3.mp4/.jpg  right phone
brands/<name>.svg|png  optional logos
```

On GitHub: open the folder → **Add file → Upload files** → drop the file in →
**Commit changes**. Filenames are case-sensitive.

### How the clips behave

They attach their source only once the phone is near the viewport, then play
muted and looping while on screen and pause when they scroll away — three clips
cost nothing on page load.

Sound comes on when the pointer is over a phone and goes off when it leaves.
Worth knowing the limit: unmuting requires user activation, which a pointer
moving over an element does not grant, so the first hover of a visit can be
refused and every hover after the visitor's first click succeeds. There is no
way around that, which is why each phone also carries a sound button, and why
clicking a phone — a real gesture — opens the clip large with sound and
controls. Under `prefers-reduced-motion`, nothing starts by itself.

All of that lives in `src/lib/useAutoplayVideo.ts`.

### Audience figures — what is shown and what is not

Page 3 shows only what can be checked: the two follower counts, the gender split
and the age band from `audienceFacts` and `socialStats`, plus the regions from
the dictionaries. Reach, impressions and engagement rate are deliberately
rendered as an **"on request"** state rather than a number, because no verified
figure for them exists in this project.

To publish one later, add it to `audienceFacts` and give it a place in
`src/sections/Audience.tsx`. Please do not put an estimate in — a reach figure
is the one number a brand can check.

### Where the placeholders come from

`npm run media` regenerates every drawn placeholder from
`scripts/media/generate.mjs`. It needs two heavy tools that are deliberately not
in `package.json`, so the deploy never downloads a 30 MB ffmpeg:

```bash
npm i --no-save sharp ffmpeg-static
npm run media            # all of them
npm run media cover      # just one
```

Once all the real photos and clips are in, `scripts/media/` can be deleted.

### Keeping the follower counts current

Both figures come from **one place** — `socialStats` in `src/content/site.ts`:

```ts
export const socialStats = {
  instagramFollowers: 27000,
  tiktokFollowers: 1000,
}
```

Change the number and it updates everywhere: the hero figure (`27K` / `27 Tsd.`
/ `27 ألف`) and the audience list under About (`~27,000 followers`), correctly
formatted in all three languages.

**Can it update itself?** Not on its own. Neither Instagram nor TikTok lets a
website read a follower count without an authenticated API call, and this is a
static site with no server, so there is nothing running to make that call.

There are two honest options:

1. **Update it by hand** (recommended). The number is supporting credibility,
   not a live counter — a rounded figure revisited every few months reads
   exactly the same to a brand, and costs nothing to maintain.
2. **Automate it.** A scheduled GitHub Action can fetch the count and commit the
   new value, which redeploys the site. That needs, on the Instagram side: a
   Business or Creator account linked to a Facebook Page, a Meta app, and a
   long-lived access token stored as a repository secret — and that token has to
   be refreshed roughly every 60 days. TikTok needs its own OAuth app. It is a
   real amount of setup and ongoing upkeep for a number that changes slowly.

If you want option 2, the account and token setup has to be done by you (it
requires logging into your Meta account); the workflow to consume it can be
added afterwards.

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
  content/site.ts     links, media paths, prices, brands, audience facts
  components/         Header, Footer, Section, Glyphs, PhoneFrame,
                      ReelPhones, VideoLightbox, Brands,
                      LanguageModal, LanguageSwitcher
  sections/           Cover, Profile, Audience, Offer, Contact
  lib/useAutoplayVideo.ts  autoplay, pause on exit, sound on hover
  lib/useReveal.ts    scroll-in animation hook
  index.css           design tokens + shared utility classes
public/
  media/cover.jpg     the large image on page 1
  media/about.jpg     image beside the About text
  media/reels/        the three clips and their stills
  media/brands/       optional brand logos
  media/UPLOAD.md     the upload checklist, in German
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
