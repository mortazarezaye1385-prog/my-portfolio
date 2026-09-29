import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";
import { AnimatedArrow } from "./AnimatedArrow";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-bg",
  ghost: "text-fg hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-5 text-[0.9375rem] gap-2.5",
  lg: "h-14 px-7 text-base gap-3",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-[2px] font-medium tracking-[-0.005em]",
    "transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: "right" | "up-right" | "down" | false;
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
}

/** Link styled as a button. External URLs open in a new tab with safe rel attributes. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = "right",
  magnetic = false,
  className,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <AnimatedArrow direction={arrow} /> : null}
    </>
  );

  const link = isExternal(href) || href.startsWith("mailto:") ? (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
      {isExternal(href) ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  ) : (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
