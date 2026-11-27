"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { BRAND, whatsappHref } from "@/lib/content";
import { useLocale } from "@/i18n/LocaleProvider";

export default function BookingModal() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [context, setContext] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-booking]");
      if (!trigger) return;
      setCode(trigger.dataset.module || "");
      setDay(trigger.dataset.day || t.modal.days[0]);
      setTime(trigger.dataset.time || t.modal.times[1]);
      setContext(trigger.dataset.context || "");
      setOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [t.modal.days, t.modal.times]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const programme = t.programmes.find((p) => p.code === code);
  const message = t.modal.message({
    module: programme ? `${programme.code} — ${programme.title}` : undefined,
    day: day || t.modal.days[0],
    time: time || t.modal.times[1],
    availability: context,
  });

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center p-5 transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button aria-label="Fermer" className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="glass relative w-full max-w-lg p-7 shadow-2xl md:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-brass">{t.modal.eyebrow}</p>
            <h2 id="booking-title" className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.03em]">
              {t.modal.title}
            </h2>
          </div>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="border border-ink/15 p-2 text-ink transition-colors hover:border-brass hover:text-brass" tabIndex={open ? 0 : -1}>
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-6 text-[14px] leading-[1.7] text-slate">{t.modal.body}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.modal.moduleLabel}</span>
            <select value={code} onChange={(e) => setCode(e.target.value)} className="border border-ink/15 bg-limestone/60 px-3 py-3 text-[13px] text-ink outline-none focus:border-brass">
              <option value="">{t.modal.moduleDefault}</option>
              {t.programmes.map((p) => (
                <option key={p.code} value={p.code}>{p.code} — {p.title}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.modal.dayLabel}</span>
            <select value={day} onChange={(e) => setDay(e.target.value)} className="border border-ink/15 bg-limestone/60 px-3 py-3 text-[13px] text-ink outline-none focus:border-brass">
              {t.modal.days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.modal.timeLabel}</span>
            <select value={time} onChange={(e) => setTime(e.target.value)} className="border border-ink/15 bg-limestone/60 px-3 py-3 text-[13px] text-ink outline-none focus:border-brass">
              {t.modal.times.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-8 border-t border-ink/10 pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.modal.messageLabel}</p>
          <p dir="auto" className="mt-3 whitespace-pre-line font-mono text-[11px] leading-[1.8] text-ink/80">{message}</p>
        </div>

        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-8 block bg-navy px-6 py-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-limestone transition-colors hover:bg-brass hover:text-ink"
          tabIndex={open ? 0 : -1}
        >
          {t.modal.submit}
        </a>
        <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-slate">{BRAND.hours} · {BRAND.hoursNote}</p>
      </div>
    </div>
  );
}
