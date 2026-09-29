import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectLayout } from "@/types/content";
import { cn, pad } from "@/lib/utils";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { TagList } from "@/components/ui/Tag";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** Per-layout composition. Mobile always stacks media above text. */
const layouts: Record<ProjectLayout, { root: string; media: string; body: string; aspect: string; sizes: string }> = {
  feature: {
    root: "md:grid-cols-12",
    media: "md:col-span-12",
    body: "md:col-span-12 md:grid md:grid-cols-12 md:gap-8",
    aspect: "aspect-[4/3] md:aspect-[16/9]",
    sizes: "(min-width: 1440px) 1344px, 100vw",
  },
  offset: {
    root: "md:grid-cols-12 md:items-end",
    media: "md:order-2 md:col-span-8 md:col-start-5",
    body: "md:order-1 md:col-span-4 md:row-start-1 md:pb-2",
    aspect: "aspect-[4/3]",
    sizes: "(min-width: 768px) 66vw, 100vw",
  },
  wide: {
    root: "md:grid-cols-12",
    media: "md:col-span-12 md:-mx-[clamp(1.25rem,4vw,3rem)]",
    body: "md:col-span-12 md:grid md:grid-cols-12 md:gap-8",
    aspect: "aspect-[4/3] md:aspect-[21/9]",
    sizes: "100vw",
  },
  split: {
    root: "md:grid-cols-12 md:items-center",
    media: "md:col-span-7",
    body: "md:col-span-4 md:col-start-9",
    aspect: "aspect-[4/3] md:aspect-[5/6]",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
  inset: {
    root: "md:grid-cols-12",
    media: "md:col-span-10 md:col-start-2",
    body: "md:col-span-6 md:col-start-6",
    aspect: "aspect-[16/10]",
    sizes: "(min-width: 768px) 70vw, 100vw",
  },
};

function ProjectMeta({ project, index }: ProjectCardProps) {
  return (
    <p className="meta flex items-center gap-3 transition-transform duration-500 ease-out-expo group-hover/card:translate-x-1">
      <span className="text-accent">{pad(index)}</span>
      <span aria-hidden="true" className="h-px w-6 origin-left bg-line-strong transition-transform duration-500 ease-out-expo group-hover/card:scale-x-150" />
      <span>{project.type}</span>
      <span aria-hidden="true">·</span>
      <span>{project.year}</span>
    </p>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const external = "group inline-flex h-10 items-center gap-2 rounded-[2px] border border-line px-3.5 text-sm text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/projects/${project.slug}`}
        className="group mr-2 inline-flex h-10 items-center gap-2 text-sm font-medium text-fg"
      >
        <span className="relative">
          Case study
          <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-0 group-hover:origin-right" />
        </span>
        <AnimatedArrow />
      </Link>
      {project.links.live ? (
        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={external}>
          Live Demo
          <AnimatedArrow direction="up-right" />
          <span className="sr-only"> of {project.title} (opens in a new tab)</span>
        </a>
      ) : null}
      {project.links.repo ? (
        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={external}>
          <BrandIcon platform="github" className="size-3.5" />
          GitHub
          <span className="sr-only"> repository for {project.title} (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const layout = layouts[project.layout];
  const href = `/projects/${project.slug}`;
  const isStacked = project.layout === "feature" || project.layout === "wide";
  const isInset = project.layout === "inset";

  return (
    <article className={cn("group/card grid gap-8 md:gap-x-8 md:gap-y-10", layout.root)} aria-labelledby={`project-${project.slug}`}>
      <Reveal className={layout.media}>
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          data-cursor="view"
          data-cursor-label="View case"
          className={cn("group/media relative block overflow-hidden rounded-[2px] bg-sunken", isInset && "p-4 sm:p-8 md:p-14")}
        >
          <div className={cn("relative overflow-hidden", layout.aspect)}>
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              placeholder="blur"
              sizes={layout.sizes}
              className="size-full object-cover transition-transform duration-[1.1s] ease-out-expo group-hover/media:scale-[1.045]"
            />
            <div className="absolute inset-0 bg-[var(--overlay)] opacity-0 transition-opacity duration-500 ease-out-expo group-hover/media:opacity-100" />
            <span className="absolute bottom-4 left-4 inline-flex translate-y-3 items-center gap-2 rounded-[2px] bg-bg px-3.5 py-2 text-sm font-medium text-fg opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-hover/media:translate-y-0 group-hover/media:opacity-100 md:bottom-6 md:left-6">
              View case study
              <AnimatedArrow direction="up-right" />
            </span>
          </div>
        </Link>
      </Reveal>

      <Reveal delay={0.08} className={layout.body}>
        <div className={cn(isStacked && "md:col-span-5")}>
          <ProjectMeta project={project} index={index} />
          <h3 id={`project-${project.slug}`} className="display-3 mt-4">
            <Link href={href} className="transition-colors duration-300 hover:text-accent">
              {project.title}
            </Link>
          </h3>
        </div>
        <div className={cn("mt-4 space-y-6", isStacked && "md:col-span-6 md:col-start-7 md:mt-0")}>
          <p className="max-w-[48ch] text-muted">{project.summary}</p>
          <TagList tags={project.tags} />
          <ProjectLinks project={project} />
        </div>
      </Reveal>
    </article>
  );
}
