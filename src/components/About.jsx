import { Section, SectionHeader } from "./ui.jsx";

export default function About() {
  return (
    <Section
      id="about"
      labelledBy="about-title"
      className="bg-gradient-to-b from-canvas via-sand/70 to-canvas"
    >
      <SectionHeader
        id="about-title"
        eyebrow="Qui suis-je ?"
        title="De la réalisation au code."
      >
        <p>
          Avant de concevoir des outils numériques, j'ai réalisé des projets
          audiovisuels. Ce parcours a forgé ma méthode : le sens de la
          narration, l'exigence esthétique et une priorité absolue accordée à
          l'humain — hier spectateur, aujourd'hui utilisateur.
        </p>
        <p>
          Alliant rigueur analytique et sensibilité artistique, j'aime
          transformer des logiques complexes en parcours simples, élégants
          et immédiatement utiles.
        </p>
      </SectionHeader>
    </Section>
  );
}
