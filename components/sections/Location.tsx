import { MAPS_URL, VENUE_URL, VENUE } from "@/lib/site";

const NEARBY = [
  ["HiLITE Centre Mannarkkad", "Major upcoming shopping & entertainment destination"],
  ["MES Kalladi College & Higher Secondary School", "Right nearby"],
  ["Mannarkkad Town", "Convenient access for local visitors"],
  ["Palakkad–Kozhikode Highway", "Connects Mannarkkad with surrounding towns"],
] as const;

export default function Location() {
  return (
    <section id="location" className="relative z-10 flex items-center justify-center px-5 py-24 lg:min-h-[110vh]">
      <div className="glass mx-auto grid w-full max-w-6xl gap-8 rounded-3xl p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
        {/* Location view */}
        <figure data-reveal="left" className="relative aspect-[1480/1063] w-full self-center overflow-hidden rounded-2xl border border-bd">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-parallax-img
            src="/location.jpg"
            alt={`${VENUE}, Mannarkad at night, where the Advex Digital LED screen is installed`}
            className="h-full w-full object-cover object-[72%_50%]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-sm text-white">
            <span className="font-semibold">{VENUE}</span>, Mannarkkad — our screen location
          </figcaption>
        </figure>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-semibold tracking-widest text-cy">LOCATION</p>
          <h2 data-heading className="mb-4 font-head text-3xl font-bold text-white sm:text-4xl">
            Everything you need, right around you
          </h2>
          <p className="text-muted">
            Our LED screen sits at Cravio Food Court, in the heart of Mannarkkad — surrounded by colleges,
            shopping mall and the main highway, so your brand is seen by families, students and
            commuters every single day.
          </p>

          <ul className="mt-6 space-y-3">
            {NEARBY.map(([t, d]) => (
              <li key={t} data-reveal="up" className="flex gap-3 rounded-xl border border-bd bg-black/40 p-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cy" />
                <span>
                  <span className="block text-sm font-semibold text-white">{t}</span>
                  <span className="block text-xs text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>

          <div data-reveal="up" className="mt-6 flex flex-wrap gap-3">
            <a href={MAPS_URL} target="_blank" rel="noreferrer"
               className="rounded-full bg-gradient-to-r from-bl to-cy px-6 py-3 text-sm font-semibold text-white">
              Open in Google Maps ↗
            </a>
            <a href={VENUE_URL} target="_blank" rel="noreferrer"
               className="rounded-full border border-bd bg-black/40 px-6 py-3 text-sm font-semibold text-white hover:border-cy">
              About Cravio ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
