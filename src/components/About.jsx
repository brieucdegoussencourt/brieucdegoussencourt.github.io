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
            De la mise en scène au développement sur mesure.
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-charcoal-soft lg:col-span-8">
          <p>
            Avant d'être développeur, j'ai été réalisateur dans l'audiovisuel.
            J'ai appris à écrire une histoire, à mettre en images et à placer l'humain au cœur de chaque création.
            Cette expérience m'a enseigné le principe du « storytelling », du design et de l'expérience utilisateur.
          </p>
          <p>
            Rigoureux, pragmatique et orienté solution, j'aime transformer des problématiques complexes en interfaces claires, intuitives et utiles.
          </p>
        </div>
      </div>
    </section>
  );
}
