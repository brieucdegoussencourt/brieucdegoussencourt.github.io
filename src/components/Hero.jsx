import { motion } from "motion/react";
import { calButtonProps } from "../lib/booking.js";
import { fadeUp, stagger, spring } from "../lib/motion.js";
import { Container, Strong, Kbd, buttonStyles, HoverArrow } from "./ui.jsx";
import Terminal from "./Terminal.jsx";

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div
          variants={stagger(0.09, 0.1)}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.p variants={fadeUp} className="font-mono text-sm text-muted">
            <span className="text-pink-deep">//</span> développeur &amp; UX designer
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: spring },
            }}
            className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl"
          >
            Bonjour, <br className="sm:hidden" />
            je suis Brieuc
            <span className="text-pink">.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft"
          >
            J'accompagne <Strong>indépendants</Strong> et <Strong>entreprises</Strong>{" "}
            dans la création de leurs <Strong>sites</Strong>,{" "}
            <Strong>applications</Strong> et <Strong>outils connectés</Strong>.
            Du design d'interface à la mise en production : des{" "}
            <Strong>solutions fluides</Strong>, taillées{" "}
            <Strong>sur mesure</Strong> pour optimiser votre activité.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button type="button" {...calButtonProps} className={buttonStyles.primary}>
              Parlons de votre projet
              <Kbd className="border-white/20 text-white/70">↵</Kbd>
            </button>
            <a href="#work" className={buttonStyles.secondary}>
              Voir mes réalisations
              <HoverArrow />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.35 }}
          className="lg:col-span-5"
        >
          <Terminal />
        </motion.div>
      </Container>
    </section>
  );
}
