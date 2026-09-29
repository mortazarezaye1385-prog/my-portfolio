import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading id="experience-title" index="03" label="Experience" title={["Seven years,", "four chapters."]} />

        <ol className="mt-16 md:mt-24">
          {experience.map((item, i) => {
            const current = item.end.toLowerCase() === "present";
            return (
              <li key={`${item.company}-${item.start}`}>
                <Reveal delay={i * 0.05}>
                  <article className="group relative grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-12">
                    {/* Top rule that sweeps in accent on hover */}
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                    />

                    <p className="meta flex items-center gap-2.5 md:col-span-3">
                      <time>{item.start}</time>
                      <span aria-hidden="true">→</span>
                      <span className="sr-only">to</span>
                      {current ? <span className="text-fg">{item.end}</span> : <time>{item.end}</time>}
                      {current ? <span className="pulse-dot ml-1 size-1.5" aria-hidden="true" /> : null}
                    </p>

                    <div className="transition-transform duration-500 ease-out-expo md:col-span-4 md:group-hover:translate-x-2">
                      <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.025em] [font-stretch:106%] md:text-[1.875rem]">
                        {item.role}
                      </h3>
                      <p className="mt-1.5 text-muted">
                        {item.company}
                        <span className="text-subtle"> · {item.location}</span>
                      </p>
                    </div>

                    <div className="md:col-span-5">
                      <p className="max-w-[56ch] text-muted">{item.description}</p>
                      <p className="meta mt-4 text-subtle">
                        <span className="sr-only">Technologies: </span>
                        {item.technologies.join("  /  ")}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
