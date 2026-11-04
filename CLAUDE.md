# doodles

Small, self-contained web toys. Public repo `levilindsey/doodles`.

## Layout

- One folder per doodle, each a single self-contained `index.html`: inline
  CSS and JS, no build step and no dependencies beyond Google Fonts. Keep
  it that way so a doodle can be opened straight from disk.
- `index.html` at the root is the gallery. Add a card there for each new
  doodle, plus a row in `README.md`.
- `.nojekyll` makes GitHub Pages serve the files as they are.
- `scripts/`: verification harnesses (headless Chrome via puppeteer-core).

## Hosting

- GitHub Pages serves `master` from the root at
  <https://levilindsey.github.io/doodles/>, and deploys on every push.
- levi.dev proxies each doodle at a short route through a Cloudflare
  Pages Function (`levi.dev/functions/<route>/[[path]].js`), and its root
  catchall 301s aliases to that route. `nerd-hero/` is served at
  `levi.dev/nerdhero`, with `/nerd`, `/hero` and `/nerd-hero` as aliases.
  Use relative URLs inside a doodle, so it works at both addresses.

## Workflow

- Commit and push straight to `master`. No versioning.
- Before pushing a visual change, screenshot it and look at the pictures,
  e.g. `node scripts/nerd-hero-shots.mjs <outDir>`. nerd-hero takes
  `?t=<seconds>` to freeze its timeline.
- Open work lives in `LEDGER.md` (prefix `DD`).
