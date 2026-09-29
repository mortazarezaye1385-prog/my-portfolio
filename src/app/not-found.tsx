import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
      <p className="eyebrow">
        <span className="text-accent">404</span> / Not found
      </p>
      <h1 className="display-1 mt-6">
        Flatlined<span className="text-accent">.</span>
      </h1>
      <p className="lead mt-8 max-w-[40ch] text-muted">This page doesn&apos;t exist, or it moved. The work is still where you left it.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/#work" variant="secondary">
          See projects
        </ButtonLink>
      </div>
    </section>
  );
}
