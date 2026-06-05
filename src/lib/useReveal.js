import { useEffect, useRef } from "react";

/**
 * Gentle fade-in-on-scroll. Returns a ref to attach to any element that
 * already carries the `reveal` utility class; toggles `is-visible` once the
 * element scrolls into view. Honors prefers-reduced-motion implicitly via CSS.
 *
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 */
export function useReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback for environments without IntersectionObserver.
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
