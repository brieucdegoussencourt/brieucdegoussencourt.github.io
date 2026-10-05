# brieuc.co — brand reference

Source of truth for every brieuc.co project (site, email signature, decks,
documents). [`brand-deck.html`](brand-deck.html) is the original interactive
deck (open it in a browser; ← / → or 1–4 to navigate, toggle dark mode in the
header). This file extracts the rules from it.

## Mark & lockup

| File | Use |
| --- | --- |
| [`mark.svg`](mark.svg) | The **B.** mark — master vector (also `public/favicon.svg`) |
| [`mark-512.png`](mark-512.png) | Raster mark for places that refuse SVG |
| `public/email/logo.png` | 144 px mark for the email signature (served at brieuc.co/email/logo.png) |
| [`og-image.svg`](og-image.svg) | 1200×630 social share card → `public/og-image.png` (render with headless Chrome so Inter / JetBrains Mono load; ImageMagick's SVG renderer breaks the text) |

- **Mark:** squircle tile (`rx` = 24% of the side) in obsidian `#111318` with a
  1.5px `#2A2F3A` hairline; a bold geometric white **B** with even bowls; a
  rounded pink square "cursor dot" sitting on the baseline to its right.
- **Wordmark:** `brieuc` in charcoal (white on dark) + `.co` in brand pink,
  bold geometric sans, tight tracking. The dot is part of `.co` and is pink.
- **Lockup:** mark left, wordmark right, wordmark cap-height ≈ half the tile.
- Never recolour the B or the tile; the pink dot is the only accent in the mark.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| Brand pink | `#EC4899` | Logo dot, `.co`, accent fills, lines, cursor |
| Pink dark | `#DB2777` | Hover on pink fills |
| Pink text | `#BE185D` | Pink **text** on light backgrounds (AA) |
| Pink light | `#F9A8D4` | Pink text on dark surfaces |
| Charcoal | `#0F172A` | Primary text, primary buttons |
| Obsidian | `#111318` | Logo tile, dark surfaces |
| Surface dark | `#181B22` | Raised panels on obsidian |
| Border dark | `#2A2F3A` | Hairlines on obsidian |
| Blueprint | `#E2E8F0` | Hairlines and the grid on light |
| Neutrals | Tailwind slate 50–500 | Canvas `#F8FAFC`, subtle `#F1F5F9`, muted text `#5B6B80` (slate-500 `#64748B` fails AA on subtle) |
| Status | `#10B981` / `#F59E0B` / `#EF4444` | "Ready" pill and window-chrome dots only |

Brand pink `#EC4899` is below 4.5:1 on white — use it for shapes and large
display marks, `#BE185D` for body-size pink text.

## Type

- **Inter** (300–700) for headings and body. Headings bold, tight tracking.
- **JetBrains Mono** (400–700) for interface chrome: prompts, labels, chips,
  counters, metadata.
- Email-safe fallbacks: Arial / Helvetica and Menlo / Consolas.

## Visual language

- **Terminal / editor metaphor:** `$ ./command --flag` headers, blinking pink
  block cursor, vim-style status line, `NN // SECTION` index labels, macOS
  window dots.
- **Blueprint grid:** 28px square grid in `#E2E8F0` (light) / `#2A2F3A` at
  ~45% (dark), behind hero areas only.
- **Surfaces:** `rounded-xl`/`2xl` cards, 1px borders, border turns pink on
  hover; one soft pink glow (`#EC4899` at 10%, heavily blurred) per view max.
- **Motion:** short (≈280 ms), `cubic-bezier(0.16, 1, 0.3, 1)`; respect
  `prefers-reduced-motion`.
- Light and dark modes are both first-class.

## Voice

- Title: **Developer & UX Designer** (FR: *développeur & UX designer*).
- One-liner: *Building custom digital tools for modern web experiences.*
- Concise, technical-but-friendly, command-line flavoured labels.

## Deck placeholders — not facts

The deck's slides 2–4 contain sample content that must be checked before reuse:
metrics (Lighthouse 100, <45 ms, "4 weeks MVP"), stack tags (Next.js 15,
Framer Motion, WebGL), location ("Paris, FR" vs "Brussels / Remote"), GitHub
handle `@brieuc` (real: `brieucdegoussencourt`) and `hello@brieuc.co`.
