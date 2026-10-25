/**
 * SCROLL CHOREOGRAPHY — the "script" for the 3D scene.
 *
 * Every section (chapter) has ONE pose for the camera and the billboard.
 * While you scroll, the scene glides from the pose of the section you are
 * leaving to the pose of the section you are entering, and HOLDS the pose
 * while the section is on screen (so text stays readable).
 *
 * Edit the numbers below to re-direct the scene. Units are Three.js world
 * units: x = left/right, y = up/down, z = towards/away from the viewer.
 *   cam   = camera position        look = point the camera looks at
 *   bb    = billboard: x, y, z position, s scale, ry turn left/right (radians),
 *           rx tilt up/down (radians)
 */
export type Pose = {
  cam: [number, number, number];
  look: [number, number, number];
  bb: { x: number; y: number; z: number; s: number; ry: number; rx: number };
};
type Chapter = { id: string; desktop: Pose; mobile: Pose };

export const CHAPTERS: Chapter[] = [
  {
    // 1. HERO — billboard stands to the right of the headline, turned in.
    id: "hero",
    desktop: { cam: [0, 0.2, 6.2], look: [0.5, 0, 0], bb: { x: 1.85, y: 0, z: 0, s: 0.88, ry: -0.28, rx: 0 } },
    mobile: { cam: [0, 0, 6], look: [0, 0.5, 0], bb: { x: 0, y: 1.55, z: 0, s: 0.62, ry: -0.15, rx: 0 } },
  },
  {
    // 2. ADVERTISING — swings left and turns to show its side: "the old way vs the new way".
    id: "advertise",
    desktop: { cam: [-0.6, 0.3, 5.8], look: [0, 0, 0], bb: { x: -2.5, y: 0.1, z: -0.6, s: 0.9, ry: 0.6, rx: 0 } },
    mobile: { cam: [0, 0, 6], look: [0, 0.5, 0], bb: { x: 0.5, y: 1.5, z: -0.3, s: 0.62, ry: 0.45, rx: 0 } },
  },
  {
    // 2b. CITY — full-screen city video band: the 3D billboard steps back out of the way.
    id: "city",
    desktop: { cam: [0, 0, 7], look: [0, 0, 0], bb: { x: 0, y: 1.8, z: -4, s: 0.8, ry: 0, rx: 0 } },
    mobile: { cam: [0, 0, 6.6], look: [0, 0.4, 0], bb: { x: 0, y: 1.7, z: -3, s: 0.6, ry: 0, rx: 0 } },
  },
  {
    // 3. OUR SCREEN — camera pushes in, billboard faces us, huge and bright.
    id: "screen",
    desktop: { cam: [0, 0.4, 5.6], look: [0, -0.2, 0], bb: { x: 0, y: -0.9, z: 0, s: 0.95, ry: 0, rx: 0 } },
    mobile: { cam: [0, 0, 5.6], look: [0, 0.3, 0], bb: { x: 0, y: 1.2, z: 0.2, s: 0.7, ry: 0, rx: 0 } },
  },
  {
    // 4. LOCATION — pulls back and low, billboard recedes over the "city" grid.
    id: "location",
    desktop: { cam: [1.6, -0.7, 6.8], look: [0, 0.5, -1], bb: { x: -1.2, y: 0.9, z: -2.6, s: 0.9, ry: 0.8, rx: 0.05 } },
    mobile: { cam: [0.4, -0.3, 6.4], look: [0, 0.6, -1], bb: { x: -0.4, y: 1.4, z: -1.2, s: 0.62, ry: 0.7, rx: 0.05 } },
  },
  {
    // 5. PACKAGES — billboard rises into the background so the cards own the screen.
    id: "packages",
    desktop: { cam: [0, 0, 7.4], look: [0, 0, 0], bb: { x: 0, y: 1.5, z: -3, s: 0.9, ry: -0.15, rx: 0 } },
    mobile: { cam: [0, 0, 6.6], look: [0, 0.3, 0], bb: { x: 0, y: 1.6, z: -1.5, s: 0.62, ry: -0.2, rx: 0 } },
  },
  {
    // 6. HOW IT WORKS — orbit to the right side.
    id: "how",
    desktop: { cam: [0.8, 0.4, 6.4], look: [0, 0, 0], bb: { x: 2.8, y: 0.2, z: -1, s: 0.9, ry: -0.6, rx: 0 } },
    mobile: { cam: [0, 0, 6.2], look: [0, 0.5, 0], bb: { x: -0.5, y: 1.5, z: -0.8, s: 0.62, ry: -0.5, rx: 0 } },
  },
  {
    // 7. FAQ — calm: billboard parked on the left, slowly breathing.
    id: "faq",
    desktop: { cam: [-0.6, 0, 6.4], look: [0, 0, 0], bb: { x: -3, y: 0, z: -1.2, s: 0.85, ry: 0.5, rx: 0 } },
    mobile: { cam: [0, 0, 6.2], look: [0, 0.5, 0], bb: { x: 0.4, y: 1.5, z: -1, s: 0.62, ry: 0.4, rx: 0 } },
  },
  {
    // 8. CONTACT — billboard centres above the forms, facing the visitor: "your brand on screen".
    id: "contact",
    desktop: { cam: [0, 0.1, 6.2], look: [0, 0.4, 0], bb: { x: 0, y: 1.7, z: -2.4, s: 0.9, ry: 0, rx: 0 } },
    mobile: { cam: [0, 0, 6], look: [0, 0.5, 0], bb: { x: 0, y: 1.55, z: -0.4, s: 0.66, ry: 0, rx: 0 } },
  },
];

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

