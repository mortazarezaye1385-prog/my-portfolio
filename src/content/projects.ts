import type { Project } from "@/types/content";

import haldenCover from "@/assets/projects/halden-outfitters-cover.jpg";
import haldenDetail from "@/assets/projects/halden-outfitters-detail.jpg";
import haldenMobile from "@/assets/projects/halden-outfitters-mobile.jpg";
import ducatCover from "@/assets/projects/ducat-cover.jpg";
import ducatDetail from "@/assets/projects/ducat-detail.jpg";
import ducatMobile from "@/assets/projects/ducat-mobile.jpg";
import tidewellCover from "@/assets/projects/tidewell-cover.jpg";
import tidewellDetail from "@/assets/projects/tidewell-detail.jpg";
import tidewellMobile from "@/assets/projects/tidewell-mobile.jpg";
import okraCover from "@/assets/projects/okra-arquitetos-cover.jpg";
import okraDetail from "@/assets/projects/okra-arquitetos-detail.jpg";
import okraMobile from "@/assets/projects/okra-arquitetos-mobile.jpg";
import fieldkitCover from "@/assets/projects/fieldkit-cover.jpg";
import fieldkitDetail from "@/assets/projects/fieldkit-detail.jpg";
import fieldkitMobile from "@/assets/projects/fieldkit-mobile.jpg";

/**
 * Projects render in this order on the home page.
 * `layout` picks the editorial composition for each entry; mix them for rhythm.
 * Add images to src/assets/projects and import them above (1600x1000 works well).
 */
