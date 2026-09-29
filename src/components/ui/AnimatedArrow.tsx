import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Direction = "right" | "up-right" | "down" | "up";

const icons: Record<Direction, LucideIcon> = {
  right: ArrowRight,
  "up-right": ArrowUpRight,
  down: ArrowDown,
  up: ArrowUp,
};

const out: Record<Direction, string> = {
  right: "group-hover:translate-x-full group-focus-visible:translate-x-full",
  "up-right": "group-hover:translate-x-full group-hover:-translate-y-full group-focus-visible:translate-x-full group-focus-visible:-translate-y-full",
  down: "group-hover:translate-y-full group-focus-visible:translate-y-full",
  up: "group-hover:-translate-y-full group-focus-visible:-translate-y-full",
};

const start: Record<Direction, string> = {
  right: "-translate-x-full",
  "up-right": "-translate-x-full translate-y-full",
  down: "-translate-y-full",
  up: "translate-y-full",
};

/**
 * Arrow that slides out and is replaced by a twin sliding in.
 * Place inside an element with the `group` class.
 */
export function AnimatedArrow({ direction = "right", className }: { direction?: Direction; className?: string }) {
  const Icon = icons[direction];
  const base = "absolute inset-0 size-full transition-transform duration-500 ease-out-expo";
  return (
    <span aria-hidden="true" className={cn("relative inline-block size-[1em] shrink-0 overflow-hidden", className)}>
      <Icon strokeWidth={1.75} className={cn(base, out[direction])} />
      <Icon
        strokeWidth={1.75}
        className={cn(base, start[direction], "group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0")}
      />
    </span>
  );
}
