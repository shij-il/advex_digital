"use client";

import { useState } from "react";
import { waLink } from "@/lib/whatsapp";

const LINKS = [
  ["Advertising", "#advertise"], ["Our Screen", "#screen"], ["Location", "#location"],
  ["Packages", "#packages"], ["How It Works", "#how"], ["FAQ", "#faq"], ["Contact", "#contact"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-bd bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="flex items-center gap-3">
            <img src="/logo.png" alt="Advex Digital" className="h-10 w-auto rounded" />
            <span className="hidden font-head text-sm font-bold tracking-[0.25em] text-white sm:inline">ADVEX DIGITAL</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} className="transition-colors hover:text-white">{l}</a>
          ))}
        </div>
        <a href={waLink()} target="_blank" rel="noreferrer"
           className="hidden rounded-full bg-gradient-to-r from-bl to-cy px-5 py-2.5 text-sm font-semibold text-white lg:inline-block">
          BOOK YOUR AD →
        </a>
        <button onClick={() => setOpen((o) => !o)} className="text-2xl text-white lg:hidden" aria-label="Toggle menu">☰</button>
      </div>
      {open && (
        <div className="flex flex-col gap-4 px-5 pb-5 text-sm text-muted lg:hidden">
          {LINKS.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href={waLink()} target="_blank" rel="noreferrer" className="font-semibold text-cy">BOOK YOUR AD →</a>
        </div>
      )}
    </nav>
  );
}
