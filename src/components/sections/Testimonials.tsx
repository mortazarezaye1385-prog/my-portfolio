"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { testimonials } from "@/content/testimonials";
import { ease } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const count = testimonials.length;
  const current = testimonials[active];

  function select(index: number, focus = false) {
    const next = (index + count) % count;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (event.key === "Home") select(0, true);
    else if (event.key === "End") select(count - 1, true);
    else if (event.key in keys) select(active + (keys[event.key] ?? 0), true);
    else return;
    event.preventDefault();
  }

  if (!current) return null;

  return (
    <section aria-labelledby="testimonials-title" className="py-28 md:py-40">
      <div className="container-x grid gap-12 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 lg:col-span-3">
          <Reveal y={8}>
            <p className="eyebrow">
              <span className="text-accent">06</span> / Kind words
            </p>
            <h2 id="testimonials-title" className="display-3 mt-8">
              From the people I&apos;ve built with.
            </h2>
          </Reveal>

          <div role="tablist" aria-label="Testimonials" aria-orientation="vertical" className="mt-10 flex flex-col border-t border-line">
            {testimonials.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.name}
                  ref={(node) => {
                    tabs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`testimonial-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="testimonial-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={onTabKey}
                  className={cn(
                    "group flex items-center justify-between gap-4 border-b border-line py-4 text-left transition-colors duration-300",
                    selected ? "text-fg" : "text-subtle hover:text-fg",
                  )}
                >
                  <span>
                    <span className="block font-medium">{item.name}</span>
                    <span className="meta block text-inherit opacity-80">{item.company}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn("size-1.5 rounded-full bg-accent transition-transform duration-500 ease-out-expo", selected ? "scale-100" : "scale-0")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:col-span-8 md:col-start-5 lg:col-span-8 lg:col-start-5">
          <div
            id="testimonial-panel"
            role="tabpanel"
            aria-labelledby={`testimonial-tab-${active}`}
            aria-live="polite"
            className="relative min-h-[22rem] md:min-h-[26rem]"
          >
            <span aria-hidden="true" className="block font-display text-[7rem] leading-[0.6] text-accent [font-stretch:120%] md:text-[9rem]">
              &ldquo;
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={active}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: 0.5, ease: ease.outExpo }}
                className="mt-4"
              >
                <blockquote className="font-display text-[clamp(1.625rem,3.2vw,2.875rem)] font-medium leading-[1.15] tracking-[-0.025em] [font-stretch:104%]">
                  <p>{current.quote}</p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-full border border-line-strong font-mono text-xs">
                    {current.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-medium">{current.name}</span>
                    <span className="meta block">
                      {current.role}, {current.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
            <p className="meta" aria-hidden="true">
              <span className="text-fg">{pad(active + 1)}</span> / {pad(count)}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => select(active - 1)}
                aria-label="Previous testimonial"
                className="grid size-11 place-items-center rounded-[2px] border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => select(active + 1)}
                aria-label="Next testimonial"
                className="grid size-11 place-items-center rounded-[2px] border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
