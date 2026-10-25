"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onReady } from "@/lib/ready";

gsap.registerPlugin(ScrollTrigger);

export const SECTIONS = [
  ["hero", "Home"],
  ["advertise", "Advertising"],
  ["city", "The City"],
  ["screen", "Our Screen"],
  ["location", "Location"],
  ["packages", "Packages"],
  ["how", "How It Works"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
] as const;

/**
 * Page-wide scroll effects (no visual markup of its own except the progress
 * bar, scroll cue and section dots):
 *   data-hero-in         -> hero intro once the loading screen ends
 *   data-words           -> headline words slide up one by one (see ui/Words.tsx)
 *   data-reveal="up|left|right|scale" -> fade/slide in when scrolled into view (staggered)
 *   data-reveal-sm       -> same, but only on screens < 1024px (used by package cards)
 *   data-heading         -> headline wipe-in
 *   data-parallax-img    -> image drifts inside its frame while scrolling
 * It also marks the active section on <html data-section="..."> which the
 * CSS in globals.css uses to highlight the nav link and the side dots.
 */
export default function ScrollFX() {
  const bar = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();
    const offs: Array<() => void> = [];
    const ctx = gsap.context(() => {
      // ---- progress bar + scroll cue ----
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          if (cue.current) cue.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 120));
        },
      });

      // ---- active section (for nav highlight + dots) ----
      SECTIONS.forEach(([id]) => {
        const el = document.getElementById(id);
        if (!el) return;
        const trigger = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
        ScrollTrigger.create({
          trigger,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) document.documentElement.dataset.section = id;
          },
        });
      });

      if (reduce) return;

      // ---- hero intro (waits for the loading screen) ----
      gsap.set("[data-hero-in]", { y: 40, autoAlpha: 0 });
      offs.push(
        onReady(() =>
          gsap.to("[data-hero-in]", { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, delay: 0.2, ease: "power3.out" })
        )
      );

      // ---- word-by-word headlines ----
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        const inner = el.querySelectorAll(".wi");
        gsap.set(inner, { yPercent: 115 });
        const play = () => gsap.to(inner, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.07, overwrite: true });
        if (el.hasAttribute("data-words-hero")) offs.push(onReady(() => gsap.delayedCall(0.1, play)));
        else ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: play });
      });

      // ---- reveals ----
      const variants: Record<string, gsap.TweenVars> = {
        up: { y: 48 },
        left: { x: -64 },
        right: { x: 64 },
        scale: { scale: 0.92, y: 24 },
      };
      const reveal = (els: HTMLElement[], from: gsap.TweenVars) => {
        if (!els.length) return;
        gsap.set(els, { autoAlpha: 0, ...from });
        const show = (batch: Element[]) =>
          gsap.to(batch, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true });
        ScrollTrigger.batch(els, { start: "top 92%", once: true, onEnter: show, onEnterBack: show });
      };
      Object.entries(variants).forEach(([k, from]) =>
        reveal(gsap.utils.toArray<HTMLElement>(`[data-reveal="${k}"]`), from)
      );

      // ---- headline wipe ----
      gsap.utils.toArray<HTMLElement>("[data-heading]").forEach((h) => {
        gsap.set(h, { clipPath: "inset(0% 0% 100% 0%)", y: 28 });
        const show = () =>
          gsap.to(h, { clipPath: "inset(-20% -10% -20% -10%)", y: 0, duration: 1.1, ease: "power4.out", overwrite: true });
        ScrollTrigger.create({ trigger: h, start: "top 92%", once: true, onEnter: show, onEnterBack: show });
      });

      // ---- parallax image ----
      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.18 },
          {
            yPercent: 7,
            scale: 1.18,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // ---- small screens only (package cards are a plain grid there) ----
      mm.add("(max-width: 1023px)", () => {
        reveal(gsap.utils.toArray<HTMLElement>("[data-reveal-sm]"), { y: 48 });
      });
    });

    return () => {
      offs.forEach((f) => f());
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={bar}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-bl via-violet-500 to-cy"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={cue}
        className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-white/70"
        aria-hidden
      >
        SCROLL
        <span className="relative block h-8 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-3 animate-scrollcue bg-cy" />
        </span>
      </div>
      <nav aria-label="Sections" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} data-dot={id} aria-label={label} title={label}
             className="block h-2.5 w-2.5 rounded-full border border-white/50 bg-transparent transition-all duration-300 hover:scale-125 hover:border-cy" />
        ))}
      </nav>
    </>
  );
}
