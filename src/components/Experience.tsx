"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import BookingModal from "./BookingModal";
import ForegroundGraphics from "./ForegroundGraphics";
import ProgressRail from "./ProgressRail";
import Preloader from "./Preloader";
import MicroInteractions from "./MicroInteractions";
import LanguageSwitcher from "./LanguageSwitcher";

const VIDEO_4K = "/videos/atrium-scrub-4k.mp4";
const VIDEO_DESKTOP = "/videos/atrium-scrub.mp4";
const VIDEO_MOBILE = "/videos/atrium-scrub-mobile.mp4";
const POSTER = "/videos/atrium-poster.jpg";

export default function Experience({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = videoRef.current;

    gsap.registerPlugin(ScrollTrigger);

    // Pick the rendition once, before load, so no initial request is aborted.
    // >= 1920 → 4K, 1280–1919 → 2K QHD, < 1280 → lightweight mobile.
    if (video) {
      const width = window.innerWidth;
      video.src = width >= 1920 ? VIDEO_4K : width >= 1280 ? VIDEO_DESKTOP : VIDEO_MOBILE;
      video.load();
    }

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* Video scrub state — ScrollTrigger supplies the target, rAF eases into it. */
    const FRAME = 1 / 24; // source footage is 24 fps
    const MIN_SEEK_MS = 42; // never issue more than ~24 seeks per second
    let duration = 0;
    let scrollProgress = 0;
    let targetTime = 0;
    let currentTime = 0;
    let scrubFrame = 0;
    let lastFrame = -1;
    let seekPending = false;
    let seekTimer = 0;
    let scrubTween: gsap.core.Tween | undefined;

    const clearSeek = () => {
      seekPending = false;
      window.clearTimeout(seekTimer);
    };
    const onSeeked = () => clearSeek();
    video?.addEventListener("seeked", onSeeked);

    const tick = () => {
      scrubFrame = requestAnimationFrame(tick);
      // Wait until the decoded frame is presented, so rapid scrolling never
      // queues an unbounded backlog of seeks.
      if (!video || !duration || seekPending) return;
      const max = Math.max(duration - 0.05, 0);
      const next = Math.min(
        Math.max(currentTime + (targetTime - currentTime) * (reduced ? 1 : 0.18), 0),
        max,
      );
      const frame = Math.round(next / FRAME);
      if (frame === lastFrame) return;
      lastFrame = frame;
      currentTime = Math.min(frame * FRAME, max);
      seekPending = true;
      window.clearTimeout(seekTimer);
      seekTimer = window.setTimeout(clearSeek, MIN_SEEK_MS * 3);
      video.currentTime = currentTime;
    };
    scrubFrame = requestAnimationFrame(tick);

    // Delegated so cards added by the category filter keep their hover lift.
    const cardFrom = (target: EventTarget | null) =>
      (target as HTMLElement | null)?.closest<HTMLElement>("[data-module-index]") ?? null;
    const enter = (event: Event) => {
      const card = cardFrom(event.target);
      if (card) gsap.to(card, { y: -4, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    };
    const leave = (event: Event) => {
      const card = cardFrom(event.target);
      if (card) gsap.to(card, { y: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    };
    document.addEventListener("mouseover", enter);
    document.addEventListener("focusin", enter);
    document.addEventListener("mouseout", leave);
    document.addEventListener("focusout", leave);

    const ctx = gsap.context(() => {
      const state = { p: 0 };
      scrubTween = gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => {
          scrollProgress = state.p;
          targetTime = scrollProgress * Math.max(duration - 0.05, 0);
        },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      if (!reduced) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 32,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = Array.from(group.children) as HTMLElement[];
          gsap.from(items, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
          gsap.fromTo(rule, { scaleX: 0 }, {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: rule, start: "top 92%", once: true },
          });
        });
      }
    }, wrap);

    /* Muted play/pause primes the decoder on Chrome and iOS before seeking. */
    const unlock = () => {
      if (!video) return;
      const played = video.play();
      if (played && typeof played.then === "function") {
        played.then(() => video.pause()).catch(() => {});
      }
    };
    const onLoaded = () => {
      if (!video) return;
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      scrollProgress = scrubTween?.scrollTrigger?.progress ?? scrollProgress;
      targetTime = scrollProgress * Math.max(duration - 0.05, 0);
      currentTime = targetTime;
      lastFrame = Math.round(currentTime / FRAME);
      unlock();
    };
    video?.addEventListener("loadedmetadata", onLoaded, { once: true });
    if (video && video.readyState >= HTMLMediaElement.HAVE_METADATA) onLoaded();
    window.addEventListener("pointerdown", unlock, { passive: true, once: true });
    window.addEventListener("touchstart", unlock, { passive: true, once: true });

    return () => {
      ctx.revert();
      cancelAnimationFrame(scrubFrame);
      window.clearTimeout(seekTimer);
      video?.removeEventListener("seeked", onSeeked);
      video?.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("focusin", enter);
      document.removeEventListener("mouseout", leave);
      document.removeEventListener("focusout", leave);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Preloader />
      <LanguageSwitcher />
      <video
        ref={videoRef}
        poster={POSTER}
        onError={(event) => {
          const element = event.currentTarget;
          if (element.src.endsWith(VIDEO_4K)) {
            element.src = VIDEO_DESKTOP;
            element.load();
          }
        }}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-100"
      />
      <ForegroundGraphics />
      <div ref={wrap} className="relative z-10">
        {children}
      </div>
      <ProgressRail />
      <MicroInteractions />
      <BookingModal />
    </>
  );
}