export const projects: Project[] = [
  {
    slug: "halden-outfitters",
    title: "Halden Outfitters",
    client: "Halden Outfitters, Bergen",
    year: 2026,
    type: "Headless e-commerce",
    role: "Lead frontend developer",
    duration: "5 months",
    summary: "A headless storefront for a Norwegian outdoor brand, rebuilt for speed on patchy mountain connections.",
    tags: ["Next.js", "TypeScript", "Shopify Storefront API", "Tailwind CSS"],
    layout: "feature",
    cover: { src: haldenCover, alt: "Halden Outfitters homepage with a topographic map hero and product row" },
    gallery: [
      { src: haldenDetail, alt: "Close-up of the field-test map marking a product test location", caption: "Every product links to where it was tested." },
      { src: haldenMobile, alt: "Three phone screens showing the Halden storefront on mobile", caption: "Mobile was designed first: 78% of traffic." },
    ],
    links: { live: "https://halden.example.com", repo: "https://github.com/theomarlowe/halden-storefront" },
    overview:
      "Halden sells technical outerwear to people who read spec sheets. Their old theme buried that detail under carousels and took six seconds to become usable on 4G. We rebuilt the storefront as a headless Next.js app on Shopify's Storefront API, with product pages designed around fabric, fit and field testing.",
    problem:
      "Mobile conversion sat at 0.9%. Product pages shipped 2.4 MB of JavaScript, every filter change reloaded the page, and the brand's best asset (honest, detailed product data) lived in accordions nobody opened.",
    solution:
      "A statically generated catalogue with on-demand revalidation, filters driven by URL state and a product template that leads with specs instead of slideshows. Interactive pieces (size guide, colour swatches, cart drawer) hydrate only when they scroll into view.",
    process: [
      { title: "Audit", text: "Profiled the old theme on a throttled mid-range Android and traced every script to an owner." },
      { title: "Prototype", text: "Built the product page in code first so the team argued about real content, not mockups." },
      { title: "Migrate", text: "Moved collections behind an edge rewrite one at a time while checkout stayed on Shopify." },
      { title: "Measure", text: "Weekly reviews of Core Web Vitals from real customers, not lab scores." },
    ],
    features: [
      "Filters that work without JavaScript",
      "Fabric and layering comparison tool",
      "Predictive search with full keyboard support",
      "Cart drawer with optimistic updates",
    ],
    challenges: [
      {
        title: "Stock across three warehouses",
        text: "Availability differed per region. We cached it at the edge for 60 seconds and reconciled at checkout, which kept pages static without overselling.",
      },
      {
        title: "8000px product photography",
        text: "An image pipeline with AVIF, art-directed crops and strict size budgets cut average page weight by 71%.",
      },
    ],
    results: {
      summary: "Launched in March 2026. The numbers below compare the first full quarter against the same quarter a year earlier.",
      metrics: [
        { value: "+31%", label: "Mobile conversion" },
        { value: "1.1s", label: "Largest Contentful Paint, p75" },
        { value: "-71%", label: "Average page weight" },
      ],
    },
  },
  {
    slug: "ducat",
    title: "Ducat",
    client: "Ducat GmbH, Berlin",
    year: 2025,
    type: "SaaS product",
    role: "Frontend engineer",
    duration: "2 years",
    summary: "Invoicing and cash-flow software for freelancers, designed so the numbers explain themselves.",
    tags: ["React", "TypeScript", "TanStack Query", "D3"],
    layout: "offset",
    cover: { src: ducatCover, alt: "Ducat dashboard with outstanding balance, cash-flow chart and recent invoices" },
    gallery: [
      { src: ducatDetail, alt: "Detail of the Ducat cash-flow chart with a hovered data point", caption: "Charts are keyboard navigable and announce values." },
      { src: ducatMobile, alt: "Ducat dashboard on three phone screens", caption: "Invoices can be sent from a phone in under a minute." },
    ],
    links: { live: "https://ducat.example.com", repo: "https://github.com/theomarlowe/ducat-ui" },
    overview:
      "Ducat helps freelancers across Europe send invoices, track payments and set money aside for tax. I joined as the second frontend engineer and stayed through the product's growth from a private beta to twelve thousand monthly users.",
    problem:
      "Freelancers weren't opening the dashboard. Research showed the charts answered questions nobody asked, and sending an invoice took eleven steps across four screens.",
    solution:
      "We rebuilt the overview around three questions (What am I owed? What came in? How long can I last?) and collapsed invoicing into a single editor with live preview and smart defaults learned from past invoices.",
    process: [
      { title: "Interviews", text: "Sat in on twenty user interviews and tagged every mention of money anxiety." },
      { title: "System", text: "Built the design system alongside the first screens, not before them." },
      { title: "Iterate", text: "Shipped behind feature flags and compared cohorts before rolling out." },
      { title: "Harden", text: "Visual regression tests on every component and currency formatting for 14 locales." },
    ],
    features: [
      "Single-screen invoice editor with live PDF preview",
      "Accessible D3 charts with keyboard and screen reader support",
      "Offline drafts synced on reconnect",
      "Tax set-aside calculator per country",
    ],
    challenges: [
      {
        title: "Money is never a float",
        text: "Every amount is stored in minor units and formatted with Intl.NumberFormat per locale, which ended a class of rounding bugs for good.",
      },
      {
        title: "Charts people can't see",
        text: "Each chart ships a data table alternative and announces the focused point, so the dashboard passed an external WCAG audit first time.",
      },
    ],
    results: {
      summary: "Measured six months after the redesign shipped to all users.",
      metrics: [
        { value: "-42%", label: "Time to send an invoice" },
        { value: "12k", label: "Monthly active users" },
        { value: "3.1x", label: "Weekly dashboard visits" },
      ],
    },
  },
  {
    slug: "tidewell",
    title: "Tidewell",
    client: "Atlantic Current Institute",
    year: 2025,
    type: "Data visualization",
    role: "Creative developer",
    duration: "4 months",
    summary: "A real-time ocean current explorer that renders over a million particles in the browser.",
    tags: ["WebGL", "GLSL", "Next.js", "Web Workers"],
    layout: "wide",
    cover: { src: tidewellCover, alt: "Tidewell visualisation of North Atlantic surface currents as flowing lines" },
    gallery: [
      { src: tidewellDetail, alt: "Close-up of particle trails following ocean currents", caption: "Particles are advected on the GPU from hourly model data." },
      { src: tidewellMobile, alt: "Tidewell running on three phone screens", caption: "A lighter particle budget keeps phones at 60fps." },
    ],
    links: { live: "https://tidewell.example.com", repo: "https://github.com/theomarlowe/tidewell" },
    overview:
      "The institute publishes hourly current forecasts for the North Atlantic, previously as static PNGs and NetCDF downloads. Tidewell turns that data into a live, scrubbable map for researchers, sailors and school groups.",
    problem:
      "The data was accurate but unreadable. Researchers downloaded files and built their own plots, and the public had no way in at all.",
    solution:
      "A WebGL particle system driven by velocity textures decoded in a Web Worker. A timeline lets you scrub 48 hours of forecast, and every view is shareable by URL.",
    process: [
      { title: "Sketch", text: "Prototyped particle behaviour in a plain canvas before touching shaders." },
      { title: "Pipeline", text: "Converted model output into compact velocity textures at build time." },
      { title: "Render", text: "Moved advection to the GPU with ping-pong framebuffers." },
      { title: "Tune", text: "Set particle budgets per device class from real frame timings." },
    ],
    features: [
      "1.2 million GPU-advected particles",
      "48-hour forecast timeline with scrubbing",
      "Shareable views encoded in the URL",
      "Reduced-motion mode with static streamlines",
    ],
    challenges: [
      {
        title: "Frame budget on old laptops",
        text: "An adaptive particle count watches frame times for two seconds after load and settles on a budget that holds 60fps.",
      },
      {
        title: "Motion sensitivity",
        text: "Constant flowing motion is a lot. With reduced motion enabled, Tidewell renders static streamlines coloured by velocity instead.",
      },
    ],
    results: {
      summary: "Adopted by the institute as its primary public tool and embedded by two partner organisations.",
      metrics: [
        { value: "60fps", label: "On 2019 laptops" },
        { value: "1.2M", label: "Particles rendered" },
        { value: "3", label: "Institutes using it" },
      ],
    },
  },
  {
    slug: "okra-arquitetos",
    title: "Okra Arquitetos",
    client: "Okra Arquitetos, Porto",
    year: 2024,
    type: "Brand website",
    role: "Developer, motion",
    duration: "10 weeks",
    summary: "An editorial website for an architecture studio, paced like a printed monograph.",
    tags: ["Next.js", "Sanity", "Motion", "View Transitions"],
    layout: "split",
    cover: { src: okraCover, alt: "Okra Arquitetos website with a large photograph of an arched terracotta facade" },
    gallery: [
      { src: okraDetail, alt: "Detail of arches in the Casa do Rio project photograph", caption: "Photography leads; interface stays out of the way." },
      { src: okraMobile, alt: "Okra Arquitetos website on three phone screens", caption: "The mobile layout reads like a vertical book." },
    ],
    links: { live: "https://okra.example.com", repo: "https://github.com/theomarlowe/okra-site" },
    overview:
      "Okra is a six-person studio in Porto known for residential work along the Douro. They wanted a site that felt like their monographs: generous, quiet and led by photography.",
    problem:
      "Their old site was a template gallery where every project looked the same size and weight. It said nothing about how the studio thinks.",
    solution:
      "A Sanity-powered site where each project has its own pacing: full-bleed images, drawings and short essays arranged by the architects themselves using a set of layout blocks.",
    process: [
      { title: "Read", text: "Spent a day in the studio going through printed monographs and drawings." },
      { title: "Blocks", text: "Designed eight layout blocks the team can combine without breaking the grid." },
      { title: "Motion", text: "Page transitions that carry the hero image from index to project." },
      { title: "Handover", text: "Trained the team in Sanity and recorded short videos for each block." },
    ],
    features: [
      "Shared-element page transitions with the View Transitions API",
      "Editor-controlled layout blocks",
      "Responsive art direction per image",
      "Bilingual content in Portuguese and English",
    ],
    challenges: [
      {
        title: "Giving editors freedom safely",
        text: "Blocks expose a few meaningful choices (size, alignment, caption position) instead of free-form layout, so pages stay on-grid.",
      },
      {
        title: "Heavy imagery, fast pages",
        text: "Sanity's image pipeline with focal points and LQIP placeholders keeps first loads under 400 KB.",
      },
    ],
    results: {
      summary: "Six months after launch, compared with the previous site.",
      metrics: [
        { value: "+64%", label: "Project enquiries" },
        { value: "2.3x", label: "Time on project pages" },
        { value: "380 KB", label: "Average first load" },
      ],
    },
  },
  {
    slug: "fieldkit",
    title: "Fieldkit UI",
    client: "Open source",
    year: 2023,
    type: "Design system",
    role: "Creator, maintainer",
    duration: "Ongoing",
    summary: "An accessible React component library and token set for teams who care about the details.",
    tags: ["React", "TypeScript", "Style Dictionary", "Vitest"],
    layout: "inset",
    cover: { src: fieldkitCover, alt: "Fieldkit UI documentation showing typography, buttons, inputs and colour tokens" },
    gallery: [
      { src: fieldkitDetail, alt: "Fieldkit button, input, toggle and slider components", caption: "Every component documents its keyboard behaviour." },
      { src: fieldkitMobile, alt: "Fieldkit documentation on three phone screens", caption: "Docs are built with the components they document." },
    ],
    links: { live: "https://fieldkit.example.com", repo: "https://github.com/theomarlowe/fieldkit" },
    overview:
      "Fieldkit started as the internal system I built at Ducat and became an open-source library once other teams asked for it. It ships 38 components, design tokens for web and native, and documentation written for people who haven't read the source.",
    problem:
      "Most component libraries are either beautiful and inaccessible, or accessible and impossible to theme. Teams end up rebuilding the same dialog and combobox again and again.",
    solution:
      "Unstyled, accessible primitives paired with a token layer that compiles to CSS variables, Tailwind and native platforms. Themes are data, not overrides.",
    process: [
      { title: "Extract", text: "Pulled components out of production code where they had already been tested by real users." },
      { title: "Specify", text: "Wrote a behaviour spec per component based on the WAI-ARIA Authoring Practices." },
      { title: "Test", text: "Unit, interaction and screen reader tests for every release." },
      { title: "Document", text: "Live examples, keyboard maps and do/don't guidance for each component." },
    ],
    features: [
      "38 accessible components",
      "Tokens compiled to CSS, Tailwind, iOS and Android",
      "Zero-runtime theming with CSS variables",
      "Keyboard maps in every doc page",
    ],
    challenges: [
      {
        title: "The combobox",
        text: "It took four rewrites and testing with three screen readers to get async results, grouping and multi-select right together.",
      },
      {
        title: "Breaking changes",
        text: "Codemods ship with every major version, so upgrades take minutes instead of a sprint.",
      },
    ],
    results: {
      summary: "Numbers from the public repository and npm, September 2026.",
      metrics: [
        { value: "2.1k", label: "GitHub stars" },
        { value: "38", label: "Components" },
        { value: "AA", label: "WCAG 2.2 conformance" },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  const next = projects[(index + 1) % projects.length];
  if (!next) throw new Error("No projects defined in src/content/projects.ts");
  return next;
}
