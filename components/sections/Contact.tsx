"use client";

import { useState, type ReactNode } from "react";
import { waLink, PHONE } from "@/lib/whatsapp";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

const DISPLAY_PHONE = `+91 ${PHONE.slice(2, 7)} ${PHONE.slice(7)}`;
const line =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base text-white placeholder:text-white/50 focus:border-cy focus:outline-none";

function Card({ href, title, sub, icon, external = true }: { href: string; title: string; sub: string; icon: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-bd bg-black/40 p-4 transition hover:border-cy hover:bg-black/60 sm:p-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bl/20 text-cy">{icon}</span>
      <span className="min-w-0">
        <span className="block font-head text-lg font-bold text-white sm:text-xl">{title}</span>
        <span className="block break-words text-sm text-muted">{sub}</span>
      </span>
    </a>
  );
}

const ic = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", biz: "", msg: "", hp: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErr("");
    try {
      // Spam trap: real visitors never fill the hidden field.
      if (form.hp) {
        setStatus("sent");
        return;
      }
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New enquiry from Advex Digital website",
          from_name: "Advex Digital Website",
          name: form.name,
          phone: form.phone,
          business: form.biz || "-",
          message: form.msg,
          botcheck: "",
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.success) throw new Error(d.message || "Something went wrong.");
      setStatus("sent");
      setForm({ name: "", phone: "", biz: "", msg: "", hp: "" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative z-10 px-5 py-24">
      <div className="mx-auto mb-10 max-w-6xl text-center">
        <div data-reveal="up" className="glass inline-block rounded-2xl px-6 py-5 sm:px-10">
          <p className="mb-2 text-xs font-semibold tracking-widest text-cy">CONTACT</p>
          <h2 data-heading className="font-head text-3xl font-bold text-white sm:text-4xl">Let&apos;s get your brand on screen</h2>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div data-reveal="left" className="glass rounded-[2rem] p-6 sm:p-10">
          <p className="mb-6 text-xs font-bold tracking-[0.2em] text-white/60">QUICK CONNECT</p>
          <div className="space-y-4">
            <Card href={waLink()} title="WhatsApp" sub="Instant Response"
              icon={<svg {...ic}><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z" /></svg>} />
            <Card href={`tel:+${PHONE}`} external={false} title="Call Us" sub={`Direct Line · ${DISPLAY_PHONE}`}
              icon={<svg {...ic}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>} />
            <Card href={INSTAGRAM_URL} title="Instagram" sub={`Follow ${INSTAGRAM_HANDLE}`}
              icon={<svg {...ic}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>} />
          </div>
        </div>

        <form onSubmit={submit} data-reveal="right" className="glass relative rounded-[2rem] border-bl p-6 sm:p-10" style={{ borderColor: "#1f5bff" }}>
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-white/60">DROP A MESSAGE</p>
          <div className="space-y-3">
            <input required aria-label="Name" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={line} />
            <input required type="tel" aria-label="Phone" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={line} />
            <input aria-label="Business name" placeholder="Business name (optional)" value={form.biz} onChange={(e) => setForm({ ...form, biz: e.target.value })} className={line} />
            <textarea required rows={3} aria-label="Your goals" placeholder="Tell us your goals" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} className={`${line} resize-none`} />
          </div>
          <input
            name="hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.hp}
            onChange={(e) => setForm({ ...form, hp: e.target.value })}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <button
            disabled={status === "sending"}
            className="mt-8 font-head text-xl font-bold transition hover:text-cy disabled:opacity-60"
            style={{ color: "#2f6bff" }}
          >
            {status === "sending" ? "Sending…" : "Submit →"}
          </button>
          {status === "sent" && (
            <p className="mt-4 text-sm text-cy">Thank you! We&apos;ve received your message and will contact you shortly.</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">
              {err}{" "}
              <a href={waLink()} className="underline">Message us on WhatsApp</a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}