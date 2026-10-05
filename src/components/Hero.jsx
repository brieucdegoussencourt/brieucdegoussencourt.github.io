import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { calButtonProps } from "../lib/booking.js";
import { fadeUp, stagger, spring } from "../lib/motion.js";
import { Container, Kbd, Strong, buttonStyles, HoverArrow } from "./ui.jsx";
import { Typewriter, Scramble } from "./TextFx.jsx";
import Terminal from "./Terminal.jsx";

export default function Hero() {
  // Start once the copy is well into the viewport: right away on desktop,
  // after a short scroll on mobile (where the terminal comes first).
  // Then: eyebrow types → heading types → lead decodes → CTAs rise in.
  const copyRef = useRef(null);
  const inView = useInView(copyRef, { once: true, margin: "0px 0px -25% 0px" });
  const [step, setStep] = useState(0);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-36 sm:pb-24 lg:pt-40"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div ref={copyRef} className="lg:col-span-7">
          <Typewriter
            as="p"
            speed={30}
            start={inView}
            onDone={() => setStep(1)}
            className="font-mono text-sm text-muted"
          >
            <span className="text-pink-deep">//</span> développeur &amp; UX designer
          </Typewriter>

          <Typewriter
            as="h1"
            id="hero-title"
            speed={55}
            start={step >= 1}
            delay={200}
            onDone={() => setStep(2)}
            className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl"
          >
            Bonjour, <br className="sm:hidden" />
            je suis Brieuc<span className="text-pink">.</span>
          </Typewriter>

          <Scramble
            start={step >= 2}
            delay={150}
            onDone={() => setStep(3)}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft"
          >
            J'accompagne <Strong>indépendants</Strong> et <Strong>entreprises</Strong>{" "}
            dans la création de leurs <Strong>sites</Strong>,{" "}
            <Strong>applications</Strong> et <Strong>outils connectés</Strong>.
            Du design d'interface à la mise en production : des{" "}
            <Strong>solutions fluides</Strong>, taillées{" "}
            <Strong>sur mesure</Strong> pour optimiser votre activité.
          </Scramble>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate={step >= 3 ? "show" : "hidden"}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* Motion animates wrappers, so the buttons keep their own CSS transitions. */}
            <motion.div variants={fadeUp} className="flex flex-col">
              <button type="button" {...calButtonProps} className={buttonStyles.primary}>
                Parlons de votre projet
                <Kbd className="border-white/20 text-white/70">↵</Kbd>
              </button>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col">
              <a href="#work" className={buttonStyles.secondary}>
                Voir mes réalisations
                <HoverArrow />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* On mobile the terminal comes first, so the pixel render is the
            first thing you see; side by side from lg up. */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.2 }}
          className="order-first lg:order-none lg:col-span-5"
        >
          <Terminal />
        </motion.div>
      </Container>
    </section>
  );
}
