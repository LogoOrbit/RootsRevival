"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/i18n";
import { CartProvider } from "./CartProvider";

const THEME_KEY = "rootsrevival.theme";
const LANG_KEY = "rootsrevival.lang";

type Theme = "light" | "dark";

type SiteContextValue = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  rtl: boolean;
  ready: boolean;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  // Pick up the saved choice, or fall back to the language of the device.
  useEffect(() => {
    let nextLang: Lang = "en";
    let nextTheme: Theme = "light";
    try {
      const savedLang = window.localStorage.getItem(LANG_KEY);
      if (savedLang === "ur" || savedLang === "en") {
        nextLang = savedLang;
      } else {
        const languages = [
          ...(navigator.languages || []),
          navigator.language || "",
        ].map((value) => value.toLowerCase());
        if (languages.some((value) => value.startsWith("ur"))) nextLang = "ur";
      }
      const savedTheme = window.localStorage.getItem(THEME_KEY);
      if (savedTheme === "dark" || savedTheme === "light") nextTheme = savedTheme;
    } catch {
      /* storage can be blocked, the defaults still work */
    }
    setLangState(nextLang);
    setTheme(nextTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      lang,
      t: dictionaries[lang],
      setLang,
      theme,
      toggleTheme,
      rtl: lang === "ur",
      ready,
    }),
    [lang, setLang, theme, toggleTheme, ready]
  );

  return (
    <SiteContext.Provider value={value}>
      <CartProvider>{children}</CartProvider>
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}

/** Shorthand for the current dictionary. */
export function useT(): Dict {
  return useSite().t;
}
