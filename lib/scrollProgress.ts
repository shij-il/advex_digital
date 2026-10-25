/** Whole-page scroll progress (0–1). Written by one ScrollTrigger in
 *  Experience.tsx, read every frame by Billboard.tsx and Rig.tsx. A plain
 *  mutable object (not React state) so scrolling never re-renders React. */
export const scrollProgress = { value: 0 };
