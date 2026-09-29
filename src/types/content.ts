import type { StaticImageData } from "next/image";

export interface NavItem {
  label: string;
  /** Section id on the home page, without the hash. */
  id: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  roles: string[];
  location: string;
  timeZone: string;
  email: string;
  url: string;
  availability: string;
  title: string;
  description: string;
  keywords: string[];
  twitterHandle: string;
  locale: string;
  hero: {
    headline: string[];
    /** Word in the last headline line that gets the accent colour. */
    accentWord: string;
    intro: string;
  };
  about: {
    heading: string[];
    lead: string;
    blocks: { label: string; text: string }[];
    portraitAlt: string;
    portraitCaption: string;
  };
  stats: Stat[];
  footerStatement: string;
  nav: NavItem[];
}

export type ProjectLayout = "feature" | "offset" | "wide" | "split" | "inset";

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
  caption?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: number;
  type: string;
  role: string;
  duration: string;
  summary: string;
  tags: string[];
  layout: ProjectLayout;
  cover: ProjectImage;
  gallery: ProjectImage[];
  links: { live?: string; repo?: string };
  overview: string;
  problem: string;
  solution: string;
  process: { title: string; text: string }[];
  features: string[];
  challenges: { title: string; text: string }[];
  results: { summary: string; metrics: ProjectMetric[] };
}

export interface ExperienceItem {
  start: string;
  end: string;
  role: string;
  company: string;
  location: string;
  url?: string;
  description: string;
  technologies: string[];
}

export interface Service {
  title: string;
  description: string;
  capabilities: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export type SocialPlatform = "github" | "linkedin" | "x" | "dribbble" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
}
