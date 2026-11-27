"use client";

/**
 * Dar Al-Ilm Académie — Interactive 3D Study Dossier Globe Hero
 *
 * One self-contained component: CSS 3D only (perspective / preserve-3d /
 * translate3d / rotateY / rotateX). No WebGL, no shaders, no video.
 * The orbital ring runs from a single requestAnimationFrame loop that writes
 * transform strings directly to the DOM — React never re-renders per frame.
 */

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/translations";
import { BRAND, whatsappHref } from "@/lib/content";

/* ------------------------------------------------------------------ *
 * Local helpers (kept inside the file so the hero stays self-contained)
 * ------------------------------------------------------------------ */
function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/* ------------------------------------------------------------------ *
 * Copy — every visible string, including the book UI, is localized.
 * Main H1/subtitle/buttons come from the existing site dictionary (t.hero).
 * ------------------------------------------------------------------ */
type Copy = {
  eyebrow: string;
  spinHint: string;
  openHint: string;
  countLabel: string;
  dossierWord: string;
  book: {
    programme: string;
    calendar: string;
    tariff: string;
    weekly: string;
    exam: string;
    group: string;
    evening: string;
    saturday: string;
    address: string;
    monthly: string;
    noCommitment: string;
    free: string;
    prev: string;
    next: string;
    close: string;
    enroll: string;
    direct: string;
    directMessage: string;
    openCover: string;
    pageLabel: string;
    ariaDossier: string;
    ariaGlobe: string;
  };
};

const COPY: Record<Locale, Copy> = {
  fr: {
    eyebrow: "12 DOSSIERS · 12 ÉCHÉANCES",
    spinHint: "Glissez ou faites défiler pour faire tourner le globe",
    openHint: "Cliquez sur un dossier pour l’ouvrir comme un livre",
    countLabel: "12 dossiers physiques, une seule bibliothèque",
    dossierWord: "Dossier",
    book: {
      programme: "Programme & objectifs", calendar: "Calendrier & créneaux", tariff: "Tarif & inscription",
      weekly: "Volume horaire", exam: "Examen visé", group: "Effectif",
      evening: "Soir · 18h30 – 20h30", saturday: "Samedi intensif · 09h – 17h",
      address: "Bd Zerktouni, Maârif, Casablanca", monthly: "par mois",
      noCommitment: "Sans engagement annuel", free: "Gratuit · 45 min",
      prev: "Page précédente", next: "Page suivante", close: "Fermer le dossier",
      enroll: "Réserver ce programme sur WhatsApp", direct: "Écrire directement sur WhatsApp",
      directMessage: "Bonjour, je souhaite des informations sur le module {code}.",
      openCover: "Ouvrir le dossier", pageLabel: "Page {n} sur 3",
      ariaDossier: "Ouvrir le dossier {code}", ariaGlobe: "Globe de dossiers interactif",
    },
  },
  en: {
    eyebrow: "12 DOSSIERS · 12 DEADLINES",
    spinHint: "Drag or scroll to spin the globe",
    openHint: "Click a dossier to open it like a book",
    countLabel: "12 physical dossiers, one single library",
    dossierWord: "Dossier",
    book: {
      programme: "Programme & goals", calendar: "Calendar & time slots", tariff: "Fee & enrolment",
      weekly: "Weekly hours", exam: "Target exam", group: "Group size",
      evening: "Evening · 18:30 – 20:30", saturday: "Saturday intensive · 09:00 – 17:00",
      address: "Bd Zerktouni, Maârif, Casablanca", monthly: "per month",
      noCommitment: "No annual commitment", free: "Free · 45 min",
      prev: "Previous page", next: "Next page", close: "Close the dossier",
      enroll: "Book this programme on WhatsApp", direct: "Message us on WhatsApp",
      directMessage: "Hello, I would like details about module {code}.",
      openCover: "Open the dossier", pageLabel: "Page {n} of 3",
      ariaDossier: "Open dossier {code}", ariaGlobe: "Interactive dossier globe",
    },
  },
  de: {
    eyebrow: "12 MAPPE · 12 TERMINE",
    spinHint: "Ziehen oder scrollen, um den Globus zu drehen",
    openHint: "Klicken Sie auf eine Mappe, um sie wie ein Buch zu öffnen",
    countLabel: "12 physische Mappen, eine einzige Bibliothek",
    dossierWord: "Mappe",
    book: {
      programme: "Programm & Ziele", calendar: "Kalender & Termine", tariff: "Gebühr & Anmeldung",
      weekly: "Wochenstunden", exam: "Zielprüfung", group: "Gruppengröße",
      evening: "Abend · 18:30 – 20:30", saturday: "Samstag intensiv · 09:00 – 17:00",
      address: "Bd Zerktouni, Maârif, Casablanca", monthly: "pro Monat",
      noCommitment: "Keine Jahresbindung", free: "Gratis · 45 Min.",
      prev: "Vorherige Seite", next: "Nächste Seite", close: "Mappe schließen",
      enroll: "Programm auf WhatsApp buchen", direct: "Direkt auf WhatsApp schreiben",
      directMessage: "Guten Tag, ich möchte Informationen zum Modul {code}.",
      openCover: "Mappe öffnen", pageLabel: "Seite {n} von 3",
      ariaDossier: "Mappe {code} öffnen", ariaGlobe: "Interaktiver Mappen-Globus",
    },
  },
  ar: {
    eyebrow: "١٢ ملفاً · ١٢ موعداً",
    spinHint: "اسحب أو مرّر لتدوير الكرة الأرضية",
    openHint: "انقر على ملف لفتحه مثل الكتاب",
    countLabel: "١٢ ملفاً حقيقياً، مكتبة واحدة",
    dossierWord: "ملف",
    book: {
      programme: "البرنامج والأهداف", calendar: "الجدول والمواعيد", tariff: "الرسوم والتسجيل",
      weekly: "الساعات الأسبوعية", exam: "الاختبار المستهدف", group: "عدد التلاميذ",
      evening: "مساءً · ١٨:٣٠ – ٢٠:٣٠", saturday: "سبت مكثف · ٠٩:٠٠ – ١٧:٠٠",
      address: "بولفار زركتوني، المعاريف، الدار البيضاء", monthly: "شهرياً",
      noCommitment: "بدون التزام سنوي", free: "مجاني · ٤٥ دقيقة",
      prev: "الصفحة السابقة", next: "الصفحة التالية", close: "إغلاق الملف",
      enroll: "احجز هذا البرنامج على واتساب", direct: "راسلنا مباشرة على واتساب",
      directMessage: "مرحباً، أود الحصول على معلومات عن الوحدة {code}.",
      openCover: "فتح الملف", pageLabel: "صفحة {n} من 3",
      ariaDossier: "فتح الملف {code}", ariaGlobe: "كرة ملفات تفاعلية",
    },
  },
};

