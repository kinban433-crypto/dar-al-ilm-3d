"use client";

import { useState } from "react";

/** FAQ disclosure using the transitions.dev accordion recipe. */
export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-ink/20">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div
            key={item.q}
            data-open={expanded}
            className="t-acc group border-b border-ink/10"
          >
            <button
              type="button"
              className="t-acc-head flex w-full cursor-pointer list-none items-baseline gap-5 py-5 text-start"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="w-6 shrink-0 font-mono text-[9px] text-slate">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[15px] leading-snug text-ink/90">{item.q}</span>
              <span aria-hidden="true" className="t-acc-chevron text-brass">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6.5L8 10.5L12 6.5" />
                </svg>
              </span>
            </button>
            <div className="t-acc-panel">
              <div className="t-acc-panel-inner">
                <p className="max-w-[78ch] pb-6 ps-11 text-[13.5px] leading-[1.8] text-slate">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
