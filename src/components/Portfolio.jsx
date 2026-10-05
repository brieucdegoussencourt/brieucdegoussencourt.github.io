import { motion } from "motion/react";
import { GithubIcon } from "./icons.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";
import { Block, Chip, Strong, NewTabHint, HoverArrow, linkClass } from "./ui.jsx";

/*
  A few real projects, each with a short description. Projects without `href`
  render a "bientôt en ligne" note instead of dead links.
*/
const projects = [
  {
    index: "01",
    tag: "réservation-directe",
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
    tag: "suivi-patrimoine",
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
    tag: "carnet-de-voyage",
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

const host = (url) => url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function Portfolio() {
  return (
    <Block
      id="work"
      index="03"
      cmd="ls projets/"
      title="Quelques projets récents."
      lead={
        <p>
          Une sélection de <Strong>plateformes</Strong>,{" "}
          <Strong>applications</Strong> et <Strong>outils sur mesure</Strong>,
          développés pour mes clients ou menés en propre.
        </p>
      }
    >
      <ul className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
        {projects.map((p) => (
          <CaseStudy key={p.index} project={p} />
        ))}
      </ul>
    </Block>
  );
}

function CaseStudy({ project }) {
  const titleId = `project-${project.index}`;
  return (
    <motion.li variants={stagger(0.1)} {...inView}>
      <motion.article
        aria-labelledby={titleId}
        variants={fadeUp}
        whileHover="hover"
        className="group overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_30px_70px_-34px_rgba(24,24,27,0.35)]"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-subtle px-4 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong transition-colors duration-300 group-hover:bg-red/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong transition-colors duration-300 delay-75 group-hover:bg-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong transition-colors duration-300 delay-150 group-hover:bg-green/80" />
          </span>
          <span className="mx-auto max-w-[70%] truncate rounded-md border border-line bg-surface px-3 py-0.5 font-mono text-[11px] text-muted">
            {host(project.href) ?? "bientôt-en-ligne"}
          </span>
          <span aria-hidden="true" className="w-[42px]" />
        </div>

        {/* Preview — a duplicate of the "Voir le projet" link, so it is
            skipped in the tab order to avoid two stops for one destination. */}
        {project.image && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            className="block overflow-hidden bg-subtle"
          >
            <motion.img
              src={project.image}
              alt={project.imageAlt || `Aperçu de ${project.title}`}
              loading="lazy"
              decoding="async"
              width={2880}
              height={1240}
              variants={{ hover: { scale: 1.03 } }}
              transition={{ type: "spring", bounce: 0, duration: 0.9 }}
              className="aspect-[2.32/1] w-full object-cover"
            />
          </a>
        )}

        <div className="grid gap-5 border-t border-line p-5 sm:p-7 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span aria-hidden="true" className="font-mono text-xs text-faint">
                {project.index}/
              </span>
              <Chip>#{project.tag}</Chip>
            </div>
            <h3
              id={titleId}
              className="mt-3 text-2xl font-semibold tracking-tight text-ink"
            >
              {project.title}
            </h3>

            {project.href ? (
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[13px]">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} min-h-11 text-blue hover:text-ink`}
                >
                  <span className="link-underline">voir le projet</span>
                  <span className="sr-only"> {project.title}</span>
                  <NewTabHint />
                  <HoverArrow />
                </a>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} min-h-11 text-ink-soft hover:text-ink`}
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span className="link-underline">code source</span>
                    <span className="sr-only"> de {project.title}</span>
                    <NewTabHint />
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-4 font-mono text-[13px] text-muted">Bientôt en ligne</p>
            )}
          </div>

          <p className="text-base leading-relaxed text-ink-soft lg:col-span-7">
            {project.description}
          </p>
        </div>
      </motion.article>
    </motion.li>
  );
}
