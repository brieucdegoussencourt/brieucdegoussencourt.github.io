import { useReveal } from "../lib/useReveal.js";
import { CompassIcon, LayersIcon, FlowIcon } from "./icons.jsx";

const steps = [
  {
    icon: CompassIcon,
    index: "01",
    title: "La maquette",
    body: "Après notre échange, je prépare une maquette visuelle et un devis complet. Nous ne lançons le projet que si la proposition vous convient parfaitement.",
  },
  {
    icon: LayersIcon,
    index: "02",
    title: "Le prototype",
    body: "Une fois la maquette validée, je construis une première version qui fonctionne. Vous la testez, et on ajuste ce qui doit l'être.",
  },
  {
    icon: FlowIcon,
    index: "03",
    title: "La version finale",
    body: "Je peaufine les détails et je mets tout en ligne. Ensuite, je peux aussi m'occuper de la maintenance et des évolutions.",
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
            Une solution adaptée, en trois étapes.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-soft">
            De la création de l'identité graphique à la mise en production,
            je conçois des solutions sur mesure pour développer vos projets.
            Tout commence par une discussion : vous m'expliquez ce dont vous
            avez besoin, on réfléchit ensemble et je m'occupe du reste.
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
