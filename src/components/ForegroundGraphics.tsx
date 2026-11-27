"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/i18n/LocaleProvider";

const POSITIONS = [
  { top: "30%", left: "57%", depth: -22 },
  { top: "44%", left: "69%", depth: -48 },
  { top: "58%", left: "55%", depth: -74 },
  { top: "72%", left: "67%", depth: -100 },
];

export default function ForegroundGraphics() {
  const root = useRef<HTMLDivElement>(null);
  const parallax = useRef<Array<HTMLDivElement | null>>([]);
  const tilt = useRef<Array<HTMLDivElement | null>>([]);
  const { locale, t } = useLocale();
  const rtl = locale === "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      parallax.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: POSITIONS[i].depth,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1 },
        });
      });
      // Fade away before the dense editorial grids arrive, so plaques never cover text.
      gsap.to(root.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight * 0.85,
          scrub: 0.5,
        },
      });
    }, root);

    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let frame = 0;
    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      frame = requestAnimationFrame(tick);
      tiltX += (pointerX - tiltX) * 0.07;
      tiltY += (pointerY - tiltY) * 0.07;
      tilt.current.forEach((el, i) => {
        if (!el) return;
        const strength = 1 + i * 0.12;
        el.style.transform = `perspective(900px) rotateY(${(tiltX * 5 * strength).toFixed(2)}deg) rotateX(${(-tiltY * 4 * strength).toFixed(2)}deg)`;
      });
    };
    if (!reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      frame = requestAnimationFrame(tick);
    }

    return () => {
      ctx.revert();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] hidden lg:block">
      {t.plaques.map((plaque, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: POSITIONS[i].top, [rtl ? "right" : "left"]: POSITIONS[i].left }}
        >
          <div ref={(el) => { parallax.current[i] = el; }}>
            <div ref={(el) => { tilt.current[i] = el; }} className="will-change-transform">
              <div className="glass relative flex items-center gap-4 border border-[#111622]/10 bg-[#F6F3EC]/90 px-5 py-3.5 backdrop-blur-md">
                <span className="absolute inset-y-2 start-0 w-px bg-brass" />
                <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-slate">
                  0{i + 1}
                </span>
                <span className="font-display text-[clamp(0.95rem,1.25vw,1.25rem)] leading-none text-ink">
                  {plaque.label === "دار العلم"
                    ? <span dir="rtl">{plaque.label}</span>
                    : plaque.label}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-brass" data-ltr>
                  {plaque.detail}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
