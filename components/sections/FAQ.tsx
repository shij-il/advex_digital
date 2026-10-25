"use client";

import { useState } from "react";

const FAQS = [
  { q: "How much does a campaign cost?", a: "Packages start at ₹7,999 for 15 days. See the Packages section above for full pricing." },
  { q: "What creative formats are accepted?", a: "High-resolution images and video files, sized to our screen's aspect ratio. We'll guide you after booking." },
  { q: "How long can a campaign run?", a: "From 15 days up to 180 days, renewable at the end of each term." },
  { q: "How do I book a slot?", a: "Choose a package, confirm availability and payment with our team on WhatsApp, then submit your creative." },
  { q: "Can I change my ad mid-campaign?", a: "Yes — contact our team on WhatsApp to update your creative or schedule." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative z-10 px-5 py-28">
      <div className="mx-auto max-w-3xl">
        <div data-reveal="up" className="glass mb-8 inline-block rounded-2xl px-6 py-4">
          <p className="mb-2 text-xs font-semibold tracking-widest text-cy">FAQ</p>
          <h2 className="font-head text-3xl font-bold text-white">Common questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} data-reveal="up" className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white"
              >
                {f.q}
                <span className={`text-xl text-cy transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className="grid transition-all duration-300" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
