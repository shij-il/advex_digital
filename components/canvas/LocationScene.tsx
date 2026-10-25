"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Particles({ count = 160 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 4 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#16c7ff" transparent opacity={0.6} />
    </points>
  );
}

function PulsingPin() {
  const ref = useRef<THREE.Mesh>(null);
  const grp = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    // The pin only appears while the Location section is on screen.
    if (grp.current) {
      const want = document.documentElement.dataset.section === "location" ? 1 : 0;
      const k = 1 - Math.exp(-dt * 4);
      grp.current.scale.setScalar(grp.current.scale.x + (want - grp.current.scale.x) * k);
      grp.current.visible = grp.current.scale.x > 0.02;
    }
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.18;
    ref.current.scale.setScalar(s);
  });
  return (
    <group ref={grp} position={[0, 0.6, 0]} scale={0}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#16c7ff"
          emissive="#16c7ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* HTML label kept perfectly pinned to the 3D marker's position */}
      <Html position={[0, 0.5, 0]} center distanceFactor={8} occlude>
        <div className="glass px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">
          📍 Cravio, Mannarkad
        </div>
      </Html>
    </group>
  );
}

export default function LocationScene() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        groupRef.current!.scale,
        { x: 0.6, y: 0.6, z: 0.6 },
        {
          x: 1,
          y: 1,
          z: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#location",
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef} position={[0, -1.4, -1]}>
      <gridHelper args={[14, 28, "#2563FF", "#16233a"]} />
      <Particles />
      <PulsingPin />
    </group>
  );
}
