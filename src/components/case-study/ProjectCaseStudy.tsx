import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/types/content";
import { pad } from "@/lib/utils";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLines } from "@/components/ui/RevealLines";
import { TagList } from "@/components/ui/Tag";

interface ProjectCaseStudyProps {
  project: Project;
  next: Project;
}

/** Two-column editorial block: small label on the left, content on the right. */
function Block({ label, index, children, id }: { label: string; index: number; children: ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-8 md:py-20">
      <Reveal y={8} className="md:col-span-3">
        <h2 id={id} className="eyebrow">
          <span className="text-accent">{pad(index)}</span> / {label}
        </h2>
      </Reveal>
      <Reveal className="md:col-span-9 lg:col-span-8">{children}</Reveal>
    </section>
  );
}

export function ProjectCaseStudy({ project, next }: ProjectCaseStudyProps) {
  const facts = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.duration },
    { label: "Year", value: String(project.year) },
  ];

  return (
    <article className="pb-24 pt-32 md:pt-44">
      {/* Hero */}
      <header className="container-x">
        <Reveal y={8}>
          <Link href="/#work" className="group meta inline-flex items-center gap-2 transition-colors hover:text-fg">
            <AnimatedArrow direction="right" className="rotate-180" />
            All work
          </Link>
        </Reveal>

        <p className="eyebrow mt-12">
          Case study · {project.type}
        </p>
        <h1 className="display-1 mt-6 -ml-[0.04em]">
          <RevealLines trigger="mount" delay={0.1} lines={[project.title]} />
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
          <Reveal delay={0.3} className="md:col-span-6">
            <p className="lead max-w-[36ch]">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live ? (
                <ButtonLink href={project.links.live} arrow="up-right" magnetic>
                  Visit live site
                </ButtonLink>
              ) : null}
              {project.links.repo ? (
                <ButtonLink href={project.links.repo} variant="secondary" arrow="up-right" magnetic>
                  View repository
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={0.4} className="md:col-span-5 md:col-start-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="mt-1.5">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      <Reveal delay={0.35} y={40} className="container-x mt-16 md:mt-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-sunken md:aspect-[16/9]">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            placeholder="blur"
            priority
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="size-full object-cover"
          />
        </div>
      </Reveal>

      <div className="container-x mt-16 md:mt-28">
        <Block id="overview" index={1} label="Overview">
          <p className="lead max-w-[60ch]">{project.overview}</p>
        </Block>

        <section aria-label="Problem and solution" className="grid gap-12 border-t border-line py-12 md:grid-cols-12 md:gap-8 md:py-20">
          <Reveal className="md:col-span-5 md:col-start-4">
            <h2 className="eyebrow">
              <span className="text-accent">02</span> / Problem
            </h2>
            <p className="mt-5 text-muted">{project.problem}</p>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-4 md:col-start-9">
            <h2 className="eyebrow">
              <span className="text-accent">03</span> / Solution
            </h2>
            <p className="mt-5 text-muted">{project.solution}</p>
          </Reveal>
        </section>

        <Block id="process" index={4} label="Process">
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {project.process.map((step, i) => (
              <li key={step.title}>
                <p className="meta text-accent">Step {pad(i + 1)}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] [font-stretch:106%]">{step.title}</h3>
                <p className="mt-2 max-w-[42ch] text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="technologies" index={5} label="Technologies">
          <TagList tags={project.tags} />
        </Block>

        <Block id="features" index={6} label="Key features">
          <ul className="border-t border-line">
            {project.features.map((feature, i) => (
              <li key={feature} className="flex items-baseline gap-6 border-b border-line py-4">
                <span className="meta w-6 shrink-0">{pad(i + 1)}</span>
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      {project.gallery[0] ? (
        <figure className="container-x mt-4">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-sunken">
              <Image src={project.gallery[0].src} alt={project.gallery[0].alt} placeholder="blur" sizes="100vw" className="size-full object-cover" />
            </div>
          </Reveal>
          {project.gallery[0].caption ? <figcaption className="meta mt-3">{project.gallery[0].caption}</figcaption> : null}
        </figure>
      ) : null}

      <div className="container-x mt-16 md:mt-28">
        <Block id="challenges" index={7} label="Challenges">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            {project.challenges.map((challenge) => (
              <div key={challenge.title}>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] [font-stretch:106%]">{challenge.title}</h3>
                <p className="mt-3 text-muted">{challenge.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="results" index={8} label="Results">
          <dl className="grid gap-8 sm:grid-cols-3">
            {project.results.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse gap-2 border-t border-line pt-5">
                <dt className="meta">{metric.label}</dt>
                <dd className="font-display text-[clamp(2.75rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums [font-stretch:110%]">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[56ch] text-muted">{project.results.summary}</p>
        </Block>
      </div>

      {project.gallery[1] ? (
        <figure className="container-x">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-sunken">
              <Image src={project.gallery[1].src} alt={project.gallery[1].alt} placeholder="blur" sizes="100vw" className="size-full object-cover" />
            </div>
          </Reveal>
          {project.gallery[1].caption ? <figcaption className="meta mt-3">{project.gallery[1].caption}</figcaption> : null}
        </figure>
      ) : null}

      {/* Next project */}
      <nav aria-label="Next project" className="container-x mt-24 md:mt-40">
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="view"
          data-cursor-label="Next"
          className="group grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end md:gap-8"
        >
          <div className="md:col-span-7">
            <p className="eyebrow">Next project</p>
            <p className="display-2 mt-6 transition-colors duration-300 group-hover:text-accent">{next.title}</p>
            <p className="meta mt-4 flex items-center gap-2">
              {next.type} · {next.year}
              <AnimatedArrow className="text-fg" />
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-sunken md:col-span-5">
            <Image
              src={next.cover.src}
              alt=""
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="size-full object-cover transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.05]"
            />
          </div>
        </Link>
      </nav>
    </article>
  );
}
