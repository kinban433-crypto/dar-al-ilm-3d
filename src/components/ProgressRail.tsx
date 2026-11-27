"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/i18n/LocaleProvider";

export default function ProgressRail() {
  const fill = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { t } = useLocale();
  const acts = t.rail;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sections = acts.map((_, i) => document.querySelector<HTMLElement>(`[data-act="${i}"]`));

    const updateAct = () => {
      const line = window.innerHeight * 0.45;
      let next = 0;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= line) next = i;
      });
      setActive((current) => (current === next ? current : next));
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        updateAct();
        if (fill.current) fill.current.style.transform = `scaleY(${self.progress.toFixed(4)})`;
      },
    });
    updateAct();
    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      data-rail
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
    >
      <span
        className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-ink/75"
        style={{ writingMode: "vertical-rl" }}
      >
        {acts[active]}
      </span>
      <div className="relative h-40 w-px bg-ink/15">
        <div
          ref={fill}
          className="absolute inset-x-0 top-0 h-full origin-top bg-brass"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
      <span className="font-mono text-[9px] text-brass">0{active + 1}</span>
    </div>
  );
}
