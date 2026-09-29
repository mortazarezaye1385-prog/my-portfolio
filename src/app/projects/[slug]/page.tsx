import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/content/projects";
import { projectJsonLd } from "@/lib/seo";
import { ProjectCaseStudy } from "@/components/case-study/ProjectCaseStudy";
import { JsonLd } from "@/components/ui/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title}: ${project.type}`;
  const images = [{ url: project.cover.src.src, width: project.cover.src.width, height: project.cover.src.height, alt: project.cover.alt }];
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", title, description: project.summary, url: `/projects/${project.slug}`, images },
    twitter: { card: "summary_large_image", title, description: project.summary, images: images.map((image) => image.url) },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <ProjectCaseStudy project={project} next={getNextProject(project.slug)} />
    </>
  );
}
