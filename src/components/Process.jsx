import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { fadeUp, inView } from "../lib/motion.js";
import { Block, Chip, Strong } from "./ui.jsx";

const steps = [
  {
    index: "01",
    label: "cadrage",
    title: "Cadrage & Maquette",
    body: (
      <>
        Suite à notre échange, je conçois une <Strong>maquette visuelle</Strong>{" "}
        accompagnée d'un <Strong>devis détaillé</Strong>.{" "}
        <Strong>Aucun risque</Strong> : le développement ne démarre que si la
        proposition vous convient parfaitement.
      </>
    ),
  },
  {
    index: "02",
    label: "prototype",
    title: "Prototype & Ajustements",
    body: (
      <>
        Une fois le design validé, je développe une{" "}
        <Strong>première version fonctionnelle</Strong>. Vous la prenez en main{" "}
        <Strong>en conditions réelles</Strong>, et nous affinons chaque détail{" "}
        <Strong>selon vos retours</Strong>.
      </>
    ),
  },
  {
    index: "03",
    label: "deploy",
    title: "Mise en ligne & Suivi",
    body: (
      <>
        Après les derniers ajustements, je déploie votre solution{" "}
        <Strong>clé en main</Strong>. Je reste à vos côtés pour la{" "}
        <Strong>maintenance technique</Strong> et pour{" "}
        <Strong>faire évoluer l'outil</Strong> au fil de vos besoins.
      </>
    ),
  },
];

export default function Process() {
  // The pipeline rail fills as the steps scroll through the viewport.
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Block
      id="approach"
      index="02"
      cmd="./methode --etapes=3"
      title="Un accompagnement clair, en trois étapes."
      lead={
        <p>
          Tout commence par un <Strong>échange</Strong> pour cerner vos enjeux
          et poser les bases. L'objectif : tirer le meilleur de la technologie
          pour concevoir un <Strong>outil robuste</Strong> qui{" "}
          <Strong>simplifie votre quotidien</Strong>.
        </p>
      }
    >
      <ol ref={listRef} className="relative mt-12 space-y-4 sm:mt-14">
        {/* Rail */}
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-[19px] w-px bg-line sm:left-[23px]"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute top-6 bottom-6 left-[19px] w-px origin-top bg-pink sm:left-[23px]"
        />

        {steps.map((step) => (
          <Step key={step.index} step={step} />
        ))}
      </ol>
    </Block>
  );
}

function Step({ step }) {
  return (
    <motion.li
      variants={{ hidden: {}, show: {} }}
      {...inView}
      className="relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[48px_1fr] sm:gap-6"
    >
      {/* Status node: draws a check once in view */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scale: 0.6, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.6 } },
        }}
        className="relative z-10 mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-surface sm:h-12 sm:w-12"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-pink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M5 12.5 10 17 19 7"
            variants={{
              hidden: { pathLength: 0 },
              show: { pathLength: 1, transition: { delay: 0.25, duration: 0.5, ease: "easeOut" } },
            }}
          />
        </svg>
      </motion.span>

      <motion.article
        variants={fadeUp}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="group grid gap-3 rounded-xl border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_16px_40px_-20px_rgba(24,24,27,0.25)] sm:p-7 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-faint">step_{step.index}</span>
            <Chip className="group-hover:border-pink/30 group-hover:bg-pink-soft group-hover:text-pink-deep transition-colors duration-300">
              {step.label}
            </Chip>
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{step.title}</h3>
        </div>
        <p className="text-base leading-relaxed text-ink-soft md:col-span-7">{step.body}</p>
      </motion.article>
    </motion.li>
  );
}
