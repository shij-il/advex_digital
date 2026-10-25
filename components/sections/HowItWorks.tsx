"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Words from "@/components/ui/Words";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: "01", t: "Choose a package", d: "Pick the duration that fits your campaign." },
  { n: "02", t: "Contact Advex Digital", d: "Confirm on WhatsApp — availability & payment." },
  { n: "03", t: "Submit creative", d: "Send your image or video to our team." },
  { n: "04", t: "Review", d: "We check format and approve your ad." },
  { n: "05", t: "Schedule", d: "Your slot is locked into the rotation." },
  { n: "06", t: "Go live", d: "Your brand plays on the big screen." },
];

/** A line draws down the timeline as you scroll and lights up each step it reaches. */
export default function HowItWorks() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ol = list.current;
    const f = fill.current;
    if (!ol || !f) return;
    const items = Array.from(ol.querySelectorAll<HTMLElement>("[data-step]"));
    const setOn = (on: (i: number, el: HTMLElement) => boolean) =>
      items.forEach((el, i) => (el.dataset.on = String(on(i, el))));

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setOn(() => false);
      const st = ScrollTrigger.create({
        trigger: ol,
        start: "top 65%",
        end: "bottom 60%",
        scrub: true,
        onUpdate: (s) => {
          f.style.transform = `scaleY(${s.progress})`;
          const reach = s.progress * ol.offsetHeight;
          setOn((_, el) => el.offsetTop + 28 <= reach);
        },
      });
      return () => st.kill();
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      f.style.transform = "scaleY(1)";
      setOn(() => true);
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="how" className="relative z-10 px-5 py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-28">
          <div data-reveal="up" className="glass rounded-3xl p-8 sm:p-10">
            <p className="mb-3 text-xs font-semibold tracking-widest text-cy">HOW IT WORKS</p>
            <Words as="h2" text="From idea to on-screen, in six steps" accent="in six steps" className="font-head text-3xl font-bold text-white md:text-4xl" />
            <p className="mt-4 text-muted">No contracts to chase and no printing delays. Pick a package, send your creative, and we handle the rest.</p>
          </div>
        </div>

        <ol ref={list} className="relative space-y-6 pl-12">
          <span aria-hidden className="absolute bottom-3 left-[17px] top-3 w-px bg-white/15" />
          <span ref={fill} aria-hidden className="absolute bottom-3 left-[17px] top-3 w-px origin-top bg-gradient-to-b from-bl to-cy" style={{ transform: "scaleY(0)" }} />
          {STEPS.map((s) => (
            <li
              key={s.n}
              data-step
              data-on="true"
              className="group relative opacity-100 transition-all duration-500 data-[on=false]:translate-x-3 data-[on=false]:opacity-40"
            >
              <span className="absolute -left-12 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black text-[11px] font-bold text-white/60 transition-all duration-500 group-data-[on=true]:border-cy group-data-[on=true]:bg-cy group-data-[on=true]:text-black group-data-[on=true]:shadow-[0_0_24px_rgba(22,199,255,0.7)]">
                {s.n}
              </span>
              <div className="glass rounded-2xl p-5 sm:p-6">
                <p className="font-head text-xl font-bold text-white">{s.t}</p>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
