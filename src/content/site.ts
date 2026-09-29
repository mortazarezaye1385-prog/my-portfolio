import type { SiteConfig } from "@/types/content";

/**
 * Everything personal lives here. Change these values and the whole site,
 * including SEO metadata and structured data, updates with them.
 */
export const site: SiteConfig = {
  name: "Theo Marlowe",
  firstName: "Theo",
  initials: "TM",
  role: "Web Developer",
  roles: ["Web Developer", "Creative Developer"],
  location: "Lisbon, Portugal",
  timeZone: "Europe/Lisbon",
  email: "hello@theomarlowe.dev",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://theomarlowe.dev").replace(/\/$/, ""),
  availability: "Booking projects from November 2026",
  title: "Theo Marlowe, Web & Creative Developer",
  description:
    "Theo Marlowe is a Lisbon-based web and creative developer building fast, accessible, carefully animated websites and web apps with React, Next.js and TypeScript.",
  keywords: [
    "web developer",
    "creative developer",
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "Lisbon",
    "portfolio",
  ],
  twitterHandle: "@theomarlowe",
  locale: "en_US",
  hero: {
    headline: ["I build the web", "with precision", "and a pulse."],
    accentWord: "pulse",
    intro:
      "I'm Theo, a frontend developer who designs in code. For seven years I've helped studios, startups and product teams ship sites and apps that load fast, read clearly and feel good under the cursor.",
  },
  about: {
    heading: ["Engineer by trade,", "designer by", "obsession."],
    lead:
      "I sit in the space between design and engineering, where a 40ms delay or a slightly wrong line height decides whether something feels finished. I've spent my career in that gap, and I still find it the most interesting place to work.",
    blocks: [
      {
        label: "What I do",
        text: "Production frontends in React and Next.js: marketing sites, product interfaces, design systems and the occasional WebGL experiment.",
      },
      {
        label: "How I work",
        text: "Prototype in the browser early, measure on real devices, and keep the codebase boring enough that someone else can own it after me.",
      },
      {
        label: "What I care about",
        text: "Accessibility that isn't an afterthought, performance budgets that hold, and motion that explains rather than decorates.",
      },
    ],
    portraitAlt: "Portrait of Theo Marlowe",
    portraitCaption: "Lisbon, 2026",
  },
  stats: [
    { value: 7, suffix: "+", label: "Years building for the web" },
    { value: 40, suffix: "+", label: "Projects shipped" },
    { value: 18, label: "Long-term clients" },
    { value: 98, label: "Median Lighthouse score" },
  ],
  footerStatement: "Independent web developer. Taking on a small number of projects each quarter.",
  nav: [
    { label: "Home", id: "top" },
    { label: "About", id: "about" },
    { label: "Projects", id: "work" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ],
};
