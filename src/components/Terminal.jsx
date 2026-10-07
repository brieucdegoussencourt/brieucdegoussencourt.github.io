import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/*
  Terminal window that "renders" the portrait in pixels: a command is typed,
  blocks dissolve in under a scan line, then the resolution steps up until
  the photo is crisp. Afterwards, hovering the portrait shows a pixel lens
  snapped to the grid.
*/
const CMD = "./render brieuc.webp --pixel";
const SRC = "/picture/brieuc.webp";
const SIZE = 640; // canvas resolution (matches the source image)

const DISSOLVE_BLOCK = 32;
const DISSOLVE_MS = 1100;
const STEPS = [32, 20, 14, 10, 7, 5, 3, 2, 1];
const STEP_MS = 120;
const LENS_BLOCK = 16;
const LENS_CELLS = 7; // lens is LENS_CELLS × LENS_CELLS blocks
const TOTAL_MS = DISSOLVE_MS + STEPS.length * STEP_MS;
const TYPE_MS = 38;

const PINK = "#ec4899";
// Dissolve background follows the theme (--color-subtle).
const bg = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--color-subtle").trim() || "#f1f5f9";

// Downsample once per block size so each frame is a single scaled draw.
function pixelated(img, block) {
  const n = Math.ceil(SIZE / block);
  const c = document.createElement("canvas");
  c.width = c.height = n;
  const cx = c.getContext("2d");
  cx.drawImage(img, 0, 0, n, n);
  return c;
}

function drawPixelated(ctx, src) {
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(src, 0, 0, src.width, src.height, 0, 0, SIZE, SIZE);
}

