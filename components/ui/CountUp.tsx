"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Number that counts up from 0 when it scrolls into view (e.g. package prices). */
export default function CountUp({ to, prefix = "₹" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const o = { v: 0 };
    el.textContent = prefix + "0";
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(o, {
          v: to, duration: 1.6, ease: "power3.out",
          onUpdate: () => { el.textContent = prefix + Math.round(o.v).toLocaleString("en-IN"); },
        }),
    });
    return () => {
      st.kill();
      el.textContent = prefix + to.toLocaleString("en-IN");
    };
  }, [to, prefix]);
  return <span ref={ref}>{prefix}{to.toLocaleString("en-IN")}</span>;
}
