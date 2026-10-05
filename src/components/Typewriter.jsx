import { useEffect, useMemo, useState } from "react";

/*
  Typewriter for rich text. Content is described as blocks of segments:
    { text, className?, strong? }  — a run of characters
    { br: "sm:hidden" }            — a line break (takes no typing time)
  Every character is rendered from the start (untyped ones are invisible),
  so lines never reflow while typing. The full text is also given to
  screen readers once, without the animation.
*/

const PUNCT = /[.,:;!?]/;

// Cumulative timestamps (ms) at which each character appears, with a little
// human jitter and a pause after punctuation.
function schedule(blocks, gap) {
  const times = [];
  let t = 0;
  blocks.forEach((block, b) => {
    if (b > 0) t += gap;
    block.segments.forEach((seg) => {
      for (const ch of seg.text ?? "") {
        t += block.speed * (0.55 + Math.random() * 0.9);
        if (PUNCT.test(ch)) t += Math.min(block.speed * 5, 140);
        times.push(t);
      }
    });
  });
  return times;
}

export function useTypewriter(blocks, { start = true, instant = false, gap = 260 } = {}) {
  const times = useMemo(() => schedule(blocks, gap), []); // eslint-disable-line react-hooks/exhaustive-deps
  const total = times.length;
  const [count, setCount] = useState(instant ? total : 0);

  useEffect(() => {
    if (instant) return setCount(total);
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const elapsed = now - t0;
      let n = 0;
      while (n < total && times[n] <= elapsed) n++;
      setCount(n);
      if (n < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, instant, times, total]);

  // Character offset where each block starts, for <Typed offset>.
  const offsets = useMemo(() => {
    let o = 0;
    return blocks.map((block) => {
      const start = o;
      block.segments.forEach((s) => (o += s.text?.length ?? 0));
      return start;
    });
  }, [blocks]);

  return { count, total, offsets, done: count >= total };
}

/* Renders one block; `count` is the global typed count, `offset` where this block starts. */
export function Typed({ segments, count, offset, cursor = false, strongClass = "" }) {
  let pos = offset;
  const full = segments.map((s) => s.text ?? " ").join("");
  const length = segments.reduce((n, s) => n + (s.text?.length ?? 0), 0);
  const active = cursor && count >= offset && count < offset + length;
  let cursorPlaced = false;

  return (
    <>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {segments.map((seg, i) => {
          if (seg.br) return <br key={i} className={seg.br} />;
          const shown = Math.max(0, Math.min(seg.text.length, count - pos));
          const atCursor = active && !cursorPlaced && shown < seg.text.length;
          if (atCursor) cursorPlaced = true;
          pos += seg.text.length;
          const Tag = seg.strong ? "strong" : "span";
          return (
            <Tag
              key={i}
              className={`${seg.strong ? strongClass : ""} ${seg.className ?? ""}`}
            >
              {seg.text.slice(0, shown)}
              {atCursor && <Cursor />}
              <span className="invisible">{seg.text.slice(shown)}</span>
            </Tag>
          );
        })}
      </span>
    </>
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
