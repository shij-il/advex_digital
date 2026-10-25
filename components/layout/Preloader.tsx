"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";

/** Short branded loading intro. When it finishes it fires `advex:ready`, which starts the billboard video and the hero animation. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lockScroll();
    const t0 = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      unlockScroll();
      document.documentElement.dataset.ready = "1";
      window.dispatchEvent(new Event("advex:ready"));
      gsap.to(ref.current, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          if (ref.current) ref.current.style.display = "none";
        },
      });
    };
    const id = window.setInterval(() => {
      const waited = performance.now() - t0;
      if ((document.readyState === "complete" && waited > 1500) || waited > 4500) {
        window.clearInterval(id);
        finish();
      }
    }, 100);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <div id="preloader" ref={ref} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Advex Digital" className="preload-logo w-48 sm:w-64" />
        <div className="mt-8 h-[2px] w-40 overflow-hidden rounded bg-white/10">
          <div className="preload-bar h-full w-full origin-left bg-gradient-to-r from-bl to-cy" />
        </div>
      </div>
      <noscript>
        <style>{`#preloader{display:none!important}`}</style>
      </noscript>
    </>
  );
}