// Scroll position (px) at which each chapter is centred in the viewport.
let marks: { idx: number; y: number }[] = [];

/** Re-measure chapter positions (called on load, resize and ScrollTrigger refresh). */
export function measureChapters() {
  if (typeof window === "undefined") return;
  const out: { idx: number; y: number }[] = [];
  CHAPTERS.forEach((c, idx) => {
    const el = document.getElementById(c.id);
    if (!el) return;
    // A pinned section lives inside a ".pin-spacer" that keeps the real height.
    const node = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
    const r = node.getBoundingClientRect();
    out.push({ idx, y: r.top + window.scrollY + r.height / 2 - window.innerHeight / 2 });
  });
  out.sort((a, b) => a.y - b.y);
  marks = out;
}

const pose: Pose = {
  cam: [0, 0, 6],
  look: [0, 0, 0],
  bb: { x: 0, y: 0, z: 0, s: 1, ry: 0, rx: 0 },
};
let cacheKey = "";

/** Pose for the current scroll position (shared object — do not mutate). */
export function samplePose(scrollY: number, width: number, height: number): Pose {
  const key = `${Math.round(scrollY)}|${width}|${height}`;
  if (key === cacheKey) return pose;
  cacheKey = key;

  const mobile = width < 1024;
  const pick = (i: number) => (mobile ? CHAPTERS[i].mobile : CHAPTERS[i].desktop);
  let a = pick(0);
  let b = a;
  let t = 0;

  if (marks.length) {
    if (scrollY <= marks[0].y) {
      a = b = pick(marks[0].idx);
    } else if (scrollY >= marks[marks.length - 1].y) {
      a = b = pick(marks[marks.length - 1].idx);
    } else {
      let i = 0;
      while (i < marks.length - 2 && scrollY >= marks[i + 1].y) i++;
      a = pick(marks[i].idx);
      b = pick(marks[i + 1].idx);
      const raw = (scrollY - marks[i].y) / (marks[i + 1].y - marks[i].y);
      // hold the first/last 20% of each segment, glide through the middle 60%
      t = smooth(clamp01((raw - 0.2) / 0.6));
    }
  }

  for (let k = 0; k < 3; k++) {
    pose.cam[k] = lerp(a.cam[k], b.cam[k], t);
    pose.look[k] = lerp(a.look[k], b.look[k], t);
  }
  (["x", "y", "z", "s", "ry", "rx"] as const).forEach((k) => {
    pose.bb[k] = lerp(a.bb[k], b.bb[k], t);
  });

  // Responsive fit: narrower aspect ratios pull the billboard inward;
  // tablets get a slightly bigger billboard than phones.
  const ar = Math.min(1.2, Math.max(0.75, width / height / 1.6));
  if (!mobile) {
    pose.bb.x *= ar;
    pose.bb.s *= Math.min(1, ar * 1.05);
  } else if (width >= 640) {
    pose.bb.s *= 1.25;
  }
  return pose;
}
