"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { inView, reveal } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Ignored when the user prefers reduced motion. */
  y?: number;
}

/** Fade + slide on scroll into view. The workhorse for section content. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ ...reveal, delay }}
    >
      {children}
    </motion.div>
  );
}
