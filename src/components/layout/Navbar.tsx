"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = site.nav.map((item) => item.id);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? sectionIds : []);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "container-x transition-transform duration-500 ease-out-expo",
          scrolled || menuOpen ? "translate-y-2" : "translate-y-5",
        )}
      >
        <nav aria-label="Primary" className="relative flex h-14 items-center justify-between gap-4 pl-3 pr-2 md:h-16 md:pl-4">
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -z-10 rounded-[3px] border border-line bg-bg/80 backdrop-blur-md transition-opacity duration-500 ease-out-expo",
              scrolled && !menuOpen ? "opacity-100" : "opacity-0",
            )}
          />
          <Logo compact={scrolled} />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative inline-flex h-10 items-center gap-2 px-3 text-sm transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1 rounded-full bg-accent transition-transform duration-500 ease-out-expo",
                        isActive ? "scale-100" : "scale-0",
                      )}
                    />
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-2 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden md:grid" />
            <ButtonLink href="/#contact" size="sm" magnetic className="hidden md:inline-flex">
              Let&apos;s Talk
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="relative grid size-11 place-items-center rounded-[2px] border border-line md:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-fg transition-transform duration-500 ease-out-expo",
                    menuOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-fg transition-transform duration-500 ease-out-expo",
                    menuOpen && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} toggleRef={menuButtonRef} />
    </header>
  );
}
