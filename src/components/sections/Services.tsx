import { services } from "@/content/services";
import { pad } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-sunken py-28 md:py-40">
      <div className="container-x">
        <SectionHeading id="services-title" index="04" label="Expertise" title={["What I bring", "to a team."]} />

        <ol className="mt-16 grid md:mt-24 lg:grid-cols-2 lg:gap-x-16">
          {services.map((service, i) => (
            <li key={service.title} className="group border-t border-line">
              <Reveal delay={(i % 2) * 0.08} className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-3 py-8 md:grid-cols-[4.5rem_1fr] md:py-10">
                <span className="meta pt-2 transition-colors duration-300 group-hover:text-accent">{pad(i + 1)}</span>
                <h3 className="font-display text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.03em] transition-transform duration-500 ease-out-expo [font-stretch:108%] group-hover:translate-x-1.5 md:text-[2.25rem]">
                  {service.title}
                </h3>
                <p className="col-start-2 max-w-[44ch] text-muted">{service.description}</p>
                <p className="meta col-start-2 text-subtle">{service.capabilities.join(" · ")}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
