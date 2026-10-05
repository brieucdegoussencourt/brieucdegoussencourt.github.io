import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
  Decorative terminal window that "types" a short script. Every line is
  rendered from the start (untyped parts are invisible) so the window never
  changes height. The real content lives in the hero copy, so the whole
  window is hidden from assistive tech.
*/
const script = [
  {
    cmd: "whoami",
    out: (
      <span className="flex items-center gap-3">
        <picture className="block h-9 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-line">
          <source srcSet="/picture/brieuc.avif" type="image/avif" />
          <img
            src="/picture/brieuc.webp"
            alt=""
            width="72"
            height="72"
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </picture>
        <span>
          <span className="text-ink">Brieuc de Goussencourt</span>
          <br />
          <span className="text-muted">Développeur &amp; UX Designer · Belgique</span>
        </span>
      </span>
    ),
  },
  {
    cmd: "ls services/",
    out: (
      <span className="flex flex-wrap gap-x-5 gap-y-1">
        <span className="text-blue">sites/</span>
        <span className="text-blue">applications/</span>
        <span className="text-blue">outils-connectés/</span>
      </span>
    ),
  },
  {
    cmd: "cat stack.json",
    out: (
      <span>
        {"{ "}
        <span className="text-violet">"front"</span>: [
        <span className="text-amber">"React"</span>,{" "}
        <span className="text-amber">"Tailwind"</span>],{" "}
        <span className="text-violet">"focus"</span>:{" "}
        <span className="text-amber">"UX"</span>
        {" }"}
      </span>
    ),
  },
  {
    cmd: "./deploy --sur-mesure",
    out: (
      <span>
        <span className="text-green">✓</span> Solution fluide en production{" "}
        <span className="text-faint">(0 friction)</span>
      </span>
    ),
  },
];

const TYPE_MS = 45;
const PAUSE_MS = 380;

export default function Terminal({ className = "" }) {
  const reduce = useReducedMotion();
  // Progress: which line is being typed, and how many characters of it.
  const [line, setLine] = useState(reduce ? script.length : 0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) {
      setLine(script.length);
      return;
    }
    if (line >= script.length) return;
    const cmd = script[line].cmd;
    const delay = line === 0 && chars === 0 ? 900 : chars < cmd.length ? TYPE_MS : PAUSE_MS;
    const t = setTimeout(() => {
      if (chars < cmd.length) setChars((c) => c + 1);
      else {
        setLine((l) => l + 1);
        setChars(0);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [line, chars, reduce]);

  const done = line >= script.length;

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-24px_rgba(24,24,27,0.25)] ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line bg-subtle px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
        <span className="ml-3 font-mono text-[11px] text-muted">brieuc — zsh — 80×24</span>
      </div>

      {/* Session */}
      <div className="space-y-3 px-4 py-4 font-mono text-[12.5px] leading-6 text-ink-soft sm:px-5 sm:py-5 sm:text-[13px]">
        {script.map((s, i) => {
          const typed = i < line ? s.cmd.length : i === line ? chars : 0;
          const active = i === line;
          return (
            <div key={s.cmd}>
              <p className={i > line ? "invisible" : ""}>
                <span className="text-green">❯</span>{" "}
                <span className="text-ink">{s.cmd.slice(0, typed)}</span>
                <span className="invisible">{s.cmd.slice(typed)}</span>
                {active && !done && <Caret />}
              </p>
              <motion.div
                initial={false}
                animate={i < line ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-1"
              >
                {s.out}
              </motion.div>
            </div>
          );
        })}
        <p className={done ? "" : "invisible"}>
          <span className="text-green">❯</span> <Caret />
        </p>
      </div>
    </div>
  );
}

function Caret() {
  return (
    <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-ink" />
  );
}
