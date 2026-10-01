import { useReveal } from "../lib/useReveal.js";
import { ArrowIcon, GithubIcon } from "./icons.jsx";

/*
  A few real projects, each with a short description. Projects without `href`
  render a "bientôt en ligne" note instead of dead links.
*/
const projects = [
  {
    index: "01",
    tag: "Réservation en direct",
    title: "Le Cottage des Perdrix",
    description:
      "Un gîte dans un domaine privé en forêt, qui dépendait des plateformes de location. J'ai créé un site en trois langues avec un calendrier de disponibilités, le paiement en ligne et toutes les infos pour trouver la maison. Les clients réservent maintenant en direct, sans commission.",
    href: "https://cottagedesperdrix.be/",
    image: "/projects/cottage.jpg",
    imageAlt:
      "Le Cottage des Perdrix — a wooden cottage among the trees, with a direct-booking call to action",
  },
  {
    index: "02",
    tag: "Suivi de patrimoine",
    title: "Patrimony",
    description:
      "Une application pour suivre tout son patrimoine au même endroit : actions, private equity et biens réels. Des données de marché à jour, des calculs de performance fiables et des graphiques clairs, sans le stress des applis financières habituelles.",
    href: "https://patrimony-neon.vercel.app/",
    repo: "https://github.com/brieucdegoussencourt/patrimony",
    image: "/projects/patrimony.jpg",
    imageAlt: "Patrimony overview dashboard — total value, returns and a portfolio value chart against the MSCI World",
  },
  {
    index: "03",
    tag: "Carnet de voyage",
    title: "Trek Kleinwalsertal",
    description:
      "Une appli pour préparer un trek de plusieurs jours dans les Alpes avec des amis : la carte du parcours, les étapes jour par jour, la météo et la liste du matériel, tout au même endroit.",
    href: "https://trek-kleinwalsertal.vercel.app/",
    repo: "https://github.com/brieucdegoussencourt/trek-kleinwalsertal",
    image: "/projects/trek.jpg",
    imageAlt:
      "Trek Kleinwalsertal — alpine hero over a mountain photo with route stats: 43.1 km, ~18h walking, +2690 m, 4 days",
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
            Réalisations
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-charcoal sm:text-4xl">
            Quelques projets récents.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-soft">
            Des sites et des applications sur lesquels j'ai travaillé, pour
            des clients ou pour moi.
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
          aria-label={`Ouvrir ${project.title}`}
        >
          <img
            src={project.image}
            alt={project.imageAlt || `Aperçu de ${project.title}`}
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
              Voir le projet
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
            Bientôt en ligne
          </p>
        )}
      </div>

      {/* Right rail: short description */}
      <p className="text-[17px] leading-relaxed text-charcoal-soft lg:col-span-8 lg:border-t lg:border-stone lg:pt-5">
        {project.description}
      </p>
      </div>
    </article>
  );
}
