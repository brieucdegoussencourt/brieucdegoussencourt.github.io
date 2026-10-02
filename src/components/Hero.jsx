import { useReveal } from "../lib/useReveal.js";
import { calButtonProps } from "../lib/booking.js";
import { Container, buttonStyles, HoverArrow } from "./ui.jsx";

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
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone bg-sand/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-soft">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-clay" />
            Développeur
          </p>

          <h1
            id="hero-title"
            className="font-serif text-4xl leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
          >
            Bonjour, je&nbsp;suis <br className="sm:hidden" />
            <span className="italic text-clay-deep">Brieuc.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-charcoal-soft sm:text-xl">
            J'accompagne indépendants et entreprises dans la création de leurs
            sites, applications et outils connectés. Du design au
            développement : des solutions fluides, conçues sur mesure pour
            votre activité.
          </p>

          <div
            ref={r2}
            className="reveal mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={{ transitionDelay: "120ms" }}
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
