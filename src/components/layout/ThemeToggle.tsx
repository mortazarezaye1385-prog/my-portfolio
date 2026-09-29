"use client";

import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { MouseEvent } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/**
 * Switches theme with a circular reveal expanding from the button
 * (View Transitions API), falling back to an instant swap.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const reduce = useReducedMotion();
  const next = theme === "dark" ? "light" : "dark";

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(() => setTheme(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => undefined);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "group relative grid size-10 place-items-center rounded-[2px] border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        strokeWidth={1.75}
        className="absolute size-[18px] rotate-0 scale-100 transition-transform duration-500 ease-out-expo dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        strokeWidth={1.75}
        className="absolute size-[18px] rotate-90 scale-0 transition-transform duration-500 ease-out-expo dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}
