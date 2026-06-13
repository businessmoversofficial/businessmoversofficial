import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Full display value, e.g. "10+", "20%", "100%", "24/7" */
  value: string;
  /** Animation duration in ms */
  duration?: number;
  className?: string;
}

/**
 * Animates the numeric portion of `value` from 0 up to its target when
 * the element first enters the viewport. Non-numeric suffixes/prefixes
 * (e.g. "+", "%", "/7") are preserved. Values without a leading number
 * (or with multiple numbers, like "24/7") render as static text.
 */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const hasSlash = value.includes("/");
  const target = match && !hasSlash ? parseInt(match[1], 10) : null;
  const suffix = match && !hasSlash ? match[2] : "";

  const [display, setDisplay] = useState<string>(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(`${target}${suffix}`);
      return;
    }

    let started = false;
    let rafId = 0;

    const start = () => {
      if (started) return;
      started = true;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(eased * target);
        setDisplay(`${current}${suffix}`);
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
