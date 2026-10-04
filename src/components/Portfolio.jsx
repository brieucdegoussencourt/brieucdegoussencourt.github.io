import { useReveal } from "../lib/useReveal.js";
import { GithubIcon } from "./icons.jsx";
import { Section, SectionHeader, Strong, NewTabHint, HoverArrow, linkClass } from "./ui.jsx";

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
      "Le Cottage des Perdrix : un chalet en bois au milieu des arbres, avec un bouton de réservation",
  },
  {
    index: "02",
    tag: "Suivi de patrimoine",
    title: "Patrimony",
    description:
      "Une application pour suivre tout son patrimoine au même endroit : actions et fonds cotés en temps réel, biens non cotés personnalisables, des calculs de performance fiables et des graphiques lisibles afin d'avoir une vue claire et consolidée du rendement global de son portefeuille.",
    href: "https://patrimony-neon.vercel.app/",
    repo: "https://github.com/brieucdegoussencourt/patrimony",
    image: "/projects/patrimony.jpg",
    imageAlt: "Tableau de bord de Patrimony : valeur totale, rendements et graphique du portefeuille comparé au MSCI World",
  },
  {
    index: "03",
    tag: "Carnet de voyage",
    title: "Trek Kleinwalsertal",
    description:
      "Une appli pour préparer un trek de plusieurs jours dans les Alpes : la carte du parcours avec géolocalisation en temps réel, la météo live à chaque étape et une checklist du matériel, tout au même endroit.",
    href: "https://trek-kleinwalsertal.vercel.app/",
    repo: "https://github.com/brieucdegoussencourt/trek-kleinwalsertal",
    image: "/projects/trek.jpg",
    imageAlt:
      "Trek Kleinwalsertal : photo de montagne avec les chiffres du parcours, 43,1 km, environ 18 h de marche, +2690 m, 4 jours",
  },
];

export default function Portfolio() {
  return (
    <Section
      id="work"
      labelledBy="work-title"
      className="bg-gradient-to-b from-canvas via-sand/60 to-canvas"
    >
      <SectionHeader
        id="work-title"
        eyebrow="Réalisations"
        title="Quelques projets récents."
      >
        <p>
          Une sélection de <Strong>plateformes</Strong>,{" "}
          <Strong>applications</Strong> et <Strong>outils sur mesure</Strong>,
          développés pour mes clients ou menés en propre.
        </p>
      </SectionHeader>

      <ul className="mt-12 space-y-8 lg:mt-16">
        {projects.map((p) => (
          <CaseStudy key={p.index} project={p} />
        ))}
      </ul>
    </Section>
  );
}

function CaseStudy({ project }) {
  const ref = useReveal();
  const titleId = `project-${project.index}`;
  return (
    <li ref={ref} className="reveal">
      {/* Hover: the card lifts, its shadow deepens and the border warms; the
          preview zooms gently and the index picks up the clay accent. */}
      <article
        aria-labelledby={titleId}
        className="group rounded-3xl border border-stone bg-canvas p-4 transition-[translate,box-shadow,border-color] duration-500 ease-organic hover:-translate-y-1.5 hover:border-stone-deep hover:shadow-[0_32px_70px_-32px_rgba(58,54,49,0.45)] motion-reduce:hover:translate-y-0 sm:p-6 lg:p-8"
      >
        {/* Preview image — a duplicate of the "Voir le projet" link, so it is
            skipped in the tab order to avoid two stops for one destination. */}
        {project.image && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            className="relative block overflow-hidden rounded-2xl border border-stone bg-sand"
          >
            <img
              src={project.image}
              alt={project.imageAlt || `Aperçu de ${project.title}`}
              loading="lazy"
              decoding="async"
              width={2880}
              height={1240}
              className="aspect-[2.32/1] w-full object-cover transition-transform duration-1000 ease-organic group-hover:scale-[1.04]"
            />
            {/* Soft warm veil that lifts on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-clay/10 transition-opacity duration-700 ease-organic group-hover:opacity-0"
            />
          </a>
        )}

        <div className="grid gap-6 px-2 pt-8 pb-2 lg:grid-cols-12 lg:gap-12 lg:pt-10">
          {/* Left: index + tag + title + links */}
          <div className="reveal-item lg:col-span-5" style={{ "--d": "150ms" }}>
            <div className="flex flex-wrap items-center gap-4">
              <span
                aria-hidden="true"
                className="font-serif text-2xl text-stone-deep transition-colors duration-500 ease-organic group-hover:text-clay"
              >
                {project.index}
              </span>
              <span className="rounded-full border border-stone bg-sand px-3 py-1 text-xs font-medium uppercase tracking-wider text-charcoal-soft transition-colors duration-500 ease-organic group-hover:border-clay-soft group-hover:text-clay-deep">
                {project.tag}
              </span>
            </div>
            <h3
              id={titleId}
              className="mt-5 font-serif text-2xl tracking-tight text-charcoal transition-colors duration-500 ease-organic group-hover:text-clay-deep"
            >
              {project.title}
            </h3>

            {project.href ? (
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} min-h-11 text-sm font-semibold text-clay-deep hover:text-charcoal`}
                >
                  <span className="link-underline">Voir le projet</span>
                  <span className="sr-only"> {project.title}</span>
                  <NewTabHint />
                  <HoverArrow />
                </a>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} min-h-11 text-sm font-medium text-charcoal-soft hover:text-charcoal`}
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span className="link-underline">Code</span>
                    <span className="sr-only"> source de {project.title}</span>
                    <NewTabHint />
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-5 text-sm font-medium text-muted">
                Bientôt en ligne
              </p>
            )}
          </div>

          {/* Right: short description */}
          <p
            style={{ "--d": "260ms" }}
            className="reveal-item text-base leading-relaxed text-charcoal-soft lg:col-span-7 lg:border-t lg:border-stone lg:pt-6"
          >
            {project.description}
          </p>
        </div>
      </article>
    </li>
  );
}
