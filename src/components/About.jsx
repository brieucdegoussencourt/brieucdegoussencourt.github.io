import { Section, SectionHeader, Strong } from "./ui.jsx";

export default function About() {
  return (
    <Section
      id="about"
      labelledBy="about-title"
      className="bg-gradient-to-b from-canvas via-sand/70 to-canvas"
    >
      <SectionHeader
        id="about-title"
        eyebrow="Vision"
        title="De la réalisation au code : l'humain au centre."
      >
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-charcoal">
            L'expérience utilisateur avant tout
          </h3>
          <p>
            À l'heure où l'<Strong>IA accélère la production technique</Strong>,
            la vraie valeur se joue ailleurs : dans l'
            <Strong>expérience utilisateur</Strong>. Un outil efficace n'est pas
            seulement du code qui fonctionne, c'est une{" "}
            <Strong>interface que l'on comprend d'instinct</Strong> et qui{" "}
            <Strong>simplifie réellement le travail</Strong>.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-charcoal">
            Un regard de réalisateur
          </h3>
          <p>
            Cette conviction vient de mon premier métier de{" "}
            <Strong>réalisateur</Strong>. Raconter une histoire, soigner
            l'esthétique, captiver un spectateur : c'est la même exigence que
            concevoir un <Strong>parcours numérique</Strong> pour un
            utilisateur. J'associe cette <Strong>sensibilité visuelle</Strong> à
            un <Strong>esprit rigoureux</Strong> pour transformer des logiques
            complexes en outils <Strong>évidents, élégants et utiles</Strong>.
          </p>
        </div>
      </SectionHeader>
    </Section>
  );
}
