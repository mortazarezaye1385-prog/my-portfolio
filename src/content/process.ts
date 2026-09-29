import type { ProcessStep } from "@/types/content";

export const processSteps: ProcessStep[] = [
  { title: "Discover", description: "Goals, audience, constraints. What does success look like in numbers?" },
  { title: "Plan", description: "Architecture, content model and a scope with no surprises in it." },
  { title: "Design", description: "Prototypes in the browser, so we judge real motion and real content." },
  { title: "Build", description: "Typed components, weekly previews, performance budgets enforced in CI." },
  { title: "Refine", description: "Device testing, accessibility audits and the last 10% of polish." },
  { title: "Launch", description: "Deploy, monitor field data and hand over docs your team will read." },
];
