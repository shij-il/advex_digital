import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Very small in-memory limiter: 5 messages per IP every 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (typeof data.hp === "string" && data.hp.trim() !== "") {
    console.warn("[contact] spam trap triggered, message not sent");
    return NextResponse.json({ ok: true });
  }

  const name = String(data.name ?? "").trim().slice(0, 100);
  const phone = String(data.phone ?? "").trim().slice(0, 30);
  const biz = String(data.biz ?? "").trim().slice(0, 120);
  const msg = String(data.msg ?? "").trim().slice(0, 2000);

  if (name.length < 2 || msg.length < 3 || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ ok: false, error: "Please fill in your name, phone number and message." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO is not set");
    return NextResponse.json({ ok: false, error: "Message service is not set up yet." }, { status: 500 });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
      <h2 style="margin:0 0 12px">New website enquiry</h2>
      <p><b>Name:</b> ${esc(name)}</p>
      <p><b>Phone:</b> <a href="tel:${esc(phone)}">${esc(phone)}</a></p>
      <p><b>Business:</b> ${esc(biz) || "-"}</p>
      <p><b>Message:</b><br>${esc(msg).replace(/\n/g, "<br>")}</p>
    </div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Advex Website <onboarding@resend.dev>",
        to: [to],
        subject: `New enquiry from ${name}`,
        html,
        text: `Name: ${name}\nPhone: ${phone}\nBusiness: ${biz || "-"}\n\n${msg}`,
      }),
    });
    if (!r.ok) {
      console.error("[contact] Resend error", r.status, await r.text());
      return NextResponse.json({ ok: false, error: "Could not send your message. Please use WhatsApp instead." }, { status: 502 });
    }
    const sent = await r.json().catch(() => ({}));
    console.log("[contact] sent via Resend, id:", (sent as { id?: string }).id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] send failed", e);
    return NextResponse.json({ ok: false, error: "Could not send your message. Please use WhatsApp instead." }, { status: 502 });
  }
}