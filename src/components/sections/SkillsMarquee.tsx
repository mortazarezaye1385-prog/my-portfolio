import { skills } from "@/content/skills";
import { cn } from "@/lib/utils";

/** Continuous capability strip. Pauses on hover; the real list is exposed to screen readers once. */
export function SkillsMarquee() {
  return (
    <section aria-label="Technologies and capabilities" className="group overflow-hidden border-y border-line py-6 md:py-8">
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="flex w-max animate-[marquee_48s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {skills.map((skill, i) => (
              <span key={skill} className="flex items-center">
                <span
                  className={cn(
                    "font-display text-[1.75rem] font-semibold leading-none tracking-[-0.03em] [font-stretch:110%] md:text-[2.75rem]",
                    i % 2 === 1 ? "text-subtle" : "text-fg",
                  )}
                >
                  {skill}
                </span>
                <span className="mx-8 size-1.5 rotate-45 bg-accent md:mx-12" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
