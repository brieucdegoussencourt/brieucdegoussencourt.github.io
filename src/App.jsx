import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Process from "./components/Process.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Footer from "./components/Footer.jsx";
import { useCalInit } from "./lib/booking.js";

export default function App() {
  // Initialise the Cal.com booking embed once for the whole app.
  useCalInit();

  return (
    <>
      {/* Skip link for keyboard & screen-reader users */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>

      <Nav />
      <main>
        <Hero />
        <Process />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
