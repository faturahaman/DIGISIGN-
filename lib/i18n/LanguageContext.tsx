"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Language } from "./translations";

// Derive a mutable (non-readonly, non-literal) version of the translations shape
type DeepMutable<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T[K] extends object
    ? DeepMutable<T[K]>
    : string;
};

export type Translations = DeepMutable<typeof translations["id"]>;

interface LanguageContextValue {
  lang: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("id");

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLanguage, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
