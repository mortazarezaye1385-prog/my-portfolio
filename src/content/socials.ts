import type { SocialLink } from "@/types/content";
import { site } from "./site";

export const socials: SocialLink[] = [
  { platform: "github", label: "GitHub", handle: "@theomarlowe", href: "https://github.com/theomarlowe" },
  { platform: "linkedin", label: "LinkedIn", handle: "in/theomarlowe", href: "https://www.linkedin.com/in/theomarlowe" },
  { platform: "x", label: "X", handle: "@theomarlowe", href: "https://x.com/theomarlowe" },
  { platform: "dribbble", label: "Dribbble", handle: "theomarlowe", href: "https://dribbble.com/theomarlowe" },
];

export const emailLink: SocialLink = {
  platform: "email",
  label: "Email",
  handle: site.email,
  href: `mailto:${site.email}`,
};
