"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_THEME, readTheme, writeTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => DEFAULT_THEME);
  const setTheme = useCallback((next: Theme) => writeTheme(next), []);
  return { theme, setTheme };
}
