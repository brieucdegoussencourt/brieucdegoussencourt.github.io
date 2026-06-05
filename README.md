# Brieuc de Goussencourt — Digital Consultant

Personal landing page for an independent IT specialist & digital consultant.
**Core message:** _I remove digital friction so your business can grow._

🔗 Live: [brieucdegoussencourt.github.io](https://brieucdegoussencourt.github.io)

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v4** (warm "Japandi" palette — soft stone, warm wood, matte charcoal)
- **Inter** (body) + **Playfair Display** (accents)
- Deployed to GitHub Pages via GitHub Actions

## Develop

Requires **Node 20+** (use `nvm use 20`).

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

- `src/components/` — page sections: `Nav`, `Hero`, `Process`, `Portfolio`, `Footer`
- `src/lib/useReveal.js` — gentle fade-in-on-scroll hook
- `src/index.css` — Tailwind import + Japandi theme tokens
- `public/` — static assets (CV, favicon)

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.

> One-time setup: in the repo's **Settings → Pages**, set **Source** to
> **GitHub Actions**.
