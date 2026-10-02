import { useReveal } from "../lib/useReveal.js";
import { Section, SectionHeader } from "./ui.jsx";
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
  return (
    <Section id="approach" labelledBy="approach-title">
      <SectionHeader
        id="approach-title"
        eyebrow="Ma méthode"
        title="Une méthode claire, en trois étapes."
      >
        <p>
          Tout commence par un échange pour cerner vos enjeux et poser les
          bases. L'objectif : concevoir un outil robuste qui simplifie
          réellement votre quotidien.
        </p>
      </SectionHeader>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-stone bg-stone md:grid-cols-3 lg:mt-16">
        {steps.map((step, i) => (
          <ProcessCard key={step.title} step={step} index={i} />
        ))}
      </ol>
    </Section>
  );
}

function ProcessCard({ step, index }) {
  const ref = useReveal();
  const Icon = step.icon;
  return (
    <li
      ref={ref}
      className="reveal flex flex-col bg-canvas p-8 lg:p-10"
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div className="flex items-center justify-between">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-clay-deep"
        >
          <Icon className="h-6 w-6" />
        </span>
        <span aria-hidden="true" className="font-serif text-2xl text-stone-deep">
          {step.index}
        </span>
      </div>
      <h3 className="mt-8 text-lg font-semibold text-charcoal">{step.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
        {step.body}
      </p>
    </li>
  );
}