/* ------------------------------------------------------------------ *
 * The twelve dossiers — exact programme codes, titles and MAD prices.
 * ------------------------------------------------------------------ */
type Family = "langues" | "bac" | "diagnostic";
type Dossier = {
  code: string;
  family: Family;
  range: string;
  price: string;
  free?: boolean;
  name: Record<Locale, string>;
  accent: string;
};

const DOSSIERS: Dossier[] = [
  {
    code: "DE-A1", family: "langues", range: "6–8", price: "650 MAD/mois", accent: "#C59B48",
    name: {
      fr: "Allemand Débutant · Goethe A1", en: "German Beginner · Goethe A1",
      de: "Deutsch Anfänger · Goethe A1", ar: "الألمانية للمبتدئين · غوته A1",
    },
  },
  {
    code: "DE-A2", family: "langues", range: "6–8", price: "700 MAD/mois", accent: "#C59B48",
    name: {
      fr: "Allemand Élémentaire · Goethe A2", en: "German Elementary · Goethe A2",
      de: "Deutsch Grundstufe · Goethe A2", ar: "الألمانية الأساسية · غوته A2",
    },
  },
  {
    code: "DE-B1", family: "langues", range: "8–10", price: "750 MAD/mois", accent: "#C59B48",
    name: {
      fr: "Allemand Certifié · Goethe-Zertifikat B1", en: "Certified German · Goethe-Zertifikat B1",
      de: "Zertifiziertes Deutsch · Goethe-Zertifikat B1", ar: "الألمانية المعتمدة · شهادة غوته B1",
    },
  },
  {
    code: "DE-B2", family: "langues", range: "8–10", price: "850 MAD/mois", accent: "#C59B48",
    name: {
      fr: "Allemand Académique & Ausbildung B2", en: "Academic German & Ausbildung B2",
      de: "Akademisches Deutsch & Ausbildung B2", ar: "الألمانية الأكاديمية والتكوين المهني B2",
    },
  },
  {
    code: "EN-IELTS", family: "langues", range: "6–8", price: "800 MAD/mois", accent: "#1B365D",
    name: {
      fr: "English Academic · IELTS Band 7.5+", en: "English Academic · IELTS Band 7.5+",
      de: "Akademisches Englisch · IELTS Band 7.5+", ar: "الإنجليزية الأكاديمية · IELTS 7.5+",
    },
  },
  {
    code: "FR-TCF", family: "langues", range: "6–8", price: "700 MAD/mois", accent: "#1B365D",
    name: {
      fr: "Français Intensif · TCF Canada / DAP", en: "Intensive French · TCF Canada / DAP",
      de: "Intensiv-Französisch · TCF Canada / DAP", ar: "الفرنسية المكثفة · TCF كندا / DAP",
    },
  },
  {
    code: "BAC-2SM", family: "bac", range: "8–10", price: "900 MAD/mois", accent: "#0F3D2E",
    name: {
      fr: "2ème Bac Sciences Maths A & B", en: "Final-year Bac Maths A & B",
      de: "Bac Klasse 12 Mathematik A & B", ar: "بكالوريا ٢ علوم رياضيات أ و ب",
    },
  },
  {
    code: "BAC-2PC", family: "bac", range: "6–8", price: "850 MAD/mois", accent: "#0F3D2E",
    name: {
      fr: "2ème Bac Sciences Physiques", en: "Final-year Bac Physical Sciences",
      de: "Bac Klasse 12 Physik", ar: "بكالوريا ٢ علوم فيزيائية",
    },
  },
  {
    code: "BAC-2SVT", family: "bac", range: "6–8", price: "800 MAD/mois", accent: "#0F3D2E",
    name: {
      fr: "2ème Bac Sciences de la Vie et de la Terre", en: "Final-year Bac Life & Earth Sciences",
      de: "Bac Klasse 12 Biologie", ar: "بكالوريا ٢ علوم الحياة والأرض",
    },
  },
  {
    code: "BAC-2ECO", family: "bac", range: "6–8", price: "800 MAD/mois", accent: "#0F3D2E",
    name: {
      fr: "2ème Bac Sciences Économiques & Gestion", en: "Final-year Bac Economics & Management",
      de: "Bac Klasse 12 Wirtschaft", ar: "بكالوريا ٢ الاقتصاد والتسيير",
    },
  },
  {
    code: "BAC-1REG", family: "bac", range: "6", price: "650 MAD/mois", accent: "#0F3D2E",
    name: {
      fr: "1ère Bac Examen Régional (FR / HG / EI)", en: "Regional Bac Year 11 (FR / HG / EI)",
      de: "Regional-Bac Klasse 11 (FR / HG / EI)", ar: "بكالوريا جهوية ١ (فرنسية / تاريخ / إنجليزية)",
    },
  },
  {
    code: "DIAG-45", family: "diagnostic", range: "0", price: "Gratuit · 45 min", free: true, accent: "#C59B48",
    name: {
      fr: "Bilan d’Orientation & Test de Niveau", en: "Guidance Review & Level Test",
      de: "Orientierungsgespräch & Niveautest", ar: "توجيه واختبار تحديد المستوى",
    },
  },
];

