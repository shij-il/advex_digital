"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rig from "./Rig";
import Lighting from "./Lighting";
import Billboard from "./Billboard";
import LocationScene from "./LocationScene";
import { scrollProgress } from "@/lib/scrollProgress";
import { measureChapters } from "@/lib/choreography";

gsap.registerPlugin(ScrollTrigger);

/**
 * One <Canvas> persists behind sections 1–3 (Hero / Features / Location).
 * It's `position: fixed` + `pointer-events: none` so it never intercepts
 * page scroll or clicks — only the Html-overlay label in LocationScene
 * re-enables pointer events for itself.
 *
 * It fades out once the user reaches the Packages section, which is a
 * plain DOM/Tailwind glassmorphism section (no 3D needed there).
 */
export default function Experience() {
  // Drops render resolution automatically on slower devices.
  const [dpr, setDpr] = useState(1.5);
  // Master trigger: whole-page progress for billboard rotation + camera drift.
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.value = self.progress;
      },
    });
    // The Packages pin changes document height after first measure.
    const refresh = () => ScrollTrigger.refresh();
    measureChapters();
    ScrollTrigger.addEventListener("refresh", measureChapters);
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 400);
    return () => {
      ScrollTrigger.removeEventListener("refresh", measureChapters);
      trigger.kill();
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  // Touch-drag and device-orientation feed the same parallax the pointer
  // uses on desktop, so the "3D motion" is never cursor-only.
  useEffect(() => {
    function onTouch(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      window.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: t.clientX,
          clientY: t.clientY,
        })
      );
    }
    function onOrientation(e: DeviceOrientationEvent) {
      if (e.gamma == null || e.beta == null) return;
      const x = ((e.gamma + 45) / 90) * window.innerWidth;
      const y = ((e.beta - 20) / 60) * window.innerHeight;
      window.dispatchEvent(
        new PointerEvent("pointermove", { clientX: x, clientY: y })
      );
    }

    window.addEventListener("touchmove", onTouch, { passive: true });

    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (DOE?.requestPermission) {
      const onFirstTap = () => {
        DOE.requestPermission?.().then((r) => {
          if (r === "granted")
            window.addEventListener("deviceorientation", onOrientation);
        });
        window.removeEventListener("touchend", onFirstTap);
      };
      window.addEventListener("touchend", onFirstTap, { once: true });
    } else {
      window.addEventListener("deviceorientation", onOrientation);
    }

    return () => {
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="aurora absolute inset-0" />
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        <Rig />
        <Lighting />
        <Billboard />
        <LocationScene />
      </Canvas>
      <div className="grain absolute inset-0" />
    </div>
  );
}
