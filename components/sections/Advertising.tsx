"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Words from "@/components/ui/Words";

gsap.registerPlugin(ScrollTrigger);

export default function Advertising() {
  const ref = useRef<HTMLElement>(null);

  // As you scroll, the "old way" card fades to grey and shrinks while the
  // "new way" card lights up and grows.
  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: sec, start: "top 60%", end: "bottom 55%", scrub: 0.6 },
      });
      tl.to("[data-old]", { filter: "grayscale(1) brightness(0.8)", scale: 0.96, duration: 1 }, 0)
        .fromTo("[data-new]", { scale: 0.97 }, { scale: 1.03, duration: 1 }, 0)
        .fromTo("[data-new-glow]", { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
    }, sec);
    return () => mm.revert();
  }, []);

  return (
    <section id="advertise" ref={ref} className="relative z-10 px-5 py-28">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <div data-reveal="left" className="rounded-2xl">
          <div data-old className="glass h-full rounded-2xl p-8">
            <p className="mb-3 text-xs font-semibold tracking-widest text-cy">THE PROBLEM</p>
            <Words as="h2" text="Static ads can't keep up with your business" className="mb-4 font-head text-2xl font-bold text-white sm:text-3xl" />
            <p className="text-muted">
              Printed banners lock you into one message for months. There&apos;s no way to
              measure who saw it, and no way to change it for a weekend sale or a new launch.
            </p>
          </div>
        </div>
        <div data-reveal="right" className="rounded-2xl">
          <div data-new className="glass relative h-full rounded-2xl p-8">
            <span data-new-glow aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_60px_rgba(22,199,255,0.35)] ring-1 ring-cy/60" />
            <p className="mb-3 text-xs font-semibold tracking-widest text-cy">THE SOLUTION</p>
            <Words as="h2" text="One screen. Total flexibility." className="mb-4 font-head text-2xl font-bold text-white sm:text-3xl" />
            <p className="text-muted">
              Advex Digital&apos;s digital LED screen rotates your creative on a schedule you choose —
              swap it, extend it, or launch a new campaign in days, not weeks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
