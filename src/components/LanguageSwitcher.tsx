"use client";

import { LOCALES, LOCALE_NAMES } from "@/i18n/translations";
import { useLocale } from "@/i18n/LocaleProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      data-lang-switcher
      className="glass fixed right-3 top-3 z-[60] flex items-center gap-0.5 border border-[#111622]/12 bg-[#F6F3EC]/90 p-1 backdrop-blur-md sm:right-5 sm:top-5"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(code)}
            dir={code === "ar" ? "rtl" : "ltr"}
            className={`px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors sm:px-3 ${
              active ? "bg-brass text-ink" : "text-ink/70 hover:text-brass"
            }`}
          >
            {LOCALE_NAMES[code]}
          </button>
        );
      })}
    </div>
  );
}
