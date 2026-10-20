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
  interface chrome, both self-hosted as variable fonts via Fontsource.
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

- **React 18** + **Vite 7**
- **Tailwind CSS v4** (theme tokens defined CSS-first in `src/index.css`)
- **Motion** (`motion/react`) for animation
- **Cal.com** embed for booking (`src/lib/booking.js`), loaded only on intent
- **Fontsource** variable fonts (`@fontsource-variable/inter`,
  `@fontsource-variable/jetbrains-mono`), bundled — no Google Fonts requests
- Hosted on **Vercel** at brieuc.co, headers in `vercel.json`

## Security

Response headers are set in [`vercel.json`](vercel.json) and also served by
`npm run preview`, so the local production preview behaves like brieuc.co:

- **Content-Security-Policy** — everything from `'self'`, plus Cal.com
  (`app.cal.com` script and iframe). No `data:` fonts, no third-party styles,
  `object-src 'none'`, `frame-ancestors 'none'`. Styles allow
  `'unsafe-inline'` because the Cal.com embed injects `<style>` tags.
- **Inline scripts are allowed by hash.** `index.html` has one (it applies the
  saved theme before first paint). If you edit it, the build fails with the
  new `'sha256-…'` value to put in `script-src` — copy it into `vercel.json`.
- **HSTS**, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Cross-Origin-Opener-Policy: same-origin` and a `Permissions-Policy` that
  turns off camera, microphone, geolocation, payment, USB and Topics.
- External links use `rel="noopener noreferrer"`; there are no forms, no
  cookies and no analytics on the site itself.
- The GitHub Pages workflow runs with read-only permissions; only the deploy
  job gets `pages: write`.
- Run `npm audit` after dependency updates (0 known vulnerabilities as of
  2026-10-20).

When adding a third-party service (analytics, a map, a video embed…), add
its origins to the matching CSP directive in `vercel.json`, then check the
browser console on `npm run preview` for CSP violations.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, sections
  labelled by their headings, and a skip link to `#main`.
- Visible `:focus-visible` ring (pink, 2px) on every interactive element;
  anchor targets clear the fixed header (`scroll-padding-top`).
- Animated text (`Typewriter`, `Scramble`) keeps a plain screen-reader copy
  and hides the animated layer with `aria-hidden`. Decorative chrome (shell
  prompts, window dots, `↵` hints, the progress bar) is hidden too.
- `prefers-reduced-motion` is honoured by CSS, Motion (`MotionConfig`) and the
  canvas portrait, which then draws instantly.
- Links that open a new tab say so to screen readers; icon-only buttons have
  labels; the legal notice is a native `<dialog>` (focus trap, Escape).
- Colours meet WCAG AA for text in both themes; `--color-faint` is for
  decorative elements only.
- Touch targets are at least 36px (44px for primary actions).

## Performance

- One JS bundle (~106 kB gzip) and one CSS file, both content-hashed and
  cached for a year (`/assets/*`, `immutable`).
- Fonts are variable woff2 split by `unicode-range`, so a French page only
  downloads the two Latin files (~90 kB). Vite is told never to inline them.
- The portrait is preloaded from `index.html` and decoded while the terminal
  command types, so the pixel render starts on time.
- Project screenshots ship as WebP at 800/1200/1800px with an accurate
  `sizes`, `loading="lazy"` and fixed dimensions (no layout shift).
- Cal.com (script + cookie) is only fetched when a visitor hovers, focuses or
  touches a booking button.

## Develop

Requires **Node 22 or 24** (`engines` in `package.json`; Vercel builds with
the same range — Node 20 is deprecated there).

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/ (fails if the CSP hash is stale)
npm run preview  # serve dist/ with the production security headers
```

## Project layout

- `src/components/` — page sections (`Nav`, `Hero`, `About`, `Process`,
  `Portfolio`, `Footer`, `Legal`) plus `Terminal` (pixel portrait), `TextFx`
  (typewriter / scramble), `ui` (shared layout, buttons) and `icons`
- `src/lib/` — `motion.js` (shared variants), `booking.js` (Cal.com config)
- `src/index.css` — Tailwind import + brand theme tokens
- `vercel.json` — security and cache headers
- `vite.config.js` — build config, CSP hash check, preview headers
- `public/` — favicon, portrait, project images, `email/logo.png`
- `brand/` — brand deck, spec and master logo files
- `email-signature.html` — copy-paste email signature in the brand style
- `github-pages-redirect/` — redirect page for the old github.io address

## Deploy

The site deploys on **Vercel** (brieuc.co) on push to `main`.
`.github/workflows/deploy.yml` publishes only `github-pages-redirect/` to
GitHub Pages, so old `brieucdegoussencourt.github.io` links forward to
brieuc.co.

## Email

The public contact address is **hello@brieuc.co** (`EMAIL` in `Footer.jsx`
and `Legal.jsx`). The domain has no mailbox: [ImprovMX](https://improvmx.com)
forwards it to the personal Gmail inbox. DNS lives in Vercel (brieuc.co →
DNS Records):

| Type | Name | Value | Priority |
| --- | --- | --- | --- |
| MX | `@` | `mx1.improvmx.com` | 10 |
| MX | `@` | `mx2.improvmx.com` | 20 |
| TXT | `@` | `v=spf1 include:spf.improvmx.com ~all` | — |

Aliases are managed in the ImprovMX dashboard.
