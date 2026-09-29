import type { Transition } from "motion/react";

type CubicBezier = [number, number, number, number];

export const ease: Record<"outExpo" | "outQuint" | "inOut", CubicBezier> = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuint: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const spring = {
  magnetic: { stiffness: 220, damping: 18, mass: 0.4 },
  cursor: { stiffness: 520, damping: 40, mass: 0.6 },
  soft: { stiffness: 120, damping: 20, mass: 0.6 },
} as const;

export const reveal: Transition = { duration: 0.8, ease: ease.outExpo };

/** Shared viewport settings so scroll reveals trigger consistently. */
export const inView = { once: true, margin: "0px 0px -12% 0px" } as const;
