# Re-EL Website (ScrewFast / Astro)

Re-EL marketing site built on the [ScrewFast](https://themewagon.github.io/screwfast/) Astro + Tailwind template, customized with Re-EL branding, services, cart, and contact flows.

## Develop

```bash
cd website
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:4321/website/`).

## Build

```bash
npm run build
```

Static output is written to `website/dist/`. Publish that folder to your host (GitHub Pages, rf.gd, etc.) with base path `/website/`.

## Legacy static site

The previous HTML/CSS site is preserved in `../website-legacy/` for reference (services catalog, cart markup, team pages).

## Re-EL assets

Brand images live in `public/assets/images/`. Cart logic is in `public/js/store.js`.
