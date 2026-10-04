/*
  Shared layout primitives — one container width, one vertical rhythm,
  one section-header pattern and one set of buttons for the whole page.
*/
import { useReveal } from "../lib/useReveal.js";
import { ArrowIcon } from "./icons.jsx";

/* Same horizontal frame everywhere: 72rem max, 24px / 32px gutters. */
export function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* Same vertical rhythm for every content section. */
export function Section({ id, className = "", labelledBy, children }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-20 sm:py-24 lg:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ tone = "light", children }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-clay-soft" : "text-clay-deep"
      }`}
    >
      {children}
    </p>
  );
}

/*
  Section header on a 12-column grid: eyebrow + title on the left,
  lead text (or any content) on the right. Stacks on small screens.
  On scroll, eyebrow → title → lead fade in one after another.
*/
export function SectionHeader({ id, eyebrow, title, tone = "light", children }) {
  const ref = useReveal();
  const dark = tone === "dark";
  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-12 lg:gap-12">
      <div className="space-y-4 lg:col-span-5">
        <div className="reveal-item">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
        <h2
          id={id}
          style={{ "--d": "100ms" }}
          className={`reveal-item text-balance font-serif text-3xl leading-tight tracking-tight sm:text-4xl ${
            dark ? "text-canvas" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
      </div>
      {children && (
        <div
          style={{ "--d": "220ms" }}
          className={`reveal-item space-y-5 text-lg leading-relaxed lg:col-span-7 lg:pt-8 ${
            dark ? "text-canvas/75" : "text-charcoal-soft"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/*
  Interaction system — one timing, one easing, three tiers:
  - buttons: lift 2px + soft shadow + colour shift, arrow nudges right
  - text links: colour darkens + underline grows (see .link-underline)
  - icon buttons: soft circular background
*/
const motion = "transition-all duration-300 ease-organic";

const btnBase = `group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-semibold ${motion} hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0`;

const sizes = {
  md: "min-h-11 px-6 text-sm",
  sm: "min-h-10 px-5 text-sm",
};

const variants = {
  primary:
    "bg-charcoal text-canvas hover:bg-charcoal-soft hover:shadow-[0_12px_24px_-12px_rgba(58,54,49,0.7)]",
  secondary:
    "border border-charcoal/30 bg-charcoal/[0.04] text-charcoal hover:border-dawn-deep hover:bg-dawn/15 hover:shadow-[0_12px_24px_-14px_rgba(86,110,127,0.6)]",
  primaryOnDark:
    "bg-canvas text-charcoal hover:bg-dawn-soft hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.6)]",
  secondaryOnDark:
    "border border-canvas/30 text-canvas hover:border-dawn-soft hover:bg-canvas/10 hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.6)]",
};

export function buttonClass(variant = "primary", size = "md") {
  return `${btnBase} ${sizes[size]} ${variants[variant]}`;
}

export const buttonStyles = Object.fromEntries(
  Object.keys(variants).map((v) => [v, buttonClass(v)]),
);

/* Arrow that nudges right when its button or link is hovered. */
export function HoverArrow() {
  return (
    <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-organic group-hover/btn:translate-x-1 group-hover/link:translate-x-1" />
  );
}

/* Text links: wrap the label in <span className="link-underline">. */
export const linkClass = `group/link inline-flex items-center gap-2 ${motion}`;

/* Icon-only buttons (menu, close). */
export const iconButtonClass = `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${motion} hover:bg-sand active:scale-95`;

/* Screen-reader hint for links that open a new tab. */
export function NewTabHint() {
  return <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>;
}

/* Emphasised key word inside body copy. */
export function Strong({ children }) {
  return <strong className="font-semibold text-charcoal">{children}</strong>;
}
