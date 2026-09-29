import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("inline-flex h-7 items-center rounded-[2px] border border-line px-2.5 font-mono text-[0.75rem] tracking-[0.02em] text-muted", className)}>
      {children}
    </span>
  );
}

export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
