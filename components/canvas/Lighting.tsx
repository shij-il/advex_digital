"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { targetMood } from "@/lib/mood";

const DAY_SKY = new THREE.Color("#bcd4ff");
const NIGHT_SKY = new THREE.Color("#02030a");
const DAY_SUN = new THREE.Color("#fff4e0");
const NIGHT_SUN = new THREE.Color("#16c7ff");

/**
 * Day → night lighting. `lib/mood.ts` decides the mood per section; here we
 * just glide towards it (so the light never jumps).
 */
export default function Lighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);
  const m = useRef(0);

  useFrame((_, dt) => {
    m.current += (targetMood() - m.current) * (1 - Math.exp(-dt * 2.5));
    const p = m.current;
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(1.1, 0.15, p);
      ambientRef.current.color.copy(DAY_SKY).lerp(NIGHT_SKY, p);
    }
    if (sunRef.current) {
      sunRef.current.intensity = THREE.MathUtils.lerp(1.4, 0.2, p);
      sunRef.current.color.copy(DAY_SUN).lerp(NIGHT_SUN, p);
      sunRef.current.position.set(THREE.MathUtils.lerp(5, -3, p), THREE.MathUtils.lerp(6, 1, p), 4);
    }
    if (rimRef.current) rimRef.current.intensity = THREE.MathUtils.lerp(0.6, 2.4, p);
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={1.1} color={DAY_SKY} />
      <directionalLight ref={sunRef} position={[5, 6, 4]} intensity={1.4} color={DAY_SUN} />
      <pointLight ref={rimRef} position={[0, 0.5, 2]} intensity={0.6} color="#16c7ff" distance={8} />
    </>
  );
}
