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
            À propos
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-charcoal">
            Avant le code, la réalisation.
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-charcoal-soft lg:col-span-8">
          <p>
            J'ai d'abord été réalisateur. C'est de là que vient mon attention
            pour le design, pour la façon de raconter une histoire, et pour
            les personnes qui vont utiliser ce que je crée.
          </p>
          <p>
            J'ai aussi un esprit très analytique : j'aime comprendre un
            problème et trouver comment le résoudre. Manipuler des données,
            faire des graphiques, travailler sur des projets qui ont du sens,
            c'est ce qui me motive.
          </p>
        </div>
      </div>
    </section>
  );
}
