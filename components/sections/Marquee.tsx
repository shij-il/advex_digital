const ITEMS = ["Shops", "Restaurants", "Real estate", "Events", "Education", "Salons", "Jewellers", "Clinics", "Startups"];

/** Slow scrolling strip: who advertises on the screen. */
export default function Marquee() {
  return (
    <div aria-hidden className="relative z-10 overflow-hidden border-y border-bd bg-black/60 py-4 backdrop-blur">
      <div className="marquee flex w-max">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="mr-10 flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
            {t}
            <span className="text-cy">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
