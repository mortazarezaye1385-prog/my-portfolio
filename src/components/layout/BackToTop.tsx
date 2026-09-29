"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

/** Scroll-to-top control whose ring doubles as a page progress indicator. */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  function toTop() {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("top")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="group relative grid size-14 place-items-center rounded-full text-fg"
    >
      <svg aria-hidden="true" viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
        <circle cx="28" cy="28" r="27" fill="none" stroke="var(--line)" strokeWidth="1" />
        <motion.circle
          cx="28"
          cy="28"
          r="27"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <AnimatedArrow direction="up" className="text-lg" />
    </button>
  );
}
