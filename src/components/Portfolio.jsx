import { useReveal } from "../lib/useReveal.js";
import { ArrowIcon } from "./icons.jsx";

/*
  Three curated micro-case studies. Copy is placeholder scaffolding —
  the structure (Friction → Solution → Outcome) is the deliverable;
  fill the real details later via the `projects` array below.
*/
const projects = [
  {
    index: "01",
    tag: "Web Platform",
    title: "Project Title",
    friction:
      "Customers abandoned the booking flow halfway through — too many steps, unclear pricing, no mobile support.",
    solution:
      "A rethought UX with a three-step flow, transparent pricing, and a lightweight custom API feeding real-time availability.",
    outcome:
      "A smooth, mobile-first experience that turned hesitation into completed bookings.",
    href: "#",
  },
  {
    index: "02",
    tag: "Custom App",
    title: "Project Title",
    friction:
      "The team juggled three disconnected tools and a spreadsheet, losing hours to manual double-entry every week.",
    solution:
      "A single tailored app that unifies their workflow, with integrations syncing data automatically across systems.",
    outcome:
      "Hours reclaimed each week and a single source of truth the whole team actually trusts.",
    href: "#",
  },
  {
    index: "03",
    tag: "Data & API",
    title: "Project Title",
    friction:
      "Decisions were made on stale exports; nobody could see what was happening in their business right now.",
    solution:
      "A clean dashboard backed by a real-time data pipeline, surfacing the few numbers that actually drive decisions.",
    outcome:
      "Clarity at a glance — the business now steers by live signal instead of last month's guesswork.",
    href: "#",
  },
];

export default function Portfolio() {
  const heading = useReveal();

  return (
    <section
      id="work"
      className="bg-sand/50 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={heading} className="reveal mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            Selected Work
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-charcoal sm:text-4xl">
            Friction out. Smooth experiences in.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-soft">
            A few projects where thoughtful design and dependable engineering
            removed a real business headache. Each one started with friction —
            and ended with growth.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {projects.map((p, i) => (
            <CaseStudy key={p.index} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ project, index }) {
  const ref = useReveal();
  return (
    <article
      ref={ref}
      className="reveal group grid gap-8 rounded-3xl border border-stone bg-canvas p-8 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(58,54,49,0.35)] lg:grid-cols-12 lg:gap-10 lg:p-10"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Left rail: index + tag + title */}
      <div className="lg:col-span-4">
        <div className="flex items-center gap-4">
          <span className="font-serif text-3xl text-stone-deep">
            {project.index}
          </span>
          <span className="rounded-full border border-stone bg-sand px-3 py-1 text-xs font-medium uppercase tracking-wider text-charcoal-soft">
            {project.tag}
          </span>
        </div>
        <h3 className="mt-5 font-serif text-2xl tracking-tight text-charcoal">
          {project.title}
        </h3>
        <a
          href={project.href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-clay-deep transition-colors hover:text-charcoal"
        >
          View Project
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Right rail: Friction → Solution → Outcome */}
      <div className="grid gap-6 lg:col-span-8 sm:grid-cols-3">
        <Facet label="The Friction" body={project.friction} accent="sage" />
        <Facet label="The Solution" body={project.solution} accent="clay" />
        <Facet label="The Outcome" body={project.outcome} accent="charcoal" />
      </div>
    </article>
  );
}

function Facet({ label, body, accent }) {
  const dot =
    accent === "clay"
      ? "bg-clay"
      : accent === "sage"
        ? "bg-sage"
        : "bg-charcoal";
  return (
    <div className="border-t border-stone pt-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-soft">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {label}
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-charcoal-soft">
        {body}
      </p>
    </div>
  );
}
