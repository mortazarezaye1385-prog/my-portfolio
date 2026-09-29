import { site } from "@/content/site";
import { emailLink, socials } from "@/content/socials";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLines } from "@/components/ui/RevealLines";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pb-28 pt-28 md:pb-40 md:pt-40">
      <div className="container-x">
        <Reveal y={8}>
          <p className="eyebrow border-t border-line pt-6">
            <span className="text-accent">07</span> / Contact
          </p>
        </Reveal>

        <h2 id="contact-title" className="display-1 mt-10 -ml-[0.04em] md:mt-14">
          <RevealLines
            lines={[
              "Have an idea?",
              <>
                Let&apos;s build it<span className="text-accent">.</span>
              </>,
            ]}
          />
        </h2>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <p className="lead max-w-[34ch] text-muted">
                Tell me what you&apos;re making, who it&apos;s for and when it needs to ship. Short messages are fine; I&apos;ll ask the right questions.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <p className="eyebrow">Email</p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <a
                  href={emailLink.href}
                  className="group relative font-display text-[clamp(1.375rem,2.6vw,2.125rem)] font-semibold tracking-[-0.025em] [font-stretch:106%]"
                >
                  {site.email}
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px bg-line-strong" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                  />
                </a>
                <CopyEmail email={site.email} />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-12">
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-3 border-t border-line">
                {socials.map((social) => (
                  <li key={social.platform} className="border-b border-line">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <BrandIcon platform={social.platform} className="size-4 text-muted transition-colors group-hover:text-accent" />
                      <span className="font-medium">{social.label}</span>
                      <span className="meta ml-auto hidden sm:inline">{social.handle}</span>
                      <AnimatedArrow direction="up-right" className="ml-auto sm:ml-0" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="meta mt-10 flex items-center gap-2.5">
                <span className="pulse-dot" aria-hidden="true" />
                {site.availability}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
