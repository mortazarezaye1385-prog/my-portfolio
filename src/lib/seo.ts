import type { Project } from "@/types/content";
import { site } from "@/content/site";
import { socials } from "@/content/socials";

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: socials.map((social) => social.href),
    knowsAbout: site.keywords,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    dateCreated: String(project.year),
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.cover.src.src),
    keywords: project.tags.join(", "),
    creator: { "@type": "Person", name: site.name, url: site.url },
  };
}
