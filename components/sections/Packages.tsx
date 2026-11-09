"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PACKAGES } from "@/lib/packages";
import PackageCard from "@/components/ui/PackageCard";
import EventsCard from "@/components/ui/EventsCard";

gsap.registerPlugin(ScrollTrigger);

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    // Sideways scroll is only a fallback now: on desktop all four cards fit
    // in one row, so nothing moves and no card is ever cut off.
    mm.add("(min-width: 1024px)", () => {
      const distance = track.scrollWidth - section.clientWidth;
      if (distance <= 8) return;
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
      className="relative z-10 flex min-h-[auto] flex-col justify-center overflow-hidden px-5 py-20 lg:min-h-screen lg:py-24"
    >
      <div data-reveal="up" className="glass mx-auto mb-10 w-full max-w-xl rounded-2xl px-8 py-6 text-center">
        <p className="mb-3 text-xs font-semibold tracking-widest text-cy">PACKAGES</p>
        <h2 className="font-head text-3xl font-bold text-white md:text-4xl">Choose your campaign</h2>
      </div>
      <div
        ref={trackRef}
        className="mx-auto grid w-full max-w-md grid-cols-1 gap-8 sm:max-w-3xl sm:grid-cols-2 lg:max-w-6xl lg:grid-cols-4 lg:gap-5"
      >
        {PACKAGES.map((p) => (
          <div key={p.name} data-reveal-sm>
            <PackageCard pkg={p} />
          </div>
        ))}
      </div>

      {/* Events & functions: below the four cards, after them on phones */}
      <div className="mx-auto mt-10 w-full max-w-md sm:max-w-3xl lg:max-w-6xl">
        <EventsCard />
      </div>
    </section>
  );
}