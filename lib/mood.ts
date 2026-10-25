/**
 * Day → night "mood" of the 3D lighting (0 = bright day, 1 = night).
 * Most sections have a fixed mood; "Our Screen" scrubs it with scroll
 * (OurScreen.tsx writes `mood.screen`) to show the screen reads day AND night.
 */
export const mood = { screen: 0 };
const BASE: Record<string, number> = {
  hero: 0.15, advertise: 0.3, city: 0.5, location: 1, packages: 0.85, how: 0.7, faq: 0.9, contact: 1,
};
export function targetMood(): number {
  const s = document.documentElement.dataset.section || "hero";
  return s === "screen" ? mood.screen : BASE[s] ?? 0.5;
}
