# Advex Digital: scroll-driven 3D LED billboard website

Next.js 14 (App Router) · React Three Fiber · drei · GSAP ScrollTrigger · Lenis · Tailwind CSS

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Contact form setup (Resend)
The contact form posts to `app/api/contact/route.ts`, which emails each enquiry to you through [Resend](https://resend.com).

1. Create a Resend account with the email that should receive enquiries.
2. In Resend, open **API Keys → Create API Key** (Sending access) and copy the key (starts with `re_`).
3. In the project root (next to `package.json`) create `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO=ads.advexdigital@gmail.com
   # Optional, once you verify your own domain in Resend:
   # CONTACT_FROM=Advex Website <contact@yourdomain.com>
   ```
4. Restart `npm run dev`. The file is only read when the server starts.

Notes
- Without a verified domain, Resend only delivers to the email you signed up with, and mail comes from `onboarding@resend.dev`. Create a Gmail filter (From: `onboarding@resend.dev` → Never send to Spam) so enquiries reach your inbox.
- Spam protection: a hidden trap field plus a limit of 5 messages per visitor every 10 minutes.
- Never commit `.env.local`. It is already ignored by git.

## Deploy (Vercel)
1. Push the project to GitHub.
2. Import the repository on [vercel.com](https://vercel.com); Next.js is detected automatically.
3. Add `RESEND_API_KEY` and `CONTACT_TO` under **Settings → Environment Variables**, then deploy.
4. Submit the contact form once on the live site to confirm the email arrives.

## Sections (in order)
Hero · Marquee · Advertising · City · Our Screen · Location · Packages · How It Works · FAQ · Contact · Footer

- **Hero**: headline over the 3D billboard. The screen shows the intro poster, then plays the logo intro followed by the city clip, on a loop.
- **City**: pinned scene where a framed city video expands to full screen. Phones get a portrait video; larger screens get an HD one.
- **Packages**: Opening, Booster, Season and Landmark. Pinned horizontal scroll on screens 1024px and wider; stacked cards below that.
- **Contact**: WhatsApp, Call and Instagram cards plus the message form.
- A fixed Nav and a floating Back-to-Top button sit on top of every section.

## Scroll script
See `SCROLL-CHOREOGRAPHY.md` for what happens in every section and how to edit it.

## Features
- 3D billboard that moves between poses as you scroll (`lib/choreography.ts`) with day-to-night lighting (`lib/mood.ts`)
- Smooth scrolling (Lenis), loading intro, pinned walkthroughs, word-by-word headlines, price count-up, soft cursor
- Reduced-motion fallback and automatic quality drop on slow devices (drei `PerformanceMonitor`)
- Phones that block autoplay start the videos on the first touch

## Where to edit
| What | File |
|---|---|
| Package names, prices, features | `lib/packages.ts` |
| WhatsApp number and message | `lib/whatsapp.ts` |
| Brand, tagline, email, Instagram, Maps and venue links | `lib/site.ts` |
| Hero headline | `components/sections/Hero.tsx` |
| Contact cards and form | `components/sections/Contact.tsx` |
| Email delivery | `app/api/contact/route.ts` |
| Camera and billboard position per section | `lib/choreography.ts` |
| Logo (navbar, footer, loader) | `public/logo.png` (transparent PNG) |
| Location photo | `public/location.jpg` |

## Videos (`public/video/`)
| File | Used for |
|---|---|
| `intro.mp4`, `crowd.mp4` | Billboard screen (small files) |
| `crowd-hd.mp4` | City section on tablets and computers |
| `crowd-m.mp4` | City section on phones (portrait) |
| `intro-poster.jpg` | Still shown on the billboard before the video starts |
| `crowd-poster.jpg`, `crowd-poster-m.jpg` | Stills shown in the City section while the video loads |

Keep videos H.264, muted, with `faststart`, so they play on iPhones.

## Troubleshooting
- **"Message service is not set up yet"**: `.env.local` is missing or the server was not restarted.
- **No email arrives**: check Resend → Emails for the delivery status, then your Spam folder.
- **Video waits for a tap on a phone**: some phones (for example in Low Power Mode) block autoplay until the first touch. This is a phone restriction.

## To do
- Replace the city clip with local Mannarkad footage (1080p or higher) in `public/video/`
- Verify your own domain in Resend so emails come from your own address
- Optional: a GLTF billboard model