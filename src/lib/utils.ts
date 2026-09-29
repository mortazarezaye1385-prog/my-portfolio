type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Small enough that a dependency isn't worth it. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Zero-padded index used in editorial numbering: 1 -> "01". */
export function pad(index: number): string {
  return String(index).padStart(2, "0");
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
