import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Process from "./components/Process.jsx";
import About from "./components/About.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Footer from "./components/Footer.jsx";
import { MotionConfig } from "motion/react";
import { useCalInit } from "./lib/booking.js";

export default function App() {
  // Initialise the Cal.com booking embed once for the whole app.
  useCalInit();

  return (
    <MotionConfig reducedMotion="user">
      {/* Skip link for keyboard & screen-reader users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-on-ink"
      >
        Aller au contenu
      </a>

      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Process />
        <Portfolio />
      </main>
      <Footer />
    </MotionConfig>
  );
}
