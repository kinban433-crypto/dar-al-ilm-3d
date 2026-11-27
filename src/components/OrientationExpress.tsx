"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { ProgrammeEntry } from "@/i18n/translations";

const SLOT: Record<string, { day: number; time: number }> = {
  "Semaine en soirée": { day: 0, time: 8 },
  "Samedi intensif": { day: 5, time: 1 },
  Flexible: { day: 0, time: 1 },
  "Evenings on weekdays": { day: 0, time: 8 },
  "Intensive Saturday": { day: 5, time: 1 },
  "Abends unter der Woche": { day: 0, time: 8 },
  "Intensiv am Samstag": { day: 5, time: 1 },
  "أمساء أيام الأسبوع": { day: 0, time: 8 },
  "السبت المكثف": { day: 5, time: 1 },
};

function Step({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass">{title}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onSelect(option)}
            className={`border px-3 py-2 text-start font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] transition-colors ${
              value === option
                ? "border-brass bg-navy text-limestone"
                : "border-ink/15 bg-limestone/70 text-ink/80 hover:border-brass hover:text-brass"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function OrientationExpress() {
  const { t, locale } = useLocale();
  const [objectif, setObjectif] = useState("");
  const [niveau, setNiveau] = useState("");
  const [disponibilite, setDisponibilite] = useState("");

  const { objectives, levels, availabilities } = t.orientation;

  const matches = useMemo(() => {
    const byCode = (code: string) => t.programmes.find((p) => p.code === code)!;
    const o = objectives.indexOf(objectif);
    const n = levels.indexOf(niveau);
    if (o === 0) return [byCode("DE-A1B2")];
    if (o === 1) return n === 3 ? [byCode("FR-TCF"), byCode("EN-IELTS")] : [byCode("EN-IELTS"), byCode("FR-TCF")];
    if (o === 2) return n === 2 ? [byCode("BAC-2SM")] : [byCode("BAC-2SVT"), byCode("BAC-2ECO")];
    if (o === 3) return [byCode("BAC-1REG")];
    return [] as ProgrammeEntry[];
  }, [objectif, niveau, t, objectives, levels]);

  const slotIndex = availabilities.indexOf(disponibilite);
  const slot = slotIndex >= 0 ? SLOT[disponibilite] : undefined;
  const ready = matches.length > 0 && Boolean(slot);
  const primary = ready ? matches[0] : null;

  // Reset selections when the language changes so option values stay in the active dictionary.
  useEffect(() => {
    setObjectif("");
    setNiveau("");
    setDisponibilite("");
  }, [locale]);

  return (
    <div className="mt-8 w-full border-t border-ink/10 pt-7">
      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-brass">{t.orientation.eyebrow}</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        <Step title={t.orientation.steps[0]} options={objectives} value={objectif} onSelect={setObjectif} />
        <Step title={t.orientation.steps[1]} options={levels} value={niveau} onSelect={setNiveau} />
        <Step title={t.orientation.steps[2]} options={availabilities} value={disponibilite} onSelect={setDisponibilite} />
      </div>

      {ready && primary && slot && (
        <div className="glass mt-7 flex flex-wrap items-center justify-between gap-6 border border-brass/40 bg-[#F6F3EC]/90 p-6 backdrop-blur-md" aria-live="polite">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.orientation.recommendation}</p>
            <p className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight">
              <span data-ltr>{primary.code}</span> <span className="text-navy">— {primary.title}</span>
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate">
              <span data-ltr>{primary.hours} · {primary.price}</span>
            </p>
            {matches.length > 1 && (
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate/80">
                {t.orientation.otherOptions} <span data-ltr>{matches.slice(1).map((m) => m.code).join(" · ")}</span>
              </p>
            )}
          </div>
          <button
            type="button"
            data-booking
            data-magnetic
            data-module={primary.code}
            data-day={t.modal.days[slot.day]}
            data-time={t.modal.times[slot.time]}
            data-context={disponibilite}
            className="bg-navy px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-brass hover:text-ink"
          >
            {t.diagnostic.cta}
          </button>
        </div>
      )}
    </div>
  );
}
