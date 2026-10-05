/*
  Shared layout primitives — one container, one "command block" section
  pattern and one set of buttons for the whole page.
*/
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowIcon } from "./icons.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";
import { Typewriter, Scramble } from "./TextFx.jsx";

/* Same horizontal frame everywhere: 72rem max, 16px / 24px / 32px gutters. */
export function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* Shell prompt: `~/brieuc $ <cmd>` */
export function Prompt({ cmd, tone = "light", cursor = false, className = "" }) {
  const dark = tone === "dark";
  return (
    <p className={`font-mono text-[13px] leading-6 ${className}`}>
      <span className={dark ? "text-pink-light" : "text-pink-deep"}>~/brieuc</span>{" "}
      <span className={dark ? "text-white/40" : "text-faint"}>$</span>{" "}
      <span className={dark ? "text-white" : "text-ink"}>{cmd}</span>
      {cursor && (
        <span
          aria-hidden="true"
          className={`ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.2em] animate-blink ${
            dark ? "bg-white/80" : "bg-ink"
          }`}
        />
      )}
    </p>
  );
}

/*
  A content section rendered as a command block: an index + prompt line,
  then the title on the left and the output (children) on the right.
*/
export function Block({ id, index, cmd, title, lead, children, className = "" }) {
  const titleId = `${id}-title`;
  // The lead decodes once the title has finished typing.
  const [titleDone, setTitleDone] = useState(false);
  return (
    <section id={id} aria-labelledby={titleId} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        <motion.div variants={stagger(0.08)} {...inView}>
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 border-b border-line pb-4"
          >
            <span className="font-mono text-[13px] text-faint" aria-hidden="true">
              {index}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
            <Prompt cmd={cmd} />
          </motion.div>

          <div className="grid gap-6 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12">
            <Typewriter
              as="h2"
              id={titleId}
              onDone={() => setTitleDone(true)}
              className="text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:col-span-5"
            >
              {title}
            </Typewriter>
            {lead && (
              <Scramble
                as="div"
                start={titleDone}
                className="space-y-4 text-pretty text-lg leading-relaxed text-ink-soft lg:col-span-7 lg:pt-1.5"
              >
                {lead}
              </Scramble>
            )}
          </div>
        </motion.div>

        {children}
      </Container>
    </section>
  );
}

/* Small mono label chip, e.g. `#reservation`. */
export function Chip({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-line bg-subtle px-2 py-0.5 font-mono text-xs text-ink-soft ${className}`}
    >
      {children}
    </span>
  );
}

/* Keyboard hint, e.g. ↵ inside a button. */
export function Kbd({ children, className = "" }) {
  return (
    <kbd
      aria-hidden="true"
      className={`inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-mono text-[11px] font-medium ${className}`}
    >
      {children}
    </kbd>
  );
}

/*
  Interaction system — one timing, one easing:
  - buttons: subtle lift + colour shift, arrow nudges right, press scales down
  - text links: underline grows (see .link-underline)
*/
const motionCls = "transition-all duration-300 ease-out-expo";

const btnBase = `group/btn inline-flex items-center justify-center gap-2.5 rounded-lg font-medium ${motionCls} hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0`;

const sizes = {
  md: "min-h-11 px-5 text-sm",
  sm: "min-h-9 px-3.5 text-[13px]",
};

const variants = {
  primary:
    "bg-ink text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_1px_2px_rgba(0,0,0,0.2)] hover:bg-ink-soft hover:shadow-[0_8px_20px_-8px_rgba(15,23,42,0.5)]",
  secondary:
    "border border-line-strong bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-ink/30 hover:shadow-[0_8px_20px_-10px_rgba(15,23,42,0.25)]",
  primaryOnDark:
    "bg-white text-ink hover:bg-pink-soft hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]",
  secondaryOnDark:
    "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10",
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
    <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/link:translate-x-0.5" />
  );
}

/* Text links: wrap the label in <span className="link-underline">. */
export const linkClass = `group/link inline-flex items-center gap-2 ${motionCls}`;

/* Icon-only buttons (menu, close). */
export const iconButtonClass = `inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${motionCls} hover:bg-subtle active:scale-95`;

/* Screen-reader hint for links that open a new tab. */
export function NewTabHint() {
  return <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>;
}

/* Emphasised key word inside body copy. */
export function Strong({ children }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}
