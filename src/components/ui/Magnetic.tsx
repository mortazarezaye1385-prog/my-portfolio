"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/use-media-query";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  /** 0..1, how far the element follows the pointer. */
  strength?: number;
  className?: string;
}

/** Pulls its child gently toward the pointer. Inert on touch and with reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring.magnetic);
  const y = useSpring(useMotionValue(0), spring.magnetic);
  const enabled = fine && !reduce;

  function onMove(event: PointerEvent<HTMLSpanElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex", className)}
      style={enabled ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
