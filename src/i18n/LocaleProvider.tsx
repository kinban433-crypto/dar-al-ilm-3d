"use client";

import { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translations, type Dict, type Locale } from "./translations";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dict;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: translations.fr,
});

export const useLocale = () => useContext(LocaleContext);

export default function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dai-lang") as Locale | null;
      if (saved && translations[saved]) setLocale(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const rtl = locale === "ar";
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    try {
      localStorage.setItem("dai-lang", locale);
    } catch {}
    document.cookie = `dai-lang=${locale}; path=/; max-age=31536000; samesite=lax`;
    const refresh = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
    });
    return () => cancelAnimationFrame(refresh);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}
