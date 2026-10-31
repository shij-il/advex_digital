# Advex Digital: scroll-driven 3D LED billboard website

Next.js (App Router) · React Three Fiber · drei · GSAP ScrollTrigger · Lenis · Tailwind CSS

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Contact form setup (Web3Forms)
The contact form sends enquiries straight from the browser to [Web3Forms](https://web3forms.com), which emails them to you. No server code is needed.

1. On web3forms.com, enter the email that should receive enquiries and copy the access key they send you.
2. In the project root (next to `package.json`) create `.env.local`:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```
3. Restart `npm run dev`. The file is only read when the server starts.
4. On your host, add the same variable under Environment Variables, then rebuild. It is baked in at build time.

Notes
- The access key is public by design: it can only send email to your inbox.
- The free plan allows 250 submissions a month. Turn on hCaptcha in the Web3Forms dashboard to keep spam from using it up.
- Spam protection in the code: a hidden trap field that real visitors never fill.
- If emails land in Spam, create a Gmail filter for the Web3Forms sender so they reach your inbox.
- Never commit `.env.local`. It is already ignored by git.

## Deploy
The site is built as plain static files, so it can be hosted almost anywhere (GitHub Pages, Cloudflare Pages, Netlify, Vercel, Hostinger).

1. In `next.config.mjs`, set `output: "export"` and `images: { unoptimized: true }`.
2. Run `npm run build`. The finished site is in the `out` folder.
3. Upload the contents of `out` to your host (or connect the GitHub repository and set the build command to `npm run build` and the output folder to `out`).
4. Add `NEXT_PUBLIC_WEB3FORMS_KEY` as an environment variable on the host before building.
5. Submit the contact form once on the live site to confirm the email arrives.

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
- **Form shows an error**: `NEXT_PUBLIC_WEB3FORMS_KEY` is missing in `.env.local` or on your host, or the server was not restarted (or the site not rebuilt) after adding it.
- **No email arrives**: check the Web3Forms dashboard, then your Spam folder. The free plan stops at 250 submissions a month.
- **Video waits for a tap on a phone**: some phones (for example in Low Power Mode) block autoplay until the first touch. This is a phone restriction.