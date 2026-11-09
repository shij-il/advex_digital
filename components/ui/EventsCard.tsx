import { waEventLink } from "@/lib/whatsapp";

const EVENTS = [
  "Birthdays",
  "Weddings",
  "Anniversaries",
  "Graduations",
  "Baby Showers",
  "Inaugurations",
  "Festival Greetings",
  "Farewells & Parties",
];

export default function EventsCard() {
  return (
    <div
      data-reveal="up"
      className="glass relative overflow-hidden rounded-[1.4rem] border border-[#8B5CF6]/45 p-6 sm:p-9 lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-10 lg:px-10 lg:py-9"
    >
      {/* soft violet / blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(420px 220px at 100% 0, rgba(139,92,246,.28), transparent 70%), radial-gradient(360px 200px at 0 100%, rgba(37,99,255,.22), transparent 70%)",
        }}
      />

      <div className="relative">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#c4a8ff]">
          EVENTS &amp; FUNCTIONS
        </p>
        <h3 className="mt-3 font-head text-2xl font-bold leading-[1.1] text-white sm:text-3xl">
          Not just for brands.{" "}
          <span className="bg-gradient-to-r from-cy to-[#8B5CF6] bg-clip-text text-transparent">
            Celebrate on the big screen.
          </span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
          Our LED screen also shows your special moments to the Cravio crowd.
          Share your celebration, announcement or greeting in front of hundreds
          of visitors every evening.
        </p>

        <div className="mt-6 hidden lg:block">
          <Cta />
        </div>
      </div>

      <ol className="relative mt-7 grid grid-cols-2 gap-x-5 lg:mt-0 lg:gap-x-7">
        {EVENTS.map((e, i) => (
          <li
            key={e}
            className="flex items-center gap-3 border-b border-white/10 py-3.5 text-[13px] font-medium text-white/90 sm:text-sm"
          >
            <span className="min-w-[20px] text-[11px] font-semibold tracking-[0.12em] text-cy">
              {String(i + 1).padStart(2, "0")}
            </span>
            {e}
          </li>
        ))}
      </ol>

      {/* phone / tablet: button after the list */}
      <div className="relative mt-7 lg:hidden">
        <Cta />
      </div>
    </div>
  );
}

function Cta() {
  return (
    <>
      <a
        href={waEventLink()}
        target="_blank"
        rel="noreferrer"
        className="block rounded-full bg-gradient-to-r from-bl to-[#8B5CF6] px-6 py-3 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02] lg:inline-block"
      >
        Ask about event slots →
      </a>
      <p className="mt-3 text-center text-xs text-muted lg:text-left">
        Custom duration · Quote shared on WhatsApp
      </p>
    </>
  );
}