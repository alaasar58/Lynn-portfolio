# Placeholder generator

Draws every temporary image and clip on the site.

```bash
npm i --no-save sharp ffmpeg-static   # kept out of package.json on purpose
npm run media                          # everything
npm run media hero grwm-evening        # just these scenes
```

`sharp` and `ffmpeg-static` are deliberately **not** dependencies: the GitHub
Pages workflow runs `npm ci`, and adding them would download a ~30 MB ffmpeg on
every deploy for a tool the deploy never runs.

- `scenes.mjs` — the drawing vocabulary (bottles, ring light, suitcase, figure…)
  and the frame wrapper. The composition rules at the top of that file are not
  decoration: the site paints gradients, a play button and badges over these
  images, and the rules say where it is safe to put detail.
- `generate.mjs` — which scene goes in which slot, and the encoding.

**This folder is disposable.** Once real photos and clips replace everything in
`public/media/`, delete it.
