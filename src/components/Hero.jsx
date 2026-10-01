import { useReveal } from "../lib/useReveal.js";
import { ArrowIcon } from "./icons.jsx";
import { calButtonProps } from "../lib/booking.js";

export default function Hero() {
  const r1 = useReveal();
  const r2 = useReveal({ rootMargin: "0px" });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-stone/60 via-sand/40 to-canvas px-6 pt-36 pb-28 lg:px-8 lg:pt-44 lg:pb-36"
    >
      {/* Quiet warm wash for a touch of depth */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-clay-soft/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div
          ref={r1}
          className="reveal rounded-[2rem] border border-stone bg-canvas px-7 py-14 text-center shadow-[0_38px_90px_-44px_rgba(58,54,49,0.6)] sm:px-14 sm:py-20"
        >
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-stone bg-canvas/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-charcoal-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Web Developer
          </p>

          <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            I remove digital friction
            <br className="hidden sm:block" />
            <span className="italic text-clay-deep"> so your business can</span>
            <span className=" font-semibold text-clay-deep"> grow.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-charcoal-soft">
            I pair{" "}
            <span className="font-semibold text-charcoal">business strategy</span>{" "}
            and{" "}
            <span className="font-semibold text-charcoal">user experience</span>{" "}
            with{" "}
            <span className="font-semibold text-charcoal">
              IT solutions
            </span>{" "}
            — building websites, apps, and the quiet machinery behind them so
            that every interaction feels effortless.
          </p>

          <div
            ref={r2}
            className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ transitionDelay: "120ms" }}
          >
            <button
              type="button"
              {...calButtonProps}
              className="group inline-flex items-center gap-2.5 rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold text-canvas ring-2 ring-transparent ring-offset-2 ring-offset-transparent transition-all duration-300 hover:bg-charcoal-soft hover:ring-dawn hover:ring-offset-canvas active:scale-[0.97]"
            >
              Discuss Your Project
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-charcoal-soft transition-colors hover:text-dawn-deep"
            >
              See selected work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
