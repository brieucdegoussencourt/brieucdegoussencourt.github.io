import { useReveal } from "../lib/useReveal.js";
import { calButtonProps } from "../lib/booking.js";
import { Container, buttonStyles, HoverArrow } from "./ui.jsx";

/*
  "Written live" intro: the title fades in letter by letter, then the lead
  paragraph word by word, as if being written — fades, no typewriter caret.
  Each glyph gets its own delay (--d), picked up by .reveal-char in CSS.
*/
const TITLE_START = 300; // ms, after the photo and the label
const CHAR_STEP = 40;
const WORD_STEP = 35;
const LEAD =
  "J'accompagne indépendants et entreprises dans la création de leurs sites, applications et outils connectés. Du design à la mise en production : des solutions fluides, conçues sur mesure pour votre activité.";

/* Split text into nowrap words of fading letters (by="char") or fading
   words (by="word"), starting at `start` ms. Returns [nodes, nextStart]. */
function written(text, start, step, by) {
  let t = start;
  const words = text.split(" ");
  const nodes = words.map((word, i) => {
    const space = i < words.length - 1 ? " " : "";
    if (by === "word") {
      const d = t;
      t += step;
      return (
        <span key={i}>
          <span className="reveal-char" style={{ "--d": `${d}ms` }}>
            {word}
          </span>
          {space}
        </span>
      );
    }
    return (
      <span key={i}>
        <span className="inline-block whitespace-nowrap">
          {[...word].map((ch, j) => {
            const d = t;
            t += step;
            return (
              <span key={j} className="reveal-char" style={{ "--d": `${d}ms` }}>
                {ch}
              </span>
            );
          })}
        </span>
        {space}
      </span>
    );
  });
  return [nodes, t];
}

const [helloNodes, afterHello] = written("Bonjour, je\u00a0suis", TITLE_START, CHAR_STEP, "char");
const [nameNodes, afterName] = written("Brieuc.", afterHello + CHAR_STEP, CHAR_STEP, "char");
const [leadNodes, afterLead] = written(LEAD, afterName + 120, WORD_STEP, "word");
const BUTTONS_DELAY = afterLead - 200;

export default function Hero() {
  const r1 = useReveal();
  const r2 = useReveal({ rootMargin: "0px" });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-stone/60 via-sand/40 to-canvas pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
    >
      {/* Quiet warm wash for a touch of depth */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-clay-soft/20 blur-3xl" />
      </div>

      <Container className="relative">
        <div
          ref={r1}
          className="reveal rounded-3xl border border-stone bg-canvas px-5 py-16 text-center shadow-[0_38px_90px_-44px_rgba(58,54,49,0.6)] sm:px-12 sm:py-20 lg:py-24"
        >
          <div className="reveal-item">
            <div className="group mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full shadow-[0_18px_40px_-20px_rgba(58,54,49,0.55)] ring-1 ring-stone ring-offset-4 ring-offset-canvas transition-shadow duration-500 ease-organic hover:shadow-[0_24px_50px_-18px_rgba(58,54,49,0.6)] sm:h-40 sm:w-40">
              <picture>
                <source srcSet="/picture/brieuc.avif" type="image/avif" />
                <img
                  src="/picture/brieuc.webp"
                  alt="Portrait de Brieuc"
                  width="640"
                  height="640"
                  fetchpriority="high"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-organic group-hover:scale-[1.08]"
                />
              </picture>
            </div>
          </div>

          <p
            style={{ "--d": "120ms" }}
            className="reveal-item mb-8 inline-flex items-center gap-2 rounded-full border border-stone bg-sand/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-soft"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-clay" />
            Développeur
          </p>

          <h1
            id="hero-title"
            aria-label="Bonjour, je suis Brieuc."
            className="font-serif text-4xl leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
          >
            <span aria-hidden="true">
              {helloNodes} <br className="sm:hidden" />
              <span className="italic text-clay-deep">{nameNodes}</span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-charcoal-soft sm:text-xl">
            <span className="sr-only">{LEAD}</span>
            <span aria-hidden="true">{leadNodes}</span>
          </p>

          <div
            ref={r2}
            className="reveal mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={{ transitionDelay: `${BUTTONS_DELAY}ms` }}
          >
            <button type="button" {...calButtonProps} className={buttonStyles.primary}>
              Parlons de votre projet
              <HoverArrow />
            </button>
            <a href="#work" className={buttonStyles.secondary}>
              Voir mes réalisations
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
