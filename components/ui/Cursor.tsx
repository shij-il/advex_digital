"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Soft glowing ring that trails the mouse and grows over links/buttons. Desktop mouse only. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      el.style.opacity = "1";
      x(e.clientX);
      y(e.clientY);
      const hot = (e.target as HTMLElement).closest("a, button, [role=button], input, textarea");
      el.dataset.hot = hot ? "1" : "0";
    };
    const leave = () => { el.style.opacity = "0"; };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);
  return <div ref={ref} aria-hidden className="cursor-ring pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 rounded-full border border-cy/70 opacity-0 lg:block" />;
}
