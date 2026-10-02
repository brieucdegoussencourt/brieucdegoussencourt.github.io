import { useReveal } from "../lib/useReveal.js";
import { GithubIcon } from "./icons.jsx";
import { Section, SectionHeader, NewTabHint, HoverArrow, linkClass } from "./ui.jsx";

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
          Une sélection de plateformes, applications et outils sur mesure
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
    <li
      ref={ref}
      className="reveal group rounded-3xl border border-stone bg-canvas p-4 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(58,54,49,0.35)] sm:p-6 lg:p-8"
    >
      <article aria-labelledby={titleId}>
        {/* Preview image — a duplicate of the "Voir le projet" link, so it is
            skipped in the tab order to avoid two stops for one destination. */}
        {project.image && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            className="block overflow-hidden rounded-2xl border border-stone bg-sand"
          >
            <img
              src={project.image}
              alt={project.imageAlt || `Aperçu de ${project.title}`}
              loading="lazy"
              decoding="async"
              width={2880}
              height={1240}
              className="aspect-[2.32/1] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          </a>
        )}

        <div className="grid gap-6 px-2 pt-8 pb-2 lg:grid-cols-12 lg:gap-12 lg:pt-10">
          {/* Left: index + tag + title + links */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-4">
              <span aria-hidden="true" className="font-serif text-2xl text-stone-deep">
                {project.index}
              </span>
              <span className="rounded-full border border-stone bg-sand px-3 py-1 text-xs font-medium uppercase tracking-wider text-charcoal-soft">
                {project.tag}
              </span>
            </div>
            <h3
              id={titleId}
              className="mt-5 font-serif text-2xl tracking-tight text-charcoal"
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
          <p className="text-base leading-relaxed text-charcoal-soft lg:col-span-7 lg:border-t lg:border-stone lg:pt-6">
            {project.description}
          </p>
        </div>
      </article>
    </li>
  );
}
