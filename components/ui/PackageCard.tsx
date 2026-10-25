"use client";

import { useRef } from "react";
import type { Package } from "@/lib/packages";
import { waLink } from "@/lib/whatsapp";
import CountUp from "@/components/ui/CountUp";

export default function PackageCard({ pkg }: { pkg: Package }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function tiltAt(clientX: number, clientY: number) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (clientX - r.left) / r.width - 0.5;
    const y = (clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${
      -y * 10
    }deg) translateY(-6px)`;
  }
  function reset() {
    if (cardRef.current) cardRef.current.style.transform = "";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => tiltAt(e.clientX, e.clientY)}
      onMouseLeave={reset}
      className={`glass relative flex h-full w-full flex-col rounded-2xl p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-bl/30 hover:border-cy ${
        pkg.popular ? "border-cy" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-cy px-3 py-1 text-xs font-bold text-black">
          MOST POPULAR
        </span>
      )}
      <p className="mt-2 font-head text-xl font-bold">{pkg.name}</p>
      <p className="mb-3 text-sm text-muted">{pkg.duration}</p>
      <p className="gtext mb-4 text-3xl font-bold">
        <CountUp to={pkg.price} />
      </p>
      <ul className="mb-6 flex-1 space-y-2 text-sm text-muted">
        {pkg.features.map((f) => (
          <li key={f}>✓ {f}</li>
        ))}
      </ul>
      <a
        href={waLink(pkg)}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-gradient-to-r from-bl to-cy py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02]"
      >
        Book via WhatsApp
      </a>
    </div>
  );
}
