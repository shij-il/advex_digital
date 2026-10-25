"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { samplePose } from "@/lib/choreography";

/**
 * Camera director. Each frame it reads the pose for the current scroll
 * position (lib/choreography.ts) and glides the camera towards it, with a
 * little pointer / touch / tilt parallax on top.
 */
export default function Rig() {
  const { camera, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const look = useRef(new THREE.Vector3(0, 0, 0));

  // Wider field of view on phones so the billboard still fits.
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = size.width < 768 ? 65 : 45;
    cam.updateProjectionMatrix();
  }, [camera, size.width]);

  // Pointer parallax on desktop; also fed by touchmove / device-orientation
  // listeners registered in Experience.tsx.
  useEffect(() => {
    function onMove(e: PointerEvent) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    const p = samplePose(window.scrollY, size.width, size.height);
    const k = 1 - Math.exp(-dt * 3);
    const m = mouse.current;
    camera.position.x += (p.cam[0] + m.x * 0.4 - camera.position.x) * k;
    camera.position.y += (p.cam[1] - m.y * 0.25 - camera.position.y) * k;
    camera.position.z += (p.cam[2] - camera.position.z) * k;
    look.current.x += (p.look[0] - look.current.x) * k;
    look.current.y += (p.look[1] - look.current.y) * k;
    look.current.z += (p.look[2] - look.current.z) * k;
    camera.lookAt(look.current);
  });

  return null;
}