const STEP = 360 / DOSSIERS.length;
const PAGES = 3;

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */
export default function DarAlIlmGlobeHero() {
  const { t, locale } = useLocale();
  const copy = COPY[locale];
  const rtl = locale === "ar";
  const dirFactor = rtl ? -1 : 1;

  const [radius, setRadius] = useState(360);
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [opened, setOpened] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dragging, setDragging] = useState(false);

  const globeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const velocity = useRef(0);
  const tilt = useRef(-7);
  const tiltTarget = useRef(-7);
  const pointerDown = useRef(false);
  const dragged = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const releaseTimer = useRef(0);

  /* Responsive orbit radius — measured once, updated on resize only. */
  useEffect(() => {
    const measure = () => {
      const width = globeRef.current?.clientWidth ?? 600;
      setRadius(clamp(width * (width < 520 ? 0.38 : 0.42), 150, 420));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (globeRef.current) observer.observe(globeRef.current);
    return () => observer.disconnect();
  }, []);

  /* Reduced-motion preference. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  /* The single animation loop: auto-spin + inertial damping + tilt easing. */
  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const loop = (now: number) => {
      const delta = clamp((now - previous) / 16.667, 0.25, 3);
      previous = now;

      if (!pointerDown.current) {
        const autoSpin = selected === null && !reduced ? 0.14 : 0;
        angle.current += (autoSpin + velocity.current) * delta;
        velocity.current *= Math.pow(0.94, delta);
        if (Math.abs(velocity.current) < 0.0005) velocity.current = 0;
      }
      tilt.current += (tiltTarget.current - tilt.current) * 0.08 * delta;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(0,0,0) rotateX(${tilt.current.toFixed(2)}deg) ` +
          `rotateY(${(angle.current * dirFactor).toFixed(2)}deg)`;
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [selected, reduced, dirFactor]);

  /* Wheel impulse — passive, so the page still scrolls normally. */
  useEffect(() => {
    const element = globeRef.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      if (selected !== null) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      velocity.current = clamp(velocity.current + delta * 0.012, -9, 9);
    };
    element.addEventListener("wheel", onWheel, { passive: true });
    return () => element.removeEventListener("wheel", onWheel);
  }, [selected]);

  /* Escape closes the book. Arrow keys flip its pages. */
  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBook();
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        setPage((current) => clamp(current + (event.key === "ArrowRight" ? 1 : -1), 0, PAGES - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("[data-dossier]")) return;
    pointerDown.current = true;
    dragged.current = false;
    lastX.current = event.clientX;
    lastY.current = event.clientY;
    velocity.current = 0;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointerDown.current) return;
    const dx = event.clientX - lastX.current;
    const dy = event.clientY - lastY.current;
    lastX.current = event.clientX;
    lastY.current = event.clientY;
    if (Math.abs(dx) + Math.abs(dy) > 2) dragged.current = true;
    angle.current += dx * 0.24 * dirFactor;
    velocity.current = clamp(dx * 0.24, -9, 9);
    tiltTarget.current = clamp(-7 + dy * 0.05, -18, 10);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => {
      dragged.current = false;
    }, 60);
  }

  function openDossier(index: number) {
    if (dragged.current) return;
    velocity.current = 0;
    setSelected(index);
    setPage(0);
    setOpened(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setOpened(true)));
  }

  function closeBook() {
    setOpened(false);
    window.setTimeout(() => setSelected(null), reduced ? 0 : 300);
  }

  const activeDossier = selected === null ? null : DOSSIERS[selected];
  const cardWidth = radius < 240 ? 116 : 156;
  const cardHeight = cardWidth * 1.42;

  return (
    <section
      data-act="0"
      className="relative overflow-hidden border-b border-ink/10 bg-limestone/40"
      aria-label={copy.book.ariaGlobe}
    >
      <div className="shell relative grid min-h-[92vh] gap-10 py-28 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:items-center md:py-32">
        {/* ── Editorial framing ─────────────────────────────────────── */}
        <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass">
            {t.brand.mark} · {copy.eyebrow}
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.98] tracking-[-0.04em]">
            {t.hero.title[0]}
            <br />
            <span className="italic text-navy">{t.hero.title[1]}</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-[14px] leading-[1.8] text-slate">{t.hero.subtitle}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#programmes"
              className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-brass hover:text-ink"
            >
              {t.hero.primary}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d={rtl ? "M10 4L6 8L10 12" : "M6 4L10 8L6 12"} />
              </svg>
            </a>
            <button
              type="button"
              data-booking
              className="border border-ink/25 px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-brass hover:text-brass"
            >
              {t.hero.secondary}
            </button>
          </div>

          <div className="mt-10 grid max-w-[520px] grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-4">
            {t.metrics.map((metric) => (
              <div key={metric.label} className="bg-limestone px-4 py-3.5">
                <p className="font-display text-[1.7rem] leading-none tracking-[-0.02em]">
                  <span data-ltr>{metric.value}</span>
                  <span className="text-brass">{metric.suffix ?? ""}</span>
                </p>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-slate">{metric.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 flex items-start gap-2 font-mono text-[9px] uppercase leading-[1.9] tracking-[0.14em] text-slate">
            <span className="mt-1.5 h-px w-6 shrink-0 bg-brass" />
            <span>{copy.spinHint}<br />{copy.openHint}</span>
          </p>
        </div>

        {/* ── The orbital ring ──────────────────────────────────────── */}
        <div
          ref={globeRef}
          className={cx(
            "relative h-[min(72vh,660px)] min-h-[440px] w-full select-none",
            dragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{ perspective: "1400px", touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brass/25"
          />

          <div
            ref={ringRef}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {DOSSIERS.map((dossier, index) => {
              const active = selected === index;
              return (
                <button
                  key={dossier.code}
                  type="button"
                  data-dossier
                  onClick={() => openDossier(index)}
                  aria-label={copy.book.ariaDossier.replace("{code}", dossier.code)}
                  className={cx(
                    "absolute left-1/2 top-1/2 flex flex-col justify-between overflow-hidden border bg-limestone p-3.5 text-start shadow-[0_18px_40px_-28px_rgba(17,22,34,0.55)]",
                    active ? "border-brass opacity-35" : "border-ink/20 hover:border-brass"
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    marginLeft: -cardWidth / 2,
                    marginTop: -cardHeight / 2,
                    transform: `rotateY(${index * STEP}deg) translate3d(0,0,${radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    transition: "border-color 200ms ease, opacity 200ms ease",
                  }}
                >
                  {/* brass spine */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 start-0 w-[7px]"
                    style={{ background: dossier.accent }}
                  />
                  <span className="ps-2">
                    <span data-ltr className="block font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
                      {dossier.code}
                    </span>
                    <span className="mt-3 block font-display text-[clamp(14px,1.35vw,19px)] leading-tight text-ink">
                      {dossier.name[locale]}
                    </span>
                  </span>
                  <span className="ps-2">
                    <span className="block h-px w-full bg-ink/15" />
                    <span data-ltr className="mt-2.5 block font-mono text-[9px] tracking-[0.08em] text-ink/70">
                      {dossier.free ? copy.book.free : dossier.price}
                    </span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.12em] text-slate">
                      {copy.dossierWord} · {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="pointer-events-none absolute bottom-0 start-0 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">
            {copy.countLabel}
          </p>
        </div>
      </div>

      {/* ── Ticker, preserved from the original hero header ──────────── */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 overflow-hidden bg-navy py-4">
        <div className="ticker-track">
          {[0, 1].map((duplicate) => (
            <span key={duplicate} dir="ltr" className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-limestone/90">
              {t.ticker}&nbsp;&nbsp;{t.ticker}&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Open dossier: hinged hardcover + three interior pages ────── */}
      {activeDossier && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeDossier.name[locale]}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            onClick={closeBook}
            aria-label={copy.book.close}
            tabIndex={-1}
          />

          <div
            className="relative z-10 w-full max-w-[560px]"
            style={{ perspective: "1800px" }}
          >
            <div
              className="relative mx-auto"
              style={{
                width: "min(88vw, 500px)",
                height: "min(70vh, 600px)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* back board */}
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-ink/25 bg-[#E7E1D4]"
                style={{
                  transform: `translate3d(${rtl ? 8 : -8}px, 10px, -14px)`,
                  boxShadow: "0 34px 70px -36px rgba(17,22,34,0.75)",
                }}
              />

              {/* three interior pages */}
              {[0, 1, 2].map((index) => {
                const turned = index < page;
                const current = index === page;
                const hinge = rtl ? "right center" : "left center";
                const angleDeg = turned ? (rtl ? 180 : -180) : 0;
                return (
                  <div
                    key={index}
                    className="absolute inset-0 border border-ink/15 bg-limestone p-6 backface-hidden sm:p-8"
                    style={{
                      transformOrigin: hinge,
                      transform: `translate3d(0,0,${(PAGES - index) * 0.7}px) rotateY(${angleDeg}deg)`,
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      transition: reduced ? "none" : "transform 780ms cubic-bezier(.22,1,.36,1)",
                    }}
                  >
                    {current && (
                      <div className="flex h-full flex-col" data-ltr={index === 2}>
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-brass">
                          {activeDossier.code} · {index === 0 ? copy.book.programme : index === 1 ? copy.book.calendar : copy.book.tariff}
                        </p>

                        {index === 0 && (
                          <>
                            <h2 className="mt-7 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink">
                              {activeDossier.name[locale]}
                            </h2>
                            <dl className="mt-auto border-t border-ink/15 text-[13px]">
                              <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5">
                                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate">{copy.book.weekly}</dt>
                                <dd data-ltr className="font-mono text-[11px] text-ink">{activeDossier.range} h / sem.</dd>
                              </div>
                              <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5">
                                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate">{copy.book.exam}</dt>
                                <dd className="max-w-[62%] text-end text-[12px] text-ink">{activeDossier.name[locale]}</dd>
                              </div>
                              <div className="flex items-baseline justify-between gap-4 py-3.5">
                                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate">{copy.book.group}</dt>
                                <dd data-ltr className="font-mono text-[11px] text-emerald-900">≤ 12</dd>
                              </div>
                            </dl>
                          </>
                        )}

                        {index === 1 && (
                          <>
                            <h2 className="mt-7 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink">
                              {copy.book.calendar}
                            </h2>
                            <div className="mt-auto border-t border-ink/15">
                              <p className="border-b border-ink/10 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
                                {copy.book.evening}
                              </p>
                              <p className="border-b border-ink/10 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
                                {copy.book.saturday}
                              </p>
                              <p className="py-4 text-[12.5px] leading-relaxed text-slate">{copy.book.address}</p>
                            </div>
                          </>
                        )}

                        {index === 2 && (
                          <>
                            <h2 className="mt-7 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink">
                              {copy.book.tariff}
                            </h2>
                            <p data-ltr className="mt-auto font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ink">
                              {activeDossier.free ? copy.book.free : activeDossier.price}
                            </p>
                            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate">
                              {activeDossier.free ? "" : copy.book.monthly} · {copy.book.noCommitment}
                            </p>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                data-booking
                                data-module={activeDossier.code}
                                data-context={activeDossier.name[locale]}
                                className="bg-navy px-5 py-3.5 font-mono text-[9px] uppercase tracking-[0.16em] text-limestone transition-colors hover:bg-brass hover:text-ink"
                              >
                                {copy.book.enroll}
                              </button>
                              <a
                                href={whatsappHref(
                                  copy.book.directMessage.replace("{code}", activeDossier.code)
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[9px] uppercase tracking-[0.14em] text-brass hover:text-ink"
                              >
                                {copy.book.direct} ↗
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* spine with real depth */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 w-[14px] bg-[#8A6B33]"
                style={{
                  [rtl ? "right" : "left"]: 0,
                  transformOrigin: rtl ? "right center" : "left center",
                  transform: `rotateY(${rtl ? 90 : -90}deg) translateZ(7px)`,
                }}
              />

              {/* hinged cover */}
              <div
                className="absolute inset-0 flex flex-col justify-between border border-ink/25 bg-[#EFE9DB] p-6 sm:p-8"
                style={{
                  transformOrigin: rtl ? "right center" : "left center",
                  transform: opened
                    ? `rotateY(${rtl ? 165 : -165}deg)`
                    : "rotateY(0deg)",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  transition: reduced ? "none" : "transform 900ms cubic-bezier(.22,1,.36,1)",
                  boxShadow: "inset 0 0 0 6px rgba(197,155,72,0.14)",
                }}
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-brass">
                    {t.brand.mark} · {BRAND.address}
                  </p>
                  <p data-ltr className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
                    {activeDossier.code}
                  </p>
                  <h3 className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.05] text-ink">
                    {activeDossier.name[locale]}
                  </h3>
                </div>
                <div className="border-t border-ink/15 pt-5">
                  <p data-ltr className="font-mono text-[11px] text-ink">
                    {activeDossier.free ? copy.book.free : activeDossier.price}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
                    {copy.book.openCover} →
                  </p>
                </div>
              </div>
            </div>

            {/* page controls */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage((current) => clamp(current - 1, 0, PAGES - 1))}
                disabled={page === 0}
                aria-label={copy.book.prev}
                className="border border-ink/20 bg-limestone px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-brass disabled:opacity-30"
              >
                ← {copy.book.prev}
              </button>
              <span data-ltr className="font-mono text-[10px] tracking-[0.16em] text-slate">
                {copy.book.pageLabel.replace("{n}", String(page + 1))}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => clamp(current + 1, 0, PAGES - 1))}
                disabled={page === PAGES - 1}
                aria-label={copy.book.next}
                className="border border-ink/20 bg-limestone px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-brass disabled:opacity-30"
              >
                {copy.book.next} →
              </button>
              <button
                type="button"
                onClick={closeBook}
                aria-label={copy.book.close}
                className="border border-ink/20 bg-limestone px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-brass"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
