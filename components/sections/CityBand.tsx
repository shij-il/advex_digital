"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Words from "@/components/ui/Words";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned cinematic scene: a city video starts as a small framed window and
 * expands to fill the whole screen as you scroll, then the caption appears.
 */
export default function CityBand() {
  const sec = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sec.current;
    const v = vid.current;
    if (!s || !v) return;

    // Pick a video sized for the device: portrait crop on phones, HD on desktop.
    const phone = window.innerWidth < 768;
    v.poster = phone ? "/video/crowd-poster-m.jpg" : "/video/crowd-poster.jpg";
    v.src = phone ? "/video/crowd-m.mp4" : "/video/crowd-hd.mp4";
    v.load();

    // Only decode the video while the section is on screen.
    const playTrig = ScrollTrigger.create({
      trigger: s,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        if (self.isActive) v.play().catch(() => {});
        else v.pause();
      },
    });

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const small = window.innerWidth < 768;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: s, start: "top top", end: "+=140%", scrub: 0.5, pin: true, anticipatePin: 1 },
      });
      tl.fromTo(frame.current, { clipPath: small ? "inset(26% 5% 20% 5% round 20px)" : "inset(30% 12% 14% 12% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .fromTo(v, { scale: 1.1 }, { scale: 1, duration: 1 }, 0)
        .to(intro.current, { autoAlpha: 0, y: -30, duration: 0.25 }, 0.02)
        .fromTo(cap.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.65);
    }, s);

    return () => {
      playTrig.kill();
      mm.revert();
    };
  }, []);

  return (
    <section id="city" ref={sec} className="relative z-10 h-[100svh] overflow-hidden">
      <div ref={intro} className="absolute inset-x-0 top-[9vh] z-20 px-5 text-center">
        <p className="mb-3 text-xs font-semibold tracking-widest text-cy">THE CITY</p>
        <Words as="h2" text="Where your brand gets seen" accent="gets seen" className="font-head text-3xl font-bold text-white sm:text-5xl" />
      </div>

      <div ref={frame} className="absolute inset-0 overflow-hidden bg-black">
        <video
          ref={vid}
          poster="/video/crowd-poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
      </div>

      <div ref={cap} className="absolute inset-x-0 bottom-[9vh] z-20 px-5 lg:px-[6vw]">
        <div className="glass max-w-xl rounded-2xl p-6 sm:p-8">
          <p className="mb-2 text-xs font-semibold tracking-widest text-cy">EVERY GLANCE. EVERY DAY.</p>
          <h3 className="font-head text-2xl font-bold text-white sm:text-4xl">Your ad, in front of people already out and about.</h3>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Shopping, commuting, meeting friends — a bright LED screen catches attention at the exact moment people are looking up.
          </p>
        </div>
      </div>
      <p className="absolute bottom-3 right-4 z-20 text-[10px] tracking-wide text-white/50">Illustrative footage</p>
    </section>
  );
}