function shuffle(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Terminal({ className = "" }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const lensSrc = useRef(null);
  const [typed, setTyped] = useState(reduce ? CMD.length : 0);
  const [progress, setProgress] = useState(reduce ? 100 : 0);
  const done = progress >= 100;
  // Displayed size of the portrait, in CSS pixels, kept live while resizing.
  const [shown, setShown] = useState(SIZE);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ro = new ResizeObserver(([entry]) => setShown(Math.round(entry.contentRect.width)));
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // 1. Type the command.
  useEffect(() => {
    if (reduce) return setTyped(CMD.length);
    if (typed >= CMD.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 700 : TYPE_MS);
    return () => clearTimeout(t);
  }, [typed, reduce]);

  // 2. Load the image, then run the render once the command is typed.
  useEffect(() => {
    if (typed < CMD.length) return;
    const ctx = canvasRef.current.getContext("2d");
    let raf = 0;
    let cancelled = false;

    const img = new Image();
    img.decoding = "async";
    img.src = SRC;
    img.onload = () => {
      if (cancelled) return;
      imgRef.current = img;
      lensSrc.current = pixelated(img, LENS_BLOCK);

      if (reduce) {
        ctx.drawImage(img, 0, 0, SIZE, SIZE);
        setProgress(100);
        return;
      }

      const levels = STEPS.map((b) => (b === 1 ? null : pixelated(img, b)));
      // Block colours for the dissolve phase.
      const grid = levels[0];
      const cols = grid.width;
      const data = grid.getContext("2d").getImageData(0, 0, cols, cols).data;
      const order = shuffle(cols * cols);
      let lastPct = -1;
      const start = performance.now();

      const frame = (now) => {
        const t = now - start;
        if (t < DISSOLVE_MS) {
          // Blocks pop in at random under a sweeping scan line.
          const p = t / DISSOLVE_MS;
          const target = Math.floor(p * order.length);
          ctx.fillStyle = bg();
          ctx.fillRect(0, 0, SIZE, SIZE);
          for (let n = 0; n < target; n++) {
            const k = order[n];
            const x = k % cols;
            const y = Math.floor(k / cols);
            const i = k * 4;
            ctx.fillStyle = `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`;
            ctx.fillRect(x * DISSOLVE_BLOCK, y * DISSOLVE_BLOCK, DISSOLVE_BLOCK, DISSOLVE_BLOCK);
          }
          // Scan line sweeping down.
          const y = Math.floor(p * SIZE);
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = PINK;
          ctx.fillRect(0, y, SIZE, 3);
          ctx.restore();
        } else {
          const step = Math.min(
            STEPS.length - 1,
            Math.floor((t - DISSOLVE_MS) / STEP_MS),
          );
          if (levels[step]) drawPixelated(ctx, levels[step]);
          else ctx.drawImage(img, 0, 0, SIZE, SIZE);
        }

        const pct = Math.min(100, Math.floor((t / TOTAL_MS) * 100));
        if (pct !== lastPct) setProgress((lastPct = pct));
        if (t < TOTAL_MS) raf = requestAnimationFrame(frame);
        else ctx.drawImage(img, 0, 0, SIZE, SIZE);
      };
      raf = requestAnimationFrame(frame);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [typed >= CMD.length, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  // 3. Pixel lens on hover, snapped to the block grid.
  const drawLens = (e) => {
    const img = imgRef.current;
    if (!done || !img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const scale = SIZE / rect.width;
    const half = (LENS_CELLS * LENS_BLOCK) / 2;
    const snap = (v) => Math.round((v * scale - half) / LENS_BLOCK) * LENS_BLOCK;
    const x = snap(e.clientX - rect.left);
    const y = snap(e.clientY - rect.top);
    const w = LENS_CELLS * LENS_BLOCK;

    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, w);
    ctx.clip();
    drawPixelated(ctx, lensSrc.current);
    ctx.restore();
    ctx.strokeStyle = PINK;
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 1.5, y + 1.5, w - 3, w - 3);
  };
  const clearLens = () => {
    if (done && imgRef.current) {
      canvasRef.current.getContext("2d").drawImage(imgRef.current, 0, 0, SIZE, SIZE);
    }
  };

  const filled = Math.round(progress / 10);

  return (
    <div
      className={`mx-auto max-w-[calc(360px+2rem+4px)] overflow-hidden rounded-xl sm:max-w-[calc(360px+2.5rem+4px)] border border-line-strong bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-24px_rgba(15,23,42,0.25)] ${className}`}
    >
      {/* Title bar */}
      <div aria-hidden="true" className="flex items-center gap-2 border-b border-line bg-subtle px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
        <span className="ml-3 font-mono text-[11px] text-muted">brieuc — zsh — 80×24</span>
      </div>

      <div className="space-y-3 p-4 font-mono text-[12.5px] leading-6 text-ink-soft sm:p-5 sm:text-[13px]">
        <p aria-hidden="true" className="truncate">
          <span className="text-pink-deep">❯</span>{" "}
          <span className="text-ink">{CMD.slice(0, typed)}</span>
          {typed < CMD.length && <Caret />}
        </p>

        {/* Displayed at most 360×360 (the 640px source stays crisp on retina). */}
        <div className="relative mx-auto max-w-[362px] overflow-hidden rounded-md border border-line bg-subtle">
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            role="img"
            aria-label="Portrait de Brieuc"
            onPointerMove={drawLens}
            onPointerLeave={clearLens}
            className={`block aspect-square w-full [image-rendering:pixelated] ${done ? "cursor-crosshair" : ""}`}
          />
          {/* Faint CRT scanlines */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_2px,rgba(0,0,0,0.05)_3px)]"
          />
        </div>

        <p aria-hidden="true" className="flex items-center justify-between gap-3">
          {done ? (
            <span>
              <span className="text-pink-deep">✓</span> rendu terminé{" "}
              <span className="tabular-nums text-muted">· {shown}×{shown}</span>
            </span>
          ) : (
            <span>
              <span className="text-ink">[{"█".repeat(filled)}</span>
              <span className="text-line-strong">{"░".repeat(10 - filled)}</span>
              <span className="text-ink">]</span>{" "}
              <span className="tabular-nums">{String(progress).padStart(3, " ")}%</span>
            </span>
          )}
          <span className="hidden text-muted sm:inline">
            {done ? "survolez-moi" : "rendering…"}
          </span>
        </p>

        <p aria-hidden="true" className={done ? "" : "invisible"}>
          <span className="text-pink-deep">❯</span> <Caret />
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
