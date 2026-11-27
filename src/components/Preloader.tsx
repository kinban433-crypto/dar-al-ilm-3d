"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Architectural curtain: parts upward once the background video has data. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const curtain = root.current;
    if (!curtain) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = document.querySelector("video");
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      if (reduced) {
        gsap.set(curtain, { yPercent: -100 });
        setDone(true);
        return;
      }
      if (line.current) gsap.to(line.current, { scaleX: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(curtain, {
        yPercent: -100,
        duration: 1.05,
        delay: 0.16,
        ease: "power4.inOut",
        onComplete: () => setDone(true),
      });
    };

    const onProgress = () => {
      if (!video || !line.current || !video.buffered.length || !video.duration) return;
      const ratio = Math.min(video.buffered.end(0) / video.duration, 1);
      gsap.to(line.current, { scaleX: ratio, duration: 0.3, overwrite: true, ease: "power2.out" });
    };

    video?.addEventListener("loadeddata", reveal, { once: true });
    video?.addEventListener("progress", onProgress);
    const safety = window.setTimeout(reveal, 1500);
    if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) reveal();

    return () => {
      window.clearTimeout(safety);
      video?.removeEventListener("loadeddata", reveal);
      video?.removeEventListener("progress", onProgress);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} data-preloader className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F6F3EC]">
      <p className="font-display text-[clamp(1.25rem,2.4vw,2rem)] tracking-[0.14em] text-ink">
        Dar Al-Ilm Académie
      </p>
      <p dir="rtl" className="mt-2 font-display text-[clamp(1rem,1.8vw,1.4rem)] tracking-[0.16em] text-navy">
        دار العلم
      </p>
      <div className="mt-9 h-px w-[min(60vw,320px)] overflow-hidden bg-ink/10">
        <div ref={line} className="h-full w-full origin-left scale-x-0 bg-brass" />
      </div>
    </div>
  );
}
