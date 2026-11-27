"use client";

import Experience from "@/components/Experience";
import OrientationExpress from "@/components/OrientationExpress";
import ProgrammeFilter from "@/components/ProgrammeFilter";
import { whatsappHref } from "@/lib/content";
import { useLocale } from "@/i18n/LocaleProvider";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.36em] text-brass">
      <span data-rule className="h-px w-8 origin-left bg-brass/60" /> {children}
    </p>
  );
}

export default function Home() {
  const { t } = useLocale();

  return (
    <Experience>
      {/* ACT I — Hero arrival */}
      <section data-act="0" className="relative flex min-h-screen items-center">
        <div className="shell relative w-full pt-28 pb-28">
          <div className="glass max-w-[460px] bg-[#F6F3EC]/90 p-7 backdrop-blur-md" data-reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass">
              {t.brand.mark} · 07 — {t.brand.eyebrow}
            </p>
            <h1 className="mt-7 font-display text-[clamp(2.3rem,3.8vw,3.6rem)] leading-[0.98] tracking-[-0.04em]">
              {t.hero.title[0]}
              <br />
              <span className="italic text-navy">{t.hero.title[1]}</span>
            </h1>
            <p className="mt-7 max-w-[44ch] text-[14px] leading-[1.75] text-slate">{t.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#programmes" data-magnetic className="bg-navy px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-brass hover:text-ink">
                {t.hero.primary}
              </a>
              <button type="button" data-booking data-magnetic className="border border-ink/25 px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-brass hover:text-brass">
                {t.hero.secondary}
              </button>
            </div>
          </div>

          <div data-reveal className="mt-8 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 backdrop-blur-md lg:absolute lg:right-6 lg:top-8 lg:mt-0 lg:w-[min(54vw,760px)] lg:grid-cols-4">
            {t.metrics.map((m) => (
              <div key={m.label} className="bg-[#F6F3EC]/90 px-5 py-4">
                <p className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none tracking-[-0.02em]">
                  <span data-ltr>{m.value}</span><span className="text-brass">{m.suffix ?? ""}</span>
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/80">{m.label}</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-slate">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 overflow-hidden bg-navy py-4">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <span key={copy} dir="ltr" className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-limestone/90">
                {t.ticker}&nbsp;&nbsp;{t.ticker}&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ACT II — Programmes */}
      <section id="programmes" data-act="1" className="relative py-28 md:py-36">
        <div className="shell">
          <div className="glass flex flex-wrap items-end justify-between gap-6 border-b border-ink/20 bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:p-8" data-reveal>
            <div>
              <Label>{t.sectionLabels.programmes}</Label>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.04em]">{t.sectionLabels.twoPaths}</h2>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.sectionLabels.chooseDeadline}</p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {t.families.map((f) => (
              <div key={f.title} data-reveal className="glass bg-[#F6F3EC]/90 p-7 backdrop-blur-md md:p-9">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[3rem] leading-none text-navy">{f.n}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.sectionLabels.modules}</span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.7rem,2.8vw,2.3rem)] leading-tight">{f.title}</h3>
                <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-slate">{f.body}</p>
                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-brass">{f.codes}</p>
              </div>
            ))}
          </div>

          <ProgrammeFilter />

          <div data-reveal className="glass mt-8 flex flex-wrap items-center justify-between gap-6 bg-[#F6F3EC]/90 p-7 backdrop-blur-md md:p-9">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-brass">{t.diagnostic.eyebrow}</p>
              <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-tight">{t.diagnostic.title}</h3>
              <p className="mt-2 max-w-[52ch] text-[13.5px] leading-relaxed text-slate">{t.diagnostic.body}</p>
            </div>
            <button type="button" data-booking data-magnetic className="bg-navy px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-brass hover:text-ink">
              {t.diagnostic.cta}
            </button>
            <OrientationExpress />
          </div>

          <div data-reveal className="glass mt-12 border-t border-ink/10 bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.sectionLabels.certifications}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.certifications.map((c) => (
                <span key={c} className="border border-ink/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/80">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACT III — Méthode & Casablanca */}
      <section id="methode" data-act="2" className="relative border-y border-ink/10 bg-limestone/40 py-28 backdrop-blur-sm md:py-36">
        <div className="shell">
          <div data-reveal className="glass bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:p-8">
            <Label>{t.method.eyebrow}</Label>
            <h2 className="mt-7 max-w-[22ch] font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.04em]">{t.method.title}</h2>
            <p className="mt-7 max-w-[62ch] text-[15px] leading-[1.8] text-slate">{t.method.body}</p>
          </div>
          <div data-stagger="steps" className="mt-12 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-3">
            {t.method.steps.map((s) => (
              <div key={s.n} className="bg-limestone/85 px-6 py-8 backdrop-blur-sm md:px-8">
                <p className="font-display text-[2.6rem] leading-none text-brass/80">{s.n}</p>
                <h3 className="mt-6 font-display text-2xl leading-tight">{s.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate">{s.body}</p>
                <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-navy">{s.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-24" data-reveal>
            <div className="glass border-b border-ink/20 bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:p-8">
              <Label>{t.photos.label}</Label>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight">{t.photos.title}</h2>
              <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-slate">{t.photos.body}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {t.photos.items.map((photo, i) => (
                <figure key={photo.src} className={i === 1 ? "md:mt-10" : ""}>
                  <div className="border border-ink/10 bg-limestone p-1.5">
                    <img src={photo.src} alt={photo.alt} width={1280} height={1375} loading="lazy"
                      className="editorial-img aspect-[4/5] w-full object-cover" />
                  </div>
                  <figcaption className="glass bg-[#F6F3EC]/90 px-4 py-4 backdrop-blur-md">
                    <p className="text-[12.5px] leading-snug text-ink/85">{photo.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="glass mt-6 bg-[#F6F3EC]/90 px-5 py-4 font-mono text-[9px] uppercase leading-[1.9] tracking-[0.14em] text-slate backdrop-blur-md">{t.photos.note}</p>
          </div>
        </div>
      </section>

      {/* ACT IV — Tarifs, Admission, FAQ, Centre */}
      <section id="tarifs" data-act="3" className="relative py-28 md:py-36">
        <div className="shell grid gap-12 md:grid-cols-12 md:gap-16">
          <div data-reveal className="glass bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:col-span-5 md:p-8">
            <Label>{t.tariffs.label}</Label>
            <h2 className="mt-7 font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1] tracking-[-0.04em]">{t.tariffs.title}</h2>
            <p className="mt-7 max-w-[46ch] text-[15px] leading-[1.8] text-slate">{t.tariffs.body}</p>
            <span className="mt-8 inline-block border border-brass/60 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-brass">{t.tariffs.badge}</span>
          </div>
          <div data-reveal className="md:col-span-7">
            <div className="glass bg-[#F6F3EC]/90 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy">{t.tariffs.tableTitle}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate">{t.tariffs.note}</span>
              </div>
              <div data-stagger="tariffs">
                {t.programmes.map((p) => (
                  <div key={p.code} className="flex items-baseline gap-4 border-b border-ink/10 px-5 py-3.5 last:border-b-0">
                    <span data-ltr className="w-20 shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-slate">{p.code}</span>
                    <span className="min-w-0 flex-1 text-[13px] leading-snug text-ink/85">{p.title}</span>
                    <span data-ltr className="shrink-0 font-mono text-[10px] tabular-nums text-ink">{p.priceShort}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="glass mt-5 bg-[#F6F3EC]/90 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.14em] text-slate backdrop-blur-md">{t.tariffs.footnote}</p>
          </div>
        </div>
      </section>

      <section id="admission" className="border-y border-ink/10 bg-limestone/45 py-28 backdrop-blur-sm md:py-36">
        <div className="shell grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <div data-reveal className="glass bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:p-8">
              <Label>{t.admission.label}</Label>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] tracking-[-0.04em]">{t.admission.title}</h2>
              <p className="mt-7 max-w-[56ch] text-[15px] leading-[1.8] text-slate">{t.admission.body}</p>
            </div>
            <div className="mt-10 border-t border-ink/20">
              {t.admission.steps.map((step) => (
                <article key={step.n} data-reveal className="glass grid gap-4 border-b border-ink/10 bg-[#F6F3EC]/90 p-5 backdrop-blur-md md:grid-cols-12 md:p-7">
                  <div className="md:col-span-2"><span className="font-display text-[2.4rem] leading-none text-brass/80">{step.n}</span></div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-2xl leading-tight">{step.title}</h3>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-navy">{step.note}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-[14px] leading-relaxed text-ink/85">{step.lead}</p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="md:col-span-5">
            <div data-reveal className="glass p-7 md:p-9">
              <Label>{t.admission.before}</Label>
              <dl className="mt-7 border-t border-ink/10">
                {t.admission.facts.map(([term, value]) => (
                  <div key={term} className="flex items-baseline justify-between gap-5 border-b border-ink/10 py-3">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate">{term}</dt>
                    <dd className="text-end text-[12.5px] text-ink/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <button type="button" data-booking data-magnetic className="mt-8 block w-full bg-navy px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-brass hover:text-ink">
                {t.diagnostic.cta}
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="shell max-w-[1000px]">
          <div data-reveal className="glass bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:p-8">
            <Label>{t.faq.eyebrow}</Label>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-tight">{t.faq.title}</h2>
          </div>
          <div className="glass mt-10 border-t border-ink/20 bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:p-8">
            {t.faq.items.map((item, i) => (
              <details key={item.q} className="group border-b border-ink/10">
                <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="w-6 shrink-0 font-mono text-[9px] text-slate">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[15px] leading-snug text-ink/90">{item.q}</span>
                  <span aria-hidden className="font-display text-xl text-brass transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[78ch] pb-6 ps-11 text-[13.5px] leading-[1.8] text-slate">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-ink/10 bg-limestone/50 py-24 backdrop-blur-sm md:py-32">
        <div className="shell grid gap-12 md:grid-cols-12 md:items-center">
          <div data-reveal className="glass bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:col-span-7 md:p-8">
            <Label>{t.contact.label}</Label>
            <h2 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1] tracking-[-0.04em]">{t.brand.name}</h2>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">{t.brand.address}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">{t.brand.hours}</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-slate/80">{t.brand.hoursNote}</p>
          </div>
          <div data-reveal className="glass bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:col-span-5 md:ms-auto md:p-8">
            <a href={t.brand.phoneHref} data-ltr className="block font-display text-[clamp(1.8rem,3vw,2.6rem)] tracking-[-0.02em] text-ink transition-colors hover:text-brass">{t.brand.phone}</a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={whatsappHref(t.contact.message)} target="_blank" rel="noopener noreferrer" data-magnetic className="bg-navy px-6 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-limestone transition-colors hover:bg-brass hover:text-ink">
                {t.contact.whatsapp}
              </a>
              <button type="button" data-booking data-magnetic className="border border-ink/25 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-brass hover:text-brass">
                {t.contact.diagnosis}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10">
        <div className="glass shell flex flex-col gap-6 bg-[#F6F3EC]/90 p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-8">
          <p className="font-display text-2xl tracking-[0.16em]">{t.brand.mark}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate">© 2026 {t.brand.name} — {t.brand.arabic} · {t.contact.footer}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate">{t.brand.footerAddress}</p>
        </div>
      </footer>
    </Experience>
  );
}
