import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLines } from "@/components/ui/RevealLines";
import { Stats } from "./Stats";

export function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-title" className="py-28 md:py-40">
      <div className="container-x grid gap-16 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Reveal y={8}>
            <p className="eyebrow">
              <span className="text-accent">01</span> / About
            </p>
          </Reveal>
          <h2 id="about-title" className="display-2 mt-8">
            <RevealLines lines={about.heading} />
          </h2>

          <Reveal delay={0.15} className="mt-12 max-w-[26rem] md:mt-16">
            <figure>
              {/* Replace src/assets/portrait.jpg with your photo (4:5 works best). */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2px] bg-raised">
                <Image
                  src={portrait}
                  alt={about.portraitAlt}
                  placeholder="blur"
                  sizes="(min-width: 768px) 26rem, 100vw"
                  className="size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="meta mt-3 flex justify-between">
                <span>{site.name}</span>
                <span>{about.portraitCaption}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-[4.5rem]">
          <Reveal>
            <p className="lead max-w-[38ch]">{about.lead}</p>
          </Reveal>

          <dl className="mt-14 md:mt-20">
            {about.blocks.map((block, i) => (
              <Reveal key={block.label} delay={i * 0.06} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1">{block.label}</dt>
                <dd className="max-w-[52ch] text-muted">{block.text}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-14 md:mt-24">
            <Stats stats={site.stats} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
