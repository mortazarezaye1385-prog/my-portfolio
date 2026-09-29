"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/use-media-query";
import { ease, spring } from "@/lib/motion";

const GRID = "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)";

/**
 * Hero atmosphere: a quiet grid, a cursor spotlight that sharpens it,
 * a parallax orbit and a heartbeat line (the "pulse" in the headline).
 * All motion is transform/opacity or a single SVG dash offset.
 */
export function HeroBackdrop() {
  const root = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, spring.soft);
  const sy = useSpring(py, spring.soft);
  const ringX = useTransform(sx, (v) => v * -28);
  const ringY = useTransform(sy, (v) => v * -20);
  const crossX = useTransform(sx, (v) => v * 44);
  const crossY = useTransform(sy, (v) => v * 32);
  const interactive = fine && !reduce;

  useEffect(() => {
    const el = root.current;
    if (!interactive || !el) return;
    let frame = 0;
    function onMove(event: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
        px.set((event.clientX - rect.width / 2) / rect.width);
        py.set((event.clientY - rect.height / 2) / rect.height);
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [interactive, px, py]);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [--mx:70%] [--my:30%]">
      {/* Base grid, fading toward the edges */}
      <div
        className="absolute inset-0 [--grid-line:var(--line)] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_30%,transparent_100%)]"
        style={{ backgroundImage: GRID, backgroundSize: "96px 96px", backgroundPosition: "-1px -1px" }}
      />
      {/* Spotlight grid that follows the cursor */}
      {interactive ? (
        <div
          className="absolute inset-0 [--grid-line:var(--line-strong)] [mask-image:radial-gradient(260px_circle_at_var(--mx)_var(--my),black,transparent)]"
          style={{ backgroundImage: GRID, backgroundSize: "96px 96px", backgroundPosition: "-1px -1px" }}
        />
      ) : null}

      {/* Orbit */}
      <motion.div
        className="absolute right-[-18vw] top-[8%] hidden size-[62vw] max-w-[860px] md:block lg:right-[-8vw] lg:size-[48vw]"
        style={{ x: ringX, y: ringY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: ease.outExpo, delay: 0.3 }}
      >
        <div className="absolute inset-0 rounded-full border border-line" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-line" />
        <div className="absolute inset-0 animate-[orbit_38s_linear_infinite] motion-reduce:animate-none">
          <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        </div>
      </motion.div>

      {/* Crosshair marker, drifts opposite the ring for depth */}
      <motion.div className="absolute left-[58%] top-[22%] hidden md:block" style={{ x: crossX, y: crossY }}>
        <span className="absolute -left-3 top-0 h-px w-6 bg-line-strong" />
        <span className="absolute -top-3 left-0 h-6 w-px bg-line-strong" />
        <span className="meta absolute left-4 top-2 whitespace-nowrap text-[0.6875rem] text-subtle">38.72° N, 9.14° W</span>
      </motion.div>

      {/* Heartbeat line */}
      <svg
        className="absolute inset-x-0 bottom-[16%] h-28 w-full md:bottom-[18%] md:h-40"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M0 120 H930 l14 -8 l10 16 l14 -92 l16 150 l14 -86 l12 20 H1440"
          stroke="var(--line-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: ease.inOut, delay: 0.4 }}
        />
        <path
          d="M0 120 H930 l14 -8 l10 16 l14 -92 l16 150 l14 -86 l12 20 H1440"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="0.12 1"
          className="animate-[pulse-travel_5.5s_cubic-bezier(0.65,0,0.35,1)_2.6s_infinite_both] motion-reduce:hidden"
        />
      </svg>
    </div>
  );
}
