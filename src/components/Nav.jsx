import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { calButtonProps } from "../lib/booking.js";
import { springSnappy } from "../lib/motion.js";
import { Container, buttonClass, iconButtonClass } from "./ui.jsx";

const links = [
  { href: "#about", label: "vision" },
  { href: "#approach", label: "méthode" },
  { href: "#work", label: "projets" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

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
  // The pill follows the hovered link, falling back to the active section.
  const highlighted = hovered ?? active;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-line bg-canvas/85 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <Container>
        <nav aria-label="Navigation principale" className="flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            aria-label="Brieuc de Goussencourt — accueil"
            className="group flex items-center gap-3 rounded-md text-[17px] font-bold tracking-[-0.03em] text-ink"
          >
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt=""
              width="32"
              height="32"
              className="h-8 w-8 transition-transform duration-300 ease-out-expo group-hover:-rotate-6"
            />
            <span aria-hidden="true">
              brieuc<span className="text-pink">.co</span>
            </span>
          </a>

          <ul
            className="hidden items-center rounded-lg border border-line bg-surface/70 p-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "true" : undefined}
                  onMouseEnter={() => setHovered(l.href)}
                  onFocus={() => setHovered(l.href)}
                  onBlur={() => setHovered(null)}
                  className="relative flex h-8 items-center px-3 font-mono text-[13px] text-muted transition-colors duration-200 hover:text-ink aria-[current]:text-ink"
                >
                  {highlighted === l.href && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={springSnappy}
                      className="absolute inset-0 rounded-md bg-subtle ring-1 ring-line"
                    />
                  )}
                  <span className="relative">
                    <span aria-hidden="true" className="text-faint">./</span>
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <button type="button" {...calButtonProps} className={buttonClass("primary", "sm")}>
                Prendre rendez-vous
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={`${iconButtonClass} -mr-2 text-ink md:hidden`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </nav>
      </Container>

      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 -bottom-px h-px origin-left bg-pink transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <Container>
              <ul className="py-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, type: "spring", bounce: 0, duration: 0.4 }}
                    className="border-b border-line last:border-0"
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === l.href ? "true" : undefined}
                      className="flex min-h-12 items-center font-mono text-sm text-ink-soft hover:text-ink aria-[current]:text-ink"
                    >
                      <span aria-hidden="true" className="mr-1 text-pink-deep">❯</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
