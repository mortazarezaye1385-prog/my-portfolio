"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ease, inView } from "@/lib/motion";

interface RevealLinesProps {
  lines: ReactNode[];
  /** "mount" animates on page load (hero), "view" when scrolled into view. */
  trigger?: "mount" | "view";
  delay?: number;
  step?: number;
  lineClassName?: string;
}

/**
 * Masked line-by-line text reveal. Each line slides up from behind its own
 * clipping box, which reads as typography rather than as an effect.
 */
export function RevealLines({ lines, trigger = "view", delay = 0, step = 0.08, lineClassName }: RevealLinesProps) {
  const reduce = useReducedMotion();
  const from = reduce ? { opacity: 0 } : { y: "108%" };
  const to = reduce ? { opacity: 1 } : { y: "0%" };

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.06em] -mb-[0.06em]", lineClassName)}>
          <motion.span
            className="block will-change-transform"
            initial={from}
            {...(trigger === "mount" ? { animate: to } : { whileInView: to, viewport: inView })}
            transition={{ duration: reduce ? 0.4 : 1, ease: ease.outExpo, delay: delay + i * step }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
