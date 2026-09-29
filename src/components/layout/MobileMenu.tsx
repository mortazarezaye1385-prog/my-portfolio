"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";
import { site } from "@/content/site";
import { emailLink, socials } from "@/content/socials";
import { ease } from "@/lib/motion";
import { pad } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = "a[href], button:not([disabled])";

export function MobileMenu({ open, onClose, toggleRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      // Keep focus inside the menu (plus the close button in the header).
      const items = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el): el is HTMLElement => el !== null,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open, onClose, toggleRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 -z-10 flex flex-col bg-bg pb-8 pt-28 md:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: ease.outExpo }}
        >
          <nav aria-label="Mobile" className="container-x flex-1">
            <ul className="border-t border-line">
              {site.nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: reduce ? 0 : "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: ease.outExpo, delay: 0.12 + i * 0.05 }}
                  >
                    <Link
                      href={`/#${item.id}`}
                      onClick={onClose}
                      className="flex items-baseline justify-between py-4 font-display text-[2.5rem] font-semibold leading-none tracking-[-0.035em] [font-stretch:110%] active:text-accent"
                    >
                      {item.label}
                      <span className="meta">{pad(i + 1)}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x flex items-end justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="space-y-3">
              <a href={emailLink.href} className="block text-lg underline decoration-line-strong underline-offset-4">
                {site.email}
              </a>
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="meta hover:text-fg">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ThemeToggle />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
