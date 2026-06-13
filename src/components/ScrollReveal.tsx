import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Observes all <section> elements on the page and adds an `in-view` class
 * when they scroll into the viewport. Combined with `.reveal` CSS in
 * styles.css this produces a smooth fade-in + upward motion.
 */
export function ScrollReveal() {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    sections.forEach((el) => {
      el.classList.add("reveal");
      if (prefersReduced) el.classList.add("in-view");
    });

    if (prefersReduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    sections.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
