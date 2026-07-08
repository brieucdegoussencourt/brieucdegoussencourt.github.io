import { useEffect, useState } from "react";
import { calButtonProps } from "../lib/booking.js";

const links = [
  { href: "#approach", label: "How I Work" },
  { href: "#work", label: "Selected Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-stone/60 bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8"
      >
        <a
          href="#top"
          className="font-serif text-lg tracking-tight text-charcoal"
        >
          Brieuc<span className="text-clay">.</span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-charcoal-soft transition-colors hover:text-dawn-deep"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          {...calButtonProps}
          className="rounded-full border border-dawn/60 px-5 py-2 text-sm font-medium text-charcoal transition-all duration-300 hover:border-dawn hover:bg-dawn/15 active:scale-[0.97] active:bg-dawn/25"
        >
          Let's talk
        </button>
      </nav>
    </header>
  );
}
