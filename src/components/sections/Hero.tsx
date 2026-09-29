import { Fragment, type ReactNode } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLines } from "@/components/ui/RevealLines";
import { HeroBackdrop } from "./HeroBackdrop";
import { LocalTime } from "./LocalTime";

function accentuate(line: string, word: string): ReactNode {
  const parts = line.split(word);
  if (parts.length === 1) return line;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? <span className="text-accent">{word}</span> : null}
    </Fragment>
  ));
}

export function Hero() {
  const { headline, accentWord, intro } = site.hero;

  return (
    <section
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col pb-8 pt-28 outline-none md:pb-10 md:pt-36"
    >
      <HeroBackdrop />

      <div className="container-x flex flex-1 flex-col">
        <Reveal y={8} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-5">{site.roles.join(" / ")}</p>
          <p className="meta hidden lg:col-span-3 lg:block">
            {site.location} · <LocalTime timeZone={site.timeZone} />
          </p>
          <p className="meta flex items-center gap-2.5 sm:justify-self-end lg:col-span-4">
            <span className="pulse-dot" aria-hidden="true" />
            {site.availability}
          </p>
        </Reveal>

        <div className="flex flex-1 flex-col justify-end pt-16 md:pt-20">
          <h1 id="hero-title" className="display-1 -ml-[0.04em]">
            <span className="sr-only">{`${site.name}, ${site.role}. `}</span>
            <RevealLines
              trigger="mount"
              delay={0.15}
              step={0.09}
              lines={headline.map((line) => accentuate(line, accentWord))}
            />
          </h1>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end md:gap-8">
            <Reveal delay={0.55} className="md:col-span-6 lg:col-span-5">
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted md:text-lg">{intro}</p>
            </Reveal>
            <Reveal delay={0.65} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
              <ButtonLink href="/#work" size="lg" magnetic arrow="down">
                View My Work
              </ButtonLink>
              <ButtonLink href="/#contact" size="lg" variant="secondary" magnetic>
                Let&apos;s Talk
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.9} y={0} className="mt-14 flex items-end justify-between md:mt-16">
          <a href="#about" className="group flex items-center gap-3 text-subtle transition-colors hover:text-fg">
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 animate-[scroll-cue_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-accent" />
            </span>
            <span className="eyebrow text-inherit">Scroll</span>
          </a>
          <p className="meta hidden sm:block">Est. 2018 · Independent</p>
        </Reveal>
      </div>
    </section>
  );
}
