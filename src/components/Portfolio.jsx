import { useReveal } from "../lib/useReveal.js";
import { ArrowIcon, GithubIcon } from "./icons.jsx";

/*
  Curated micro-case studies, each structured Friction → Solution → Outcome.
  Real projects carry `href` (live) and `repo` (source); slots still being
  written leave both off and render a "coming soon" note instead of dead links.
*/
const projects = [
  {
    index: "01",
    tag: "Direct Booking",
    title: "Le Cottage des Perdrix",
    friction:
      "A holiday cottage in a private forest estate depended on rental platforms — commission on every stay, a generic listing that couldn't convey the place, and guests left asking how to find the house behind a gated domain.",
    solution:
      "A warm, trilingual (FR / NL / EN) direct-booking site: a live availability calendar with nightly pricing and stay presets, an honest guide to the estate, and step-by-step access — map, illustrated domain plan, directions and FAQ, and most importantly a fast and secure way to make payments.",
    outcome:
      "Guests book directly, commission-free, and arrive knowing exactly where to go — the site does the host's explaining before anyone has to pick up the phone.",
    href: "https://cottagedesperdrix.be/",
    image: "/projects/cottage.jpg",
    imageAlt:
      "Le Cottage des Perdrix — a wooden cottage among the trees, with a direct-booking call to action",
  },
  {
    index: "02",
    tag: "Wealth Platform",
    title: "Patrimony",
    friction:
      "Tracking real wealth means scattered spreadsheets and loud, anxious finance apps — neon tickers, urgent red and green — that bury the one thing that matters: a calm, clear view of where you actually stand.",
    solution:
      "A warm, editorial platform that unifies listed stocks, private equity and real-world assets in one place — live market data, honest performance math (MWR / TWR / XIRR) and role-based multi-portfolio sharing, wrapped in a light “morning-light” interface. Built with Next.js, Supabase and Prisma.",
    outcome:
      "One trustworthy dashboard that answers “where do I stand?” at a glance — allocation, performance and dividends across every asset class, with the only alerting colour reserved for what truly matters.",
    href: "https://patrimony-neon.vercel.app/",
    repo: "https://github.com/brieucdegoussencourt/patrimony",
    image: "/projects/patrimony.png",
    imageAlt: "Patrimony landing page — a calm, editorial wealth-tracking dashboard",
  },
  {
    index: "03",
    tag: "Trip Companion",
    title: "Trek Kleinwalsertal",
    friction:
      "Planning a multi-day alpine trek meant juggling scattered sources — trail maps in one place, weather forecasts in another, hut bookings, safety notes and packing lists everywhere else — with nothing tying it together before heading into the mountains.",
    solution:
      "A single companion app that gathers everything the trip needs in one calm place: an interactive topographic map of the full route, day-by-day stages, live weather, safety guidance and a packing checklist.",
    outcome:
      "The whole trek at a glance — trails, weather and safety in one view, so the group could stop tab-juggling and start walking with confidence.",
    href: "https://trek-kleinwalsertal.vercel.app/",
    repo: "https://github.com/brieucdegoussencourt/trek-kleinwalsertal",
    image: "/projects/trek.jpg",
    imageAlt:
      "Trek Kleinwalsertal — landing page with the trip menu and route stats: 43.1 km, ~18h walking, +2690 m, 4 days",
  },
];

export default function Portfolio() {
  const heading = useReveal();

  return (
    <section
      id="work"
      className="bg-gradient-to-b from-canvas via-sand/60 to-canvas px-6 py-24 lg:px-8 lg:py-32"
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
      className="reveal group flex flex-col gap-8 rounded-3xl border border-stone bg-canvas p-8 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(58,54,49,0.35)] lg:gap-10 lg:p-10"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Optional preview image */}
      {project.image && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-2xl border border-stone bg-sand"
          aria-label={`Open ${project.title}`}
        >
          <img
            src={project.image}
            alt={project.imageAlt || `${project.title} preview`}
            loading="lazy"
            width={2880}
            height={1240}
            className="aspect-[2.32/1] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
        </a>
      )}

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
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

        {project.href ? (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-clay-deep transition-colors hover:text-dawn-deep"
            >
              View Project
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-soft transition-colors hover:text-dawn-deep"
              >
                <GithubIcon className="h-4 w-4" />
                Code
              </a>
            )}
          </div>
        ) : (
          <p className="mt-6 text-sm font-medium text-muted">
            Case study coming soon
          </p>
        )}
      </div>

      {/* Right rail: Friction → Solution → Outcome */}
      <div className="grid gap-6 lg:col-span-8 sm:grid-cols-3">
        <Facet label="The Friction" body={project.friction} accent="sage" />
        <Facet label="The Solution" body={project.solution} accent="clay" />
        <Facet label="The Outcome" body={project.outcome} accent="charcoal" />
      </div>
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
