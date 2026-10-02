import { useEffect, useState } from "react";
import { calButtonProps } from "../lib/booking.js";
import { Container, buttonClass, linkClass, iconButtonClass } from "./ui.jsx";

const links = [
  { href: "#approach", label: "Ma méthode" },
  { href: "#about", label: "Qui suis-je ?" },
  { href: "#work", label: "Réalisations" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape or when switching to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        open
          ? "border-stone/60 bg-canvas shadow-[0_24px_40px_-24px_rgba(58,54,49,0.35)]"
          : solid
            ? "border-stone/60 bg-canvas/90 backdrop-blur-md"
            : "border-transparent"
      }`}
    >
      <Container>
        <nav
          aria-label="Navigation principale"
          className="flex h-18 items-center justify-between gap-6"
        >
          <a
            href="#top"
            aria-label="Brieuc de Goussencourt — accueil"
            className="block shrink-0 rounded-lg transition-all duration-300 ease-organic hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(58,54,49,0.7)] motion-reduce:hover:translate-y-0"
          >
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt=""
              width="36"
              height="36"
              className="h-9 w-9"
            />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "true" : undefined}
                  className={`${linkClass} min-h-11 text-sm font-medium text-charcoal-soft hover:text-charcoal aria-[current]:text-charcoal`}
                >
                  <span className="link-underline">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              {...calButtonProps}
              className={buttonClass("primary", "sm")}
            >
              Prendre rendez-vous
            </button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={`${iconButtonClass} -mr-2 text-charcoal md:hidden`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-stone/60 md:hidden"
      >
        <Container>
          <ul className="py-3">
            {links.map((l) => (
              <li key={l.href} className="border-b border-stone/50 last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.href ? "true" : undefined}
                  className={`${linkClass} flex min-h-12 text-base font-medium text-charcoal-soft hover:text-charcoal aria-[current]:text-charcoal`}
                >
                  <span className="link-underline">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}
