import type { ExperienceItem } from "@/types/content";

/** Newest first. `end: "Present"` marks the current role. */
export const experience: ExperienceItem[] = [
  {
    start: "2024",
    end: "Present",
    role: "Senior Frontend Developer",
    company: "Parallel Studio",
    location: "Lisbon · Remote",
    description:
      "Lead frontend on brand and product builds for clients across Europe. Created the studio's Next.js starter, component conventions and performance budgets, now used on every new project.",
    technologies: ["Next.js", "TypeScript", "Motion", "Sanity"],
  },
  {
    start: "2022",
    end: "2024",
    role: "Frontend Engineer",
    company: "Ducat",
    location: "Berlin",
    description:
      "Second frontend hire at an invoicing startup for freelancers. Built the invoice editor, cash-flow charts and the design system that let a four-person team ship every week.",
    technologies: ["React", "TanStack Query", "D3", "Storybook"],
  },
  {
    start: "2020",
    end: "2022",
    role: "Web Developer",
    company: "Okto Agency",
    location: "Porto",
    description:
      "Marketing sites and campaign pages for retail and hospitality brands, often on two-week timelines. Introduced automated accessibility checks into the agency's QA process.",
    technologies: ["JavaScript", "GSAP", "SCSS", "WordPress"],
  },
  {
    start: "2018",
    end: "2020",
    role: "Freelance Developer",
    company: "Self-employed",
    location: "Lisbon",
    description:
      "Websites for local businesses and early-stage founders. Learned that a clear scope beats clever code, and that every project eventually needs to be edited by someone else.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
  },
];
