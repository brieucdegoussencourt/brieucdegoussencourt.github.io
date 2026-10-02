import { useReveal } from "../lib/useReveal.js";

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="px-6 pb-24 lg:px-8 lg:pb-32">
      <div
        ref={ref}
        className="reveal mx-auto grid max-w-5xl gap-8 rounded-3xl border border-stone bg-sand/50 p-8 sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-14"
      >
        <div className="lg:col-span-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            Qui suis-je ?
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-charcoal">
            De la réalisation au code.
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-charcoal-soft lg:col-span-8">
          <p>
            Avant de concevoir des outils numériques, j'ai réalisé des projets
            audiovisuels. Ce parcours a façonné ma façon de travailler : le
            sens du rythme, l'exigence du cadrage et la priorité absolue donnée
            à l'humain — hier spectateur, aujourd'hui utilisateur.
          </p>
          <p>
            Alliant rigueur analytique et sensibilité visuelle, j'aime
            transformer des logiques complexes en parcours simples, élégants
            et immédiatement utiles.
          </p>
        </div>
      </div>
    </section>
  );
}
