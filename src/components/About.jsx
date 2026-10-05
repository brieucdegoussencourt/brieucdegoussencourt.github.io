import { motion } from "motion/react";
import { fadeUp, stagger, inView } from "../lib/motion.js";
import { Block, Strong } from "./ui.jsx";
import { Typewriter, Scramble } from "./TextFx.jsx";

const notes = [
  {
    title: "L'expérience utilisateur avant tout",
    body: (
      <>
        À l'heure où l'<Strong>IA accélère la production technique</Strong>, la
        vraie valeur se joue ailleurs : dans l'
        <Strong>expérience utilisateur</Strong>. Un outil efficace n'est pas
        seulement du code qui fonctionne, c'est une{" "}
        <Strong>interface que l'on comprend d'instinct</Strong> et qui{" "}
        <Strong>simplifie réellement le travail</Strong>.
      </>
    ),
  },
  {
    title: "Un regard de réalisateur",
    body: (
      <>
        Cette conviction vient de mon premier métier de{" "}
        <Strong>réalisateur</Strong>. Raconter une histoire, soigner
        l'esthétique, captiver un spectateur : c'est la même exigence que
        concevoir un <Strong>parcours numérique</Strong> pour un utilisateur.
        J'associe cette <Strong>sensibilité visuelle</Strong> à un{" "}
        <Strong>esprit rigoureux</Strong> pour transformer des logiques
        complexes en outils <Strong>évidents, élégants et utiles</Strong>.
      </>
    ),
  },
];

export default function About() {
  return (
    <Block
      id="about"
      index="01"
      cmd="cat vision.md"
      title="De la réalisation au code : l'humain au centre."
    >
      <motion.div
        variants={stagger(0.12)}
        {...inView}
        className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2"
      >
        {notes.map((n) => (
          <motion.article key={n.title} variants={fadeUp} className="bg-surface p-6 sm:p-8">
            <h3 className="flex items-baseline gap-2 text-lg font-semibold tracking-tight text-ink">
              <span aria-hidden="true" className="font-mono text-sm font-normal text-pink-deep">
                ##
              </span>
              <Typewriter>{n.title}</Typewriter>
            </h3>
            <Scramble className="mt-3 text-base leading-relaxed text-ink-soft">{n.body}</Scramble>
          </motion.article>
        ))}
      </motion.div>
    </Block>
  );
}
