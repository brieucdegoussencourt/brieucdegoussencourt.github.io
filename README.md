# Brieuc de Goussencourt — Digital Consultant

A single-page portfolio landing page for an **independent IT specialist &
digital consultant** who helps small businesses with comprehensive digital
solutions — websites, apps, custom APIs, and data management.

> **Core message:** _I remove digital friction so your business can grow._

🔗 Live: [brieucdegoussencourt.github.io](https://brieucdegoussencourt.github.io)

## Positioning

Business-oriented rather than a stereotypical "tech geek": a partner who pairs
**business strategy** and **user experience** with solid **IT solutions** to
deliver frictionless, highly intuitive digital experiences that solve real
business problems. Tone throughout: professional, reassuring, authoritative yet
approachable, and sophisticated.

## Design language

Drawn from **organic Japandi** interiors and minimalist architectural planning:

- **Space & grid** — expansive negative space and structural, grounded layouts.
- **Palette** — warm, grounded neutrals (soft stone, warm wood, matte charcoal),
  defined as Tailwind theme tokens in `src/index.css`. No stark black/white or
  neon "tech" colors.
- **Typography** — [Inter](https://fonts.google.com/specimen/Inter) for legible
  body text, [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
  for sophisticated serif accents.
- **Motion** — intentional and subtle: gentle fade-ins on scroll and smooth
  anchor scrolling, with `prefers-reduced-motion` respected.

## Page structure

| Section | Component | Purpose |
| --- | --- | --- |
| **Hero** | `Hero.jsx` | Impact headline on business outcomes + dual-expertise sub-headline (business strategy / UX / IT) and the primary CTA, _"Discuss Your Project."_ |
| **How I Work** | `Process.jsx` | A reassuring, business-first process — bridging clean UI/UX and capable backend (APIs, real-time data) with clean iconography, no jargon. |
| **Selected Work** | `Portfolio.jsx` | Three curated **micro-case studies**, each structured as Friction → Solution → Outcome with a "View Project" link. |
| **Footer & CTA** | `Footer.jsx` | A final, reassuring invitation to connect — technology as an asset, not a headache — plus LinkedIn / Contact / Legal links. |

> The three portfolio entries currently use placeholder copy in the `projects`
> array of `Portfolio.jsx`; the Friction → Solution → Outcome structure is in
> place and ready for real project details.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v4** (theme tokens defined CSS-first in `src/index.css`)
- Semantic, accessible HTML5 — skip link, focus styles, reduced-motion support
- Fully responsive (mobile-first)
- Deployed to **GitHub Pages** via GitHub Actions

## Develop

Requires **Node 20+** (use `nvm use 20`).

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project layout

- `src/components/` — page sections: `Nav`, `Hero`, `Process`, `Portfolio`, `Footer`
- `src/components/icons.jsx` — minimal line iconography (inline SVG)
- `src/lib/useReveal.js` — gentle fade-in-on-scroll hook (IntersectionObserver)
- `src/index.css` — Tailwind import + Japandi theme tokens
- `public/` — static assets (CV, favicon)

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages.

> One-time setup: in the repo's **Settings → Pages**, set **Source** to
> **GitHub Actions**.
