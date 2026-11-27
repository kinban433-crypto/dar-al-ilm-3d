"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Magnetic CTAs and a restrained brushed-brass cursor ring (desktop only). */
export default function MicroInteractions() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
      const move = (event: MouseEvent) => {
        const box = element.getBoundingClientRect();
        const x = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
        const y = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
        gsap.to(element, { x: x * 7, y: y * 5, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      };
      const leave = () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,0.65)", overwrite: "auto" });
      };
      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    });

    let pointerX = -120;
    let pointerY = -120;
    let x = -120;
    let y = -120;
    let hover = 0;
    let target = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };
    const onOver = (event: PointerEvent) => {
      const node = event.target as HTMLElement | null;
      target = node?.closest("a, button, summary, [data-booking], [role=tab]") ? 1 : 0;
    };
    const tick = () => {
      frame = requestAnimationFrame(tick);
      x += (pointerX - x) * 0.18;
      y += (pointerY - y) * 0.18;
      hover += (target - hover) * 0.12;
      if (!ring.current) return;
      const scale = (1 + hover * 0.9).toFixed(3);
      ring.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0) scale(${scale})`;
      ring.current.style.opacity = pointerX > -50 ? "1" : "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cleanups.forEach((dispose) => dispose());
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-6 w-6 rounded-full border border-brass opacity-0 lg:block"
    />
  );
}
