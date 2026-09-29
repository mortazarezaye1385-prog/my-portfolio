import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealLines } from "./RevealLines";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string[];
  id?: string;
  aside?: ReactNode;
  className?: string;
}

/** Numbered editorial section header: "02 / Selected work" + large display title. */
export function SectionHeading({ index, label, title, id, aside, className }: SectionHeadingProps) {
  return (
    <header className={cn("grid gap-y-6 border-t border-line pt-6 md:grid-cols-12 md:gap-x-8", className)}>
      <Reveal className="md:col-span-3" y={8}>
        <p className="eyebrow">
          <span className="text-accent">{index}</span>
          <span aria-hidden="true"> / </span>
          {label}
        </p>
      </Reveal>
      <h2 id={id} className="display-2 md:col-span-9">
        <RevealLines lines={title} />
      </h2>
      {aside ? <div className="md:col-span-9 md:col-start-4">{aside}</div> : null}
    </header>
  );
}
