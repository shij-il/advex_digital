import { ADDRESS, BRAND, EMAIL, INSTAGRAM_URL, MAPS_URL, TAGLINE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-bd bg-black/80 px-5 pb-4 pt-8 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={BRAND} className="h-8 w-auto rounded" />
            <p className="font-head text-base font-bold tracking-[0.25em] text-white">ADVEX DIGITAL</p>
          </div>
          <p className="mt-2 max-w-xs text-xs text-muted">{TAGLINE}</p>
        </div>
        <div className="space-y-1 text-xs">
          <p className="text-[10px] font-bold tracking-widest text-cy">ENQUIRIES</p>
          <a href={`mailto:${EMAIL}`} className="block break-all font-semibold text-white hover:text-cy">{EMAIL}</a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="block font-semibold text-white hover:text-cy">{ADDRESS}</a>
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-xs font-semibold text-muted hover:text-white md:text-right">
          Instagram ↗
        </a>
      </div>
      <p className="mx-auto mt-5 max-w-6xl border-t border-bd pt-3 text-center text-[11px] text-muted">
        © 2026 {BRAND}. All rights reserved.
      </p>
    </footer>
  );
}
