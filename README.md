# brieuc.co — Brieuc de Goussencourt, développeur & UX designer

A single-page site (in French) for an **independent developer & UX designer**
who builds websites, apps and connected tools for freelancers and businesses,
from interface design to production.

> **One-liner:** _Building custom digital tools for modern web experiences._

🔗 Live: [brieuc.co](https://brieuc.co)

## Positioning

A partner rather than a stereotypical "tech geek": user experience comes
first, backed by solid engineering. A background as a film director informs
the visual eye; the copy stays clear, reassuring and jargon-free, while the
interface wears a developer/terminal aesthetic.

## Brand & design language

The identity is defined in [`brand/`](brand/): the original interactive deck
([`brand/brand-deck.html`](brand/brand-deck.html)) and the extracted rules
([`brand/README.md`](brand/README.md)). Start there for any brieuc.co work.

- **Mark** — squircle obsidian tile with a white geometric **B** and a pink
  square cursor dot (`brand/mark.svg`, also `public/favicon.svg`).
- **Wordmark** — bold `brieuc` + pink `.co`.
- **Palette** — brand pink `#EC4899` (pink text `#BE185D`), slate neutrals,
  charcoal ink `#0F172A`, obsidian `#111318` dark surfaces. Defined as Tailwind
  theme tokens in `src/index.css`.
- **Typography** — [Inter](https://fonts.google.com/specimen/Inter) for text,
  [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for
  interface chrome.
- **Visual language** — terminal/editor metaphor: `~/brieuc $ command` section
  headers, blinking cursor, window-chrome dots, a 28px blueprint grid.
- **Motion** — typewriter headings, scrambled paragraph reveals, one easing
  (`cubic-bezier(0.16, 1, 0.3, 1)`); `prefers-reduced-motion` respected.

## Page structure

| Section | Component | Purpose |
| --- | --- | --- |
| **Hero** | `Hero.jsx` + `Terminal.jsx` | "Bonjour, je suis Brieuc." with the offer and CTAs, beside a terminal that renders the portrait in pixels. |
| **01 Vision** | `About.jsx` | UX-first conviction and the film-director background. |
| **02 Méthode** | `Process.jsx` | Three steps: cadrage & maquette → prototype & ajustements → mise en ligne & suivi. |
| **03 Projets** | `Portfolio.jsx` | Real projects (Le Cottage des Perdrix, Patrimony, Trek Kleinwalsertal) with live and repo links. |
| **04 Contact** | `Footer.jsx` | Closing invitation: Cal.com booking, phone, e-mail, LinkedIn / GitHub / legal notice. |

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v4** (theme tokens defined CSS-first in `src/index.css`)
- **Motion** (`motion/react`) for animation
- **Cal.com** embed for booking (`src/lib/booking.js`)
- Semantic, accessible HTML — skip link, focus styles, reduced-motion support
- Hosted on **Vercel** at brieuc.co

## Develop

Requires **Node 20+** (use `nvm use 20`).

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project layout

- `src/components/` — page sections (`Nav`, `Hero`, `About`, `Process`,
  `Portfolio`, `Footer`, `Legal`) plus `Terminal` (pixel portrait), `TextFx`
  (typewriter / scramble), `ui` (shared layout, buttons) and `icons`
- `src/lib/` — `motion.js` (shared variants), `booking.js` (Cal.com config)
- `src/index.css` — Tailwind import + brand theme tokens
- `public/` — favicon, portrait, project images, `email/logo.png`
- `brand/` — brand deck, spec and master logo files
- `email-signature.html` — copy-paste email signature in the brand style
- `github-pages-redirect/` — redirect page for the old github.io address

## Deploy

The site deploys on **Vercel** (brieuc.co) on push to `main`.
`.github/workflows/deploy.yml` publishes only `github-pages-redirect/` to
GitHub Pages, so old `brieucdegoussencourt.github.io` links forward to
brieuc.co.
