import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { calButtonProps } from "../lib/booking.js";
import { fadeUp, stagger, spring } from "../lib/motion.js";
import { Container, Kbd, buttonStyles, HoverArrow } from "./ui.jsx";
import { useTypewriter, Typed } from "./Typewriter.jsx";
import Terminal from "./Terminal.jsx";

// Hero copy, typed in sequence: eyebrow → heading → lead (ms per character).
const blocks = [
  {
    speed: 30,
    segments: [
      { text: "// ", className: "text-pink-deep" },
      { text: "développeur & UX designer" },
    ],
  },
  {
    speed: 55,
    segments: [
      { text: "Bonjour, " },
      { br: "sm:hidden" },
      { text: "je suis Brieuc" },
      { text: ".", className: "text-red" },
    ],
  },
  {
    speed: 8,
    segments: [
      { text: "J'accompagne " },
      { text: "indépendants", strong: true },
      { text: " et " },
      { text: "entreprises", strong: true },
      { text: " dans la création de leurs " },
      { text: "sites", strong: true },
      { text: ", " },
      { text: "applications", strong: true },
      { text: " et " },
      { text: "outils connectés", strong: true },
      { text: ". Du design d'interface à la mise en production : des " },
      { text: "solutions fluides", strong: true },
      { text: ", taillées " },
      { text: "sur mesure", strong: true },
      { text: " pour optimiser votre activité." },
    ],
  },
];

export default function Hero() {
  const reduce = useReducedMotion();
  // Start typing once the copy is well into the viewport: right away on
  // desktop, after a short scroll on mobile (where the terminal comes first).
  const copyRef = useRef(null);
  const inView = useInView(copyRef, { once: true, margin: "0px 0px -25% 0px" });
  const { count, offsets, done } = useTypewriter(blocks, {
    start: inView,
    instant: reduce,
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-36 sm:pb-24 lg:pt-40"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div ref={copyRef} className="lg:col-span-7">
          <p className="font-mono text-sm text-muted">
            <Typed segments={blocks[0].segments} count={count} offset={offsets[0]} cursor />
          </p>

          <h1
            id="hero-title"
            className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl"
          >
            <Typed segments={blocks[1].segments} count={count} offset={offsets[1]} cursor />
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
            <Typed
              segments={blocks[2].segments}
              count={count}
              offset={offsets[2]}
              cursor
              strongClass="font-semibold text-ink"
            />
          </p>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate={done ? "show" : "hidden"}
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
