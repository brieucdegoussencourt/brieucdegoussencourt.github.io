import { useReveal } from "../lib/useReveal.js";
import { CompassIcon, LayersIcon, FlowIcon } from "./icons.jsx";

const steps = [
  {
    icon: CompassIcon,
    index: "01",
    title: "Cadrage & Maquette",
    body: "Suite à notre discussion, je conçois une maquette visuelle accompagnée d'un devis détaillé. Aucun risque : nous ne lançons le développement que si la proposition vous convient parfaitement.",
  },
  {
    icon: LayersIcon,
    index: "02",
    title: "Prototype & Ajustements",
    body: "Une fois le design validé, je développe une première version fonctionnelle. Vous la prenez en main en conditions réelles, et nous affinons chaque détail selon vos retours.",
  },
  {
    icon: FlowIcon,
    index: "03",
    title: "Mise en ligne & Suivi",
    body: "Après les derniers ajustements, je déploie votre solution clé en main. Je reste à vos côtés pour assurer la maintenance technique et faire évoluer l'outil au fil de vos besoins.",
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
            Ma méthode
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-charcoal sm:text-4xl">
            Une méthode claire, en trois étapes.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-soft">
            Tout commence par un échange pour cerner vos enjeux et poser les
            bases. L'objectif : concevoir un outil robuste qui simplifie
            réellement votre quotidien.
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
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-clay-deep">
          <Icon className="h-6 w-6" />
        </span>
        <span className="font-serif text-2xl text-stone-deep">{step.index}</span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-charcoal">{step.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-charcoal-soft">
        {step.body}
      </p>
    </article>
  );
}
