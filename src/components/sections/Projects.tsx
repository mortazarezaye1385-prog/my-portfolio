import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const years = projects.map((project) => project.year);
  const range = `${Math.min(...years)} to ${Math.max(...years)}`;

  return (
    <section id="work" aria-labelledby="work-title" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="02"
          label="Selected work"
          title={["Recent work,", "shipped and measured."]}
          aside={
            <p className="max-w-[52ch] text-muted">
              {projects.length} projects from {range}: storefronts, product UI, data visualisation and open source.
              Each one links to a case study with the problem, the decisions and the numbers.
            </p>
          }
        />
        <ol className="mt-20 space-y-28 md:mt-28 md:space-y-44">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={i + 1} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
