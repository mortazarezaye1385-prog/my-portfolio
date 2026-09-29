"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/hooks/use-media-query";
import { ease, spring } from "@/lib/motion";

type CursorMode = "default" | "link" | "view";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * A soft follower ring that complements (never replaces) the native cursor.
 * Elements with `data-cursor="view"` turn it into a labelled bubble.
 * Disabled for touch devices and reduced motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.cursor);
  const sy = useSpring(y, spring.cursor);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("View");
  const [visible, setVisible] = useState(false);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      const view = target?.closest<HTMLElement>("[data-cursor='view']");
      if (view) {
        setMode("view");
        setLabel(view.dataset.cursorLabel ?? "View");
      } else if (target?.closest(INTERACTIVE)) {
        setMode("link");
      } else {
        setMode("default");
      }
    }
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className="absolute left-0 top-0 block size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/40"
        animate={{
          scale: mode === "link" ? 1.6 : mode === "view" ? 0 : 1,
          borderColor: mode === "link" ? "var(--accent)" : "color-mix(in oklch, var(--fg) 40%, transparent)",
        }}
        transition={{ duration: 0.35, ease: ease.outExpo }}
      />
      <AnimatePresence>
        {mode === "view" ? (
          <motion.span
            key="view"
            className="absolute left-0 top-0 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-ink"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.outExpo }}
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
