"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Words from "@/components/ui/Words";
import { mood } from "@/lib/mood";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Outdoor LED",
    desc: "High-brightness panel, readable in direct daylight.",
    long: "Built to stay sharp in harsh sun and glare — and to glow at night, so your message reads clearly at any hour.",
    icon: <path d="M3 4h18v12H3zM8 20h8M12 16v4" strokeWidth={2} stroke="currentColor" fill="none" />,
  },
  {
    title: "Image & Video",
    desc: "Supports photo and video creative formats.",
    long: "Run a still poster or a moving ad — whichever tells your story best. Motion pulls the eye.",
    icon: <path d="M3 5h18v14H3zM8 5v14M16 5v14" strokeWidth={2} stroke="currentColor" fill="none" />,
  },
  {
    title: "Scheduled Rotation",
    desc: "Your ad plays in structured daily rotations.",
    long: "Your slot repeats through the day on a fixed schedule, so people see your brand again and again.",
    icon: <path d="M4 9a8 8 0 0 1 14-5l2 2M20 15a8 8 0 0 1-14 5l-2-2M3 4v4h4M21 20v-4h-4" strokeWidth={2} stroke="currentColor" fill="none" />,
  },
  {
    title: "High Footfall",
    desc: "Positioned where your audience already is.",
    long: "At Cravio in the heart of Mannarkad — close to colleges, shopping mall and the highway.",
    icon: <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" strokeWidth={2} stroke="currentColor" fill="none" />,
  },
];

/**
 * Desktop: the section pins and scrolling steps through the four features
 * one at a time (while the lighting moves from day to night).
 * Phone / tablet: a normal stacked list.
 */
export default function OurScreen() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    const panels = Array.from(sec.querySelectorAll<HTMLElement>("[data-panel]"));
    const cards = Array.from(sec.querySelectorAll<HTMLElement>("[data-card]"));
    const fill = sec.querySelector<HTMLElement>("[data-fill]");
    let active = 0;

    const setActive = (i: number) => {
      if (i === active) return;
      active = i;
      panels.forEach((p, k) =>
        gsap.to(p, { autoAlpha: k === i ? 1 : 0, y: k === i ? 0 : k < i ? -28 : 28, duration: 0.5, overwrite: true })
      );
      cards.forEach((c, k) => (c.dataset.active = String(k === i)));
    };

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      active = 0;
      gsap.set(panels, { autoAlpha: 0, y: 28 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      cards.forEach((c, k) => (c.dataset.active = String(k === 0)));
      ScrollTrigger.create({
        trigger: sec,
        start: "top top",
        end: "+=260%",
        pin: true,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (s) => {
          mood.screen = s.progress;
          setActive(Math.min(FEATURES.length - 1, Math.floor(s.progress * FEATURES.length)));
          if (fill) fill.style.transform = `scaleX(${s.progress})`;
        },
      });
      return () => {
        gsap.set(panels, { clearProps: "all" });
        cards.forEach((c) => delete c.dataset.active);
      };
    });
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (s) => {
          mood.screen = s.progress;
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="screen" ref={ref} className="relative z-10 px-5 py-24 lg:flex lg:h-screen lg:items-center lg:py-0 lg:pt-16">
      <div className="mx-auto w-full max-w-6xl">
        <div data-reveal="up" className="glass mb-8 inline-block rounded-2xl px-6 py-5">
          <p className="mb-2 text-xs font-semibold tracking-widest text-cy">OUR SCREEN</p>
          <Words as="h2" text="Built for visibility, day and night" className="font-head text-3xl font-bold text-white md:text-4xl" />
        </div>
        <div className="mb-6 hidden h-[3px] w-full overflow-hidden rounded bg-white/10 lg:block">
          <div data-fill className="h-full origin-left bg-gradient-to-r from-bl to-cy" style={{ transform: "scaleX(0)" }} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          {/* big "now showing" panel — desktop only */}
          <div className="relative hidden min-h-[340px] lg:block">
            {FEATURES.map((f, i) => (
              <div key={f.title} data-panel className={`glass absolute inset-0 flex flex-col justify-center rounded-3xl p-10 ${i === 0 ? "" : "opacity-0"}`}>
                <p className="gtext font-head text-8xl font-bold leading-none">0{i + 1}</p>
                <h3 className="mt-4 font-head text-4xl font-bold text-white">{f.title}</h3>
                <p className="mt-3 max-w-md text-lg text-muted">{f.long}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                data-card
                data-reveal="up"
                data-active={i === 0 ? "true" : undefined}
                className="glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-500 data-[active=true]:border-cy data-[active=true]:shadow-[0_0_40px_rgba(22,199,255,0.25)] lg:data-[active=false]:opacity-55"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-bl to-cy shadow-lg shadow-bl/30">
                  <svg width="22" height="22" viewBox="0 0 24 24">{f.icon}</svg>
                </div>
                <div>
                  <p className="font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
