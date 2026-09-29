"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { processSteps } from "@/content/process";
import { ease, inView, spring } from "@/lib/motion";
import { pad } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, spring.soft);

  return (
    <section id="process" aria-labelledby="process-title" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading id="process-title" index="05" label="Process" title={["From first call", "to launch day."]} />

        <ol ref={listRef} className="relative mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-6 lg:pt-10">
          {/* Progress rail (desktop) */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-line lg:block" />
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px origin-left bg-accent lg:block"
            style={{ scaleX: reduce ? 1 : progress }}
          />

          {processSteps.map((step, i) => (
            <motion.li
              key={step.title}
              className="relative border-t border-line pt-6 lg:border-t-0 lg:pt-0"
              initial={{ opacity: 0, y: reduce ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: ease.outExpo, delay: i * 0.08 }}
            >
              <span aria-hidden="true" className="absolute -top-[calc(2.5rem+4.5px)] left-0 hidden size-2.5 rounded-full border border-accent bg-bg lg:block" />
              <p className="meta text-accent">{pad(i + 1)}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] [font-stretch:108%]">{step.title}</h3>
              <p className="mt-3 max-w-[32ch] text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
