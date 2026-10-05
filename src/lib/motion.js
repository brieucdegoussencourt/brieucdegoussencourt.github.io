// Shared Motion presets — one spring, one stagger, used across the page.
export const spring = { type: "spring", bounce: 0, duration: 0.7 };
export const springSnappy = { type: "spring", stiffness: 420, damping: 32 };

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

// Props for a container that reveals its `fadeUp` children once in view.
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -12% 0px" },
};
