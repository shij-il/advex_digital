"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PACKAGES } from "@/lib/packages";
import PackageCard from "@/components/ui/PackageCard";

gsap.registerPlugin(ScrollTrigger);

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    // Horizontal pinned scroll ONLY on large screens, and only when the
    // cards don't already fit. Below 1024px the cards stack vertically so
    // nothing is ever cut off or trapped in a pinned viewport.
    mm.add("(min-width: 1024px)", () => {
      const distance = track.scrollWidth - window.innerWidth + 80;
      if (distance <= 0) return;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="relative z-10 flex min-h-[auto] flex-col justify-center overflow-hidden px-5 py-20 lg:min-h-screen lg:px-0 lg:py-24"
    >
      <div data-reveal="up" className="glass mx-auto mb-10 w-full max-w-xl rounded-2xl px-8 py-6 text-center">
        <p className="mb-3 text-xs font-semibold tracking-widest text-cy">PACKAGES</p>
        <h2 className="font-head text-3xl font-bold text-white md:text-4xl">Choose your campaign</h2>
      </div>
      <div ref={trackRef} className="mx-auto grid w-full max-w-md grid-cols-1 gap-8 sm:max-w-3xl sm:grid-cols-2 lg:flex lg:w-max lg:max-w-none lg:gap-6 lg:px-[5vw] lg:will-change-transform">
        {PACKAGES.map((p) => (
          <div key={p.name} data-reveal-sm className="lg:w-[280px] lg:shrink-0">
            <PackageCard pkg={p} />
          </div>
        ))}
        {/* trailing spacer so the last card can clear the viewport edge */}
        <div className="hidden w-5 shrink-0 lg:block" />
      </div>
    </section>
  );
}
