import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Monogram + name. `compact` hides the name (used by the scrolled navbar). */
export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className={cn("group inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="relative grid size-9 place-items-center rounded-[2px] border border-line-strong font-display text-[0.8125rem] font-bold tracking-[-0.02em] [font-stretch:115%] transition-colors duration-300 group-hover:border-accent"
      >
        {site.initials}
        <span className="absolute -right-[3px] -top-[3px] size-1.5 rounded-full bg-accent" />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "hidden text-[0.9375rem] font-medium tracking-[-0.01em] transition-[opacity,transform] duration-500 ease-out-expo sm:inline",
          compact && "sm:-translate-x-2 sm:opacity-0",
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
