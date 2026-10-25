import type Lenis from "lenis";

/** Shared handle to the smooth-scroll engine (set in SmoothScroll.tsx). */
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};

export function scrollToTarget(target: string | number) {
  const el = typeof target === "string" ? document.querySelector(target) : null;
  if (lenis) {
    lenis.scrollTo(target === "#hero" ? 0 : (el as HTMLElement) ?? (target as number), { duration: 1.6 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else el?.scrollIntoView({ behavior: "smooth" });
}

export function lockScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}
export function unlockScroll() {
  document.documentElement.style.overflow = "";
  lenis?.start();
}
