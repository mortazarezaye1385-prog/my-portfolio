"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Stat } from "@/types/content";
import { ease } from "@/lib/motion";

function Counter({ value, suffix = "" }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!seen || reduce || !node) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: ease.outExpo,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [seen, reduce, value, suffix]);

  return (
    <span ref={ref} aria-hidden="true">
      {value}
      {suffix}
    </span>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-8 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-2">
          <dt className="meta max-w-[18ch]">{stat.label}</dt>
          <dd className="font-display text-[clamp(2.5rem,4.4vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums [font-stretch:110%]">
            <Counter {...stat} />
            <span className="sr-only">
              {stat.value}
              {stat.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
