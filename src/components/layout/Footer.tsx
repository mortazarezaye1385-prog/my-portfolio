import Link from "next/link";
import { site } from "@/content/site";
import { socials } from "@/content/socials";
import { Logo } from "@/components/ui/Logo";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x grid gap-12 pb-10 pt-16 md:grid-cols-12 md:gap-8 md:pt-20">
        <div className="space-y-5 md:col-span-5">
          <Logo />
          <p className="max-w-[34ch] text-muted">{site.footerStatement}</p>
          <p className="meta flex items-center gap-2.5">
            <span className="pulse-dot" aria-hidden="true" />
            {site.availability}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
          <p className="eyebrow mb-4">Index</p>
          <ul className="space-y-2">
            {site.nav.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className="text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2">
            {socials.map((social) => (
              <li key={social.platform}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1 md:col-start-12 md:justify-self-end">
          <BackToTop />
        </div>
      </div>

      <p
        aria-hidden="true"
        className="container-x select-none whitespace-nowrap font-display text-[clamp(4.5rem,19vw,19rem)] font-extrabold leading-[0.78] tracking-[-0.06em] text-raised [font-stretch:118%]"
      >
        {site.name.split(" ").at(-1)}
      </p>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="meta">Built with React &amp; Next.js</p>
        </div>
      </div>
    </footer>
  );
}
