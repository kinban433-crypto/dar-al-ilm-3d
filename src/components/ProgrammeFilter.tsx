"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Dict } from "@/i18n/translations";

gsap.registerPlugin(Flip);

type Filter = keyof Dict["tabs"];

export default function ProgrammeFilter() {
  const [filter, setFilter] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);
  const snapshot = useRef<Flip.FlipState | null>(null);
  const { t } = useLocale();

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: t.tabs.all },
    { key: "langues", label: t.tabs.langues },
    { key: "bac", label: t.tabs.bac },
  ];
  const visible = filter === "all" ? t.programmes : t.programmes.filter((p) => p.family === filter);

  const changeFilter = (next: Filter) => {
    if (next === filter || !grid.current) return;
    snapshot.current = Flip.getState(Array.from(grid.current.children));
    setFilter(next);
  };

  useLayoutEffect(() => {
    const state = snapshot.current;
    if (!state || !grid.current) return;
    snapshot.current = null;
    Flip.from(state, {
      duration: 0.5,
      ease: "power3.inOut",
      absolute: true,
      scale: false,
      stagger: 0.025,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03 }),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, duration: 0.2 }),
    });
  }, [filter]);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filtrer les programmes"
        className="mt-9 flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const active = tab.key === filter;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => changeFilter(tab.key)}
              className={`border px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
                active
                  ? "border-brass bg-navy text-limestone"
                  : "border-ink/15 bg-[#F6F3EC]/90 text-ink/80 backdrop-blur-md hover:border-brass hover:text-brass"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div ref={grid} data-stagger="cards" className="mt-5 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-2">
        {visible.map((p) => (
          <button
            key={p.code}
            type="button"
            data-booking
            data-module={p.code}
            data-module-index={t.programmes.indexOf(p)}
            className="group bg-[#F6F3EC]/90 p-6 text-start backdrop-blur-md transition-colors hover:bg-limestone md:p-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span data-ltr className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass">{p.code}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate">{p.n}</span>
            </div>
            <h3 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{p.title}</h3>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate">{p.subtitle}</p>
            <p className="mt-4 max-w-[46ch] text-[13.5px] leading-relaxed text-slate">{p.description}</p>
            <div className="mt-7 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/10 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">{p.hours}</span>
              <span className="font-display text-[1.6rem] tracking-[-0.02em]">{p.price}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
