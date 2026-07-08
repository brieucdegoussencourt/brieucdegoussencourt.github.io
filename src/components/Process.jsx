import { useReveal } from "../lib/useReveal.js";
import { CompassIcon, LayersIcon, FlowIcon } from "./icons.jsx";

const steps = [
  {
    icon: CompassIcon,
    title: "Business first, always",
    body: "Before a single line of code, I map where your business loses time, customers, or clarity. Technology is the means — your growth is the goal.",
  },
  {
    icon: LayersIcon,
    title: "Design that feels effortless",
    body: "Clean, intuitive interfaces grounded in real UX principles. The right thing to do should always be the easy thing to do — for your customers and your team.",
  },
  {
    icon: FlowIcon,
    title: "Solid foundations underneath",
    body: "Custom APIs, real-time data, reliable integrations — the dependable machinery that keeps everything running quietly in the background, so you never have to think about it.",
  },
];

export default function Process() {
  const heading = useReveal();

  return (
    <section
      id="approach"
      className="px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={heading} className="reveal mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            How I Work
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-charcoal sm:text-4xl">
            A bridge between design and technology.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-soft">
            You don't need to speak fluent tech. You need a partner who
            translates business goals into digital experiences that simply
            work.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-stone bg-stone/70 sm:grid-cols-3">
          {steps.map((step, i) => (
            <ProcessCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, index }) {
  const ref = useReveal();
  const Icon = step.icon;
  return (
    <article
      ref={ref}
      className="reveal flex flex-col bg-canvas p-8 lg:p-10"
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-clay-deep">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-6 text-lg font-semibold text-charcoal">{step.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-charcoal-soft">
        {step.body}
      </p>
    </article>
  );
}
