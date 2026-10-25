# Scroll script: what happens as you scroll

| # | Section (id) | What the visitor sees |
|---|---|---|
| 0 | Loading intro | Logo + progress line (~1.6 s). When it ends: the billboard spins in, its screen starts the video loop, the hero text slides in. |
| 1 | Hero (`hero`) | Headline words slide up one by one. The billboard (right) shows the intro poster, then plays: logo intro → city clip → logo intro … The camera drifts in as you scroll. |
| – | Marquee | Slow strip of who advertises: shops, restaurants, real estate… |
| 2 | Advertising (`advertise`) | "Problem" card slides in from the left and fades to grey; "Solution" card slides in from the right, grows and glows. |
| 3 | The City (`city`) | PINNED. The city video starts loading about 1.5 screens before the section, so it is already playing on arrival. It begins as a small framed window and expands to full screen; the caption fades in. Billboard steps back. |
| 4 | Our Screen (`screen`) | PINNED on desktop: scrolling steps through 4 features (big number + text on the left, cards on the right, progress bar on top) while the light goes day → night. Phone/tablet: normal stacked cards. |
| 5 | Location (`location`) | The Cravio photo slides in (full photo, shown in its natural shape on every device), heading wipes in, nearby places stagger in. 3D pin appears only here. |
| 6 | Packages (`packages`) | Four plans: Opening, Booster, Season, Landmark. Desktop (1024px and wider): cards scroll sideways if they don't fit. Phone/tablet: cards rise in one by one. Prices count up. |
| 7 | How It Works (`how`) | A line draws down the timeline and lights up each of the 6 steps as it reaches them. |
| 8 | FAQ (`faq`) | Calm: heading, then questions rise in one by one. |
| 9 | Contact (`contact`) | Headline words slide up; Quick Connect (WhatsApp, Call, Instagram) slides from the left, the message form from the right. Submitting shows "Sending…", then a thank-you message once the email has been sent. |

Always on: smooth scrolling (Lenis), gradient progress bar at the top, side dots (desktop), nav highlight,
soft cursor ring + magnetic buttons (desktop mouse only), Back-to-Top button, grain + glow background.

## Videos and autoplay on phones
Some phones (for example iPhones in Low Power Mode) block autoplay until the visitor's first touch.
- **Billboard**: keeps showing the intro poster, then starts the video quietly on the first touch.
- **City section**: retries every 0.7 s while it is on screen; if the phone still refuses, a round play button appears in the middle of the video.

## Where to change things
- **Billboard video**: replace `public/video/intro.mp4` and `crowd.mp4` (keep them H.264, muted, ~1280×704 / 16:9, with `faststart`).
  The order/loop and the still poster are in `components/canvas/Billboard.tsx` (`useScreenMedia`, `makeLogoTexture`).
  The still shown before the video starts is `public/video/intro-poster.jpg`.
- **City section video**: `components/sections/CityBand.tsx`. Phones load `public/video/crowd-m.mp4` (portrait) and `crowd-poster-m.jpg`;
  larger screens load `crowd-hd.mp4` and `crowd-poster.jpg`. Start-early distance: `start: "top bottom+=150%"`.
- **Camera / billboard position per section**: `lib/choreography.ts` (x left/right, y up/down, z near/far, s size, ry turn).
- **Day/night mood per section**: `lib/mood.ts`.
- **Text animations**: add `data-reveal="up|left|right|scale"`, or use `<Words>` (`components/ui/Words.tsx`) for headlines.
  `text` uses `\n` for line breaks; `accent` is the number of trailing words, taken from the last line, painted with the gradient.
  Logic: `components/layout/ScrollFX.tsx`.
- **Pinned scenes**: `CityBand.tsx` (zoom), `OurScreen.tsx` (4 steps), `Packages.tsx` (sideways cards).
  Change how long they stay pinned with the `end: "+=140%"` / `"+=260%"` values.
- **Packages and prices**: `lib/packages.ts`.
- **Contact cards, form and email**: `components/sections/Contact.tsx` and `app/api/contact/route.ts` (needs `.env.local`, see README).
- **Smooth-scroll feel**: `components/layout/SmoothScroll.tsx` (`duration`).
- **Loading time**: `components/layout/Preloader.tsx` (1500 ms minimum).
- People who have "reduce motion" turned on get no smooth scroll, no entrance animations, no pins, and a still poster instead of video.