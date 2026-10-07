import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionary, type DictKey, type Lang } from "./dictionary";
import { langFromPath, localePath } from "./locale-path";

/** A string that exists in both languages — used by the data files. */
export type Localized = { ar: string; en: string };

type LanguageValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  isRTL: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Translate a dictionary key. */
  t: (key: DictKey) => string;
  /** Pick the active language out of a localized object. */
  L: (value: Localized) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

/**
 * The address decides the language — /en/… is English, everything else
 * Arabic — so a page always says the same thing to a reader and to Google.
 * It used to come from the browser's storage, which Google never has.
 * اللغة يحدّدها العنوان، فيرى الزائر وجوجل الصفحة نفسها.
 */
const pathWithoutBase = () => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const { pathname } = window.location;
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
};

const readInitialLang = (): Lang => (typeof window === "undefined" ? "ar" : langFromPath(pathWithoutBase()));

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // Switching language opens the same page at the other language's address.
  // تغيير اللغة يفتح الصفحة نفسها بعنوان اللغة الأخرى.
  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const { search, hash } = window.location;
      window.location.assign(`${base}${localePath(pathWithoutBase(), next)}${search}${hash}`);
    },
    [lang],
  );
  const toggleLang = useCallback(() => setLang(lang === "ar" ? "en" : "ar"), [lang, setLang]);

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isRTL: lang === "ar",
      setLang,
      toggleLang,
      t: (key: DictKey) => dictionary[key]?.[lang] ?? key,
      L: (val: Localized) => val?.[lang] ?? "",
    }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = (): LanguageValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
};

/** Format a price with the active locale's digits. */
export const formatPrice = (amount: number, lang: Lang, symbol = "$") =>
  lang === "ar"
    ? `${amount.toFixed(2).replace(/\.00$/, "")} ${symbol}`
    : `${symbol}${amount.toFixed(2).replace(/\.00$/, "")}`;
