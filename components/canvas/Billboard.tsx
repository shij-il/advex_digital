"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { samplePose } from "@/lib/choreography";
import { onReady } from "@/lib/ready";

/**
 * Still image shown on the screen until the video starts (and for reduced-motion
 * users / if video fails). It is the intro poster; if that can't load it falls
 * back to the transparent logo, then to plain text.
 */
function makeLogoTexture() {
  const W = 1024, H = 576;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const paint = (img?: HTMLImageElement, cover = true) => {
    ctx.fillStyle = "#05070d";
    ctx.fillRect(0, 0, W, H);
    if (img && img.naturalWidth) {
      const r = img.naturalWidth / img.naturalHeight;
      let w = H * r, h = H;
      if (!cover) { h = H * 0.85; w = h * r; }
      else if (w < W) { w = W; h = W / r; }
      ctx.drawImage(img, W / 2 - w / 2, H / 2 - h / 2, w, h);
    } else {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 96px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ADVEX", W / 2, H / 2 + 30);
    }
    tex.needsUpdate = true;
  };
  paint();
  const load = (src: string, cover: boolean, onFail?: () => void) => {
    const img = new Image();
    img.onload = () => paint(img, cover);
    img.onerror = () => onFail?.();
    img.src = src;
  };
  load("/video/intro-poster.jpg", true, () => load("/logo.png", false));
  return tex;
}

/** Fine LED-pixel grid laid over the screen for realism. */
function makePixelGrid() {
  const c = document.createElement("canvas");
  c.width = c.height = 8;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "rgba(0,0,0,0.26)";
  ctx.fillRect(7, 0, 1, 8);
  ctx.fillRect(0, 7, 8, 1);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(160, 88);
  return t;
}

/**
 * The billboard screen plays, on a loop:  logo intro  ->  city/crowd clip  ->  logo intro ...
 * (public/video/intro.mp4 and crowd.mp4). Playback starts when the loading intro ends.
 * Falls back to the still logo if video can't play.
 */
function useScreenMedia(matRef: React.RefObject<THREE.MeshBasicMaterial>) {
  const logo = useMemo(() => makeLogoTexture(), []);

  useEffect(() => {
    const mat = matRef.current;
    if (!mat) return;
    mat.map = logo;
    mat.needsUpdate = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mk = (src: string) => {
      const v = document.createElement("video");
      v.src = src;
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.setAttribute("muted", "");
      v.preload = "auto";
      v.setAttribute("webkit-playsinline", "");
      Object.assign(v.style, { position: "fixed", left: "0", top: "0", width: "160px", height: "90px", opacity: "0.02", pointerEvents: "none", zIndex: "-1" });
      document.body.appendChild(v);
      return v;
    };
    const tx = (v: HTMLVideoElement) => {
      const t = new THREE.VideoTexture(v);
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      return t;
    };
    const intro = mk("/video/intro.mp4");
    const crowd = mk("/video/crowd.mp4");
    const tIntro = tx(intro);
    const tCrowd = tx(crowd);
    let alive = true;
    let current: HTMLVideoElement | null = null;

    const play = (which: "intro" | "crowd") => {
      if (!alive) return;
      const v = which === "intro" ? intro : crowd;
      v.currentTime = 0;
      const p = v.play();
      if (p) {
        p.then(() => {
          if (!alive) return;
          current = v;
          mat.map = which === "intro" ? tIntro : tCrowd;
          mat.needsUpdate = true;
        }).catch(() => {
          // Autoplay blocked (e.g. iOS Low Power Mode): keep the still poster
          // and quietly start the video on the visitor's first touch.
          if (!alive || current) return;
          const retry = () => {
            ["touchend", "pointerup", "click"].forEach((e) => window.removeEventListener(e, retry));
            if (alive && !current) play(which);
          };
          ["touchend", "pointerup", "click"].forEach((e) => window.addEventListener(e, retry, { passive: true }));
        });
      }
    };
    intro.onended = () => play("crowd");
    crowd.onended = () => play("intro");
    const fail = () => {
      mat.map = logo;
      mat.needsUpdate = true;
    };
    intro.onerror = fail;
    crowd.onerror = fail;

    const vis = () => {
      if (!current) return;
      if (document.hidden) current.pause();
      else current.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", vis);
    let readyFired = false;
    const off = onReady(() => { readyFired = true; play("intro"); });
    // iOS sometimes accepts autoplay only once the media is buffered.
    intro.addEventListener("canplay", () => { if (readyFired && !current) play("intro"); }, { once: true });

    return () => {
      alive = false;
      off();
      document.removeEventListener("visibilitychange", vis);
      [intro, crowd].forEach((v) => {
        v.pause();
        v.removeAttribute("src");
        v.load();
        v.remove();
      });
      tIntro.dispose();
      tCrowd.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function Billboard() {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const intro = useRef({ v: 0 });
  const grid = useMemo(() => makePixelGrid(), []);
  useScreenMedia(matRef);

  // Entrance: the billboard spins and grows in when the loading intro ends.
  useEffect(() => {
    let tween: gsap.core.Tween | null = null;
    const off = onReady(() => {
      tween = gsap.to(intro.current, { v: 1, duration: 1.8, ease: "power3.out" });
    });
    return () => {
      off();
      tween?.kill();
    };
  }, []);

  // Glide towards the pose of the current section (lib/choreography.ts).
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const p = samplePose(window.scrollY, state.size.width, state.size.height).bb;
    const k = 1 - Math.exp(-dt * 3.2);
    const v = intro.current.v;
    const t = state.clock.elapsedTime;

    g.position.x += (p.x - g.position.x) * k;
    g.position.y += (p.y + Math.sin(t * 0.8) * 0.06 - g.position.y) * k;
    g.position.z += (p.z - g.position.z) * k;
    g.scale.setScalar(g.scale.x + (p.s * (0.55 + 0.45 * v) - g.scale.x) * k);
    g.rotation.y += (p.ry + Math.sin(t * 0.3) * 0.07 + (1 - v) * 1.1 - g.rotation.y) * k;
    g.rotation.x += (p.rx - g.rotation.x) * k;
  });

  return (
    <group ref={ref} scale={0.5}>
      <mesh>
        <boxGeometry args={[4.4, 2.6, 0.2]} />
        <meshStandardMaterial color="#0b0d10" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[4.0, 2.2, 0.02]} />
        <meshBasicMaterial ref={matRef} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.122]}>
        <planeGeometry args={[4.0, 2.2]} />
        <meshBasicMaterial map={grid} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 2.6, 16]} />
        <meshStandardMaterial color="#1a1f27" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}