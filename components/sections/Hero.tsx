import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";
import { waLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[130vh] items-start justify-center px-5 pt-[6vh]"
    >
      {/* min-h is taller than the viewport on purpose — the extra scroll
          distance is what the camera / billboard glide through. */}
      <div className="glass sticky top-[44vh] mx-auto w-full max-w-3xl rounded-3xl px-6 py-8 text-center sm:px-10 sm:py-12 lg:top-[18vh] lg:ml-[4vw] lg:mr-auto lg:max-w-xl lg:text-left">
        <span data-hero-in className="mb-6 inline-flex items-center gap-2 rounded-full border border-bd bg-black/40 px-3 py-1.5 text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cy" />
          LIVE LED SCREEN — Cravio Food Court, Mannarkad
        </span>
        <Words
          as="h1"
          hero
          text={"WHERE YOUR\nBRAND TAKES\nThe Spotlight."}
          accent="The Spotlight."
          lineClasses={[
            "mb-2 font-tag text-[0.38em] font-medium tracking-[0.38em]",
            "font-display font-bold",
            "font-spot text-[1.12em] font-normal italic leading-[1.05]",
          ]}
          className="glow-text whitespace-nowrap text-[1.7rem] leading-[1.12] tracking-tight text-white sm:text-5xl"
        />
        <p data-hero-in className="mx-auto mt-6 max-w-md text-base text-muted sm:text-lg lg:mx-0">
          Advex Digital puts your business on a premium outdoor LED screen in Mannarkad — seen by
          thousands, every single day.
        </p>
        <div data-hero-in className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Magnetic>
            <a href="#packages" className="inline-block rounded-full bg-gradient-to-r from-bl to-cy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-bl/30">
              View packages
            </a>
          </Magnetic>
          <Magnetic>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-white/25 bg-black/40 px-6 py-3 text-sm font-semibold text-white hover:border-cy">
              Book via WhatsApp
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}