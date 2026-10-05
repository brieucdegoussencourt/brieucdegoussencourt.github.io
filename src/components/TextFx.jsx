/*
  Text animation system — one rule per kind of text:
  - Headings → <Typewriter>: typed left to right behind a pink cursor.
  - Paragraphs → <Scramble>: each character flickers through random glyphs,
    then resolves, sweeping left to right.

  Both take ordinary JSX children (strings, <Strong>, <br>, spans…), start
  when they scroll into view (or when `start` becomes true) and call
  `onDone` once finished, so sequences can be chained. Every character is
  laid out from the first frame, so lines never reflow while animating.
  Screen readers get the plain text; reduced motion shows it instantly.
*/
import {
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInView, useReducedMotion } from "motion/react";

/* ---------- children helpers ---------- */

// Plain text of a JSX tree.
function flatText(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flatText).join("");
  if (isValidElement(node)) return flatText(node.props.children);
  return "";
}

// Rebuild a JSX tree, replacing each string with fn(string, charOffset).
function mapStrings(node, fn, counter = { n: 0 }) {
  if (typeof node === "string" || typeof node === "number") {
    const s = String(node);
    const start = counter.n;
    counter.n += s.length;
    return fn(s, start);
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => <Fragment key={i}>{mapStrings(child, fn, counter)}</Fragment>);
  }
  if (isValidElement(node) && node.props.children != null) {
    return cloneElement(node, undefined, mapStrings(node.props.children, fn, counter));
  }
  return node;
}

/* ---------- timing hooks ---------- */

// Becomes true once in view (or when `start` is true), after `delay` ms.
function useTrigger(ref, start, delay) {
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const go = start ?? inView;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!go || ready) return;
    const id = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(id);
  }, [go, delay, ready]);
  return ready;
}

// Milliseconds elapsed since `running` became true, frame by frame, up to `end`.
function useClock(running, end) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const elapsed = now - t0;
      setT(elapsed);
      if (elapsed < end) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, end]);
  return t;
}

function useOnDone(done, onDone) {
  const fired = useRef(false);
  useEffect(() => {
    if (done && !fired.current) {
      fired.current = true;
      onDone?.();
    }
  }, [done, onDone]);
}

// Wrapper for the screen-reader copy: a div only when the host is a block.
const srWrap = (Tag) => (Tag === "div" ? "div" : "span");

/* ---------- Typewriter (headings) ---------- */

const PUNCT = /[.,:;!?]/;

// When each character appears: a little human jitter, a beat after punctuation.
function typeSchedule(text, speed) {
  let t = 0;
  return Array.from(text, (ch) => {
    t += speed * (0.55 + Math.random() * 0.9);
    if (PUNCT.test(ch)) t += Math.min(speed * 5, 140);
    return t;
  });
}

export function Typewriter({
  as: Tag = "span",
  children,
  speed = 38,
  delay = 0,
  start,
  onDone,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const text = flatText(children);
  const times = useMemo(() => typeSchedule(text, speed), [text, speed]);
  const ready = useTrigger(ref, start, delay);
  const t = useClock(ready && !reduce, times.at(-1) ?? 0);

  let count = text.length;
  if (!reduce) {
    count = 0;
    while (count < times.length && times[count] <= t) count++;
  }
  const done = count >= text.length;
  useOnDone(done, onDone);

  if (done) {
    return (
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    );
  }

  let cursorPlaced = false;
  const typed = mapStrings(children, (s, at) => {
    const shown = Math.max(0, Math.min(s.length, count - at));
    const here = ready && !cursorPlaced && count >= at && count < at + s.length;
    if (here) cursorPlaced = true;
    return (
      <>
        {s.slice(0, shown)}
        {here && <Cursor />}
        <span className="invisible">{s.slice(shown)}</span>
      </>
    );
  });

  const Sr = srWrap(Tag);
  return (
    <Tag ref={ref} {...rest}>
      <Sr className="sr-only">{children}</Sr>
      <Sr aria-hidden="true">{typed}</Sr>
    </Tag>
  );
}

/* Zero-width blinking bar, so it never pushes text around. */
function Cursor() {
  return (
    <span className="relative inline-block w-0">
      <span className="absolute -top-[0.85em] left-px h-[1em] w-[0.08em] min-w-0.5 animate-blink bg-pink" />
    </span>
  );
}

/* ---------- Scramble (paragraphs) ---------- */

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+=/<>_";
const FLICKER_MS = 55;

// Cheap deterministic hash so a glyph only changes once per flicker tick.
function glyph(i, tick) {
  let h = (i * 374761393 + tick * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return GLYPHS[Math.abs(h ^ (h >>> 16)) % GLYPHS.length];
}

export function Scramble({
  as: Tag = "p",
  children,
  duration = 420, // how long each character scrambles
  span = 1400, // max time for the sweep to cross the whole paragraph
  delay = 0,
  start,
  onDone,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const text = flatText(children);
  const step = Math.min(8, span / Math.max(1, text.length));
  const total = text.length * step + duration;
  const ready = useTrigger(ref, start, delay);
  const t = useClock(ready && !reduce, total);
  const done = reduce || t >= total;
  useOnDone(done, onDone);

  if (done) {
    return (
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    );
  }

  const tick = Math.floor(t / FLICKER_MS);
  const scrambled = mapStrings(children, (s, at) => {
    let offset = at;
    // Words keep their real text (invisible) for layout; the visible layer
    // on top holds resolved, scrambling and not-yet-started characters.
    return s.split(/(\s+)/).map((tok, j) => {
      const base = offset;
      offset += tok.length;
      if (!tok || /^\s+$/.test(tok)) return tok;
      const chars = [];
      for (let k = 0; k < tok.length; k++) {
        const i = base + k;
        const begin = i * step;
        if (t < begin) break;
        chars.push(
          t >= begin + duration ? (
            tok[k]
          ) : (
            <span key={k} className="opacity-50">
              {glyph(i, tick)}
            </span>
          ),
        );
      }
      return (
        <span key={j} className="relative whitespace-nowrap">
          <span className="invisible">{tok}</span>
          <span className="absolute top-0 left-0">{chars}</span>
        </span>
      );
    });
  });

  const Sr = srWrap(Tag);
  return (
    <Tag ref={ref} {...rest}>
      <Sr className="sr-only">{children}</Sr>
      <Sr aria-hidden="true">{scrambled}</Sr>
    </Tag>
  );
}
