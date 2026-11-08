import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Montserrat, Playfair_Display, DM_Serif_Display } from "next/font/google";
// @ts-ignore -- Next.js processes this stylesheet import at build time.
import "./globals.css";

const head = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-head",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Tagline: small spaced first line
const tag = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-tag",
});

// Tagline: "BRAND TAKES" line (also the footer tagline in italic)
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// Tagline: "The Spotlight." line
const spot = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-spot",
});

const SITE_URL = "https://advexdigital.com";
const TITLE = "Advex Digital | LED Screen Advertising in Mannarkad, Kerala";
const DESCRIPTION =
  "Advex Digital offers outdoor LED screen advertising in Cravio, Mannarkad (Mannarkkad), Kerala. Promote your shop, brand or event on a premium portrait LED display at Cravio Food Court.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Advex Digital",
  
  keywords: [
    // Brand keywords
    "Advex Digital",
    "Advex Digital Mannarkkad",
    "Advex Digital Kerala",

    // Primary service keywords
    "LED advertising",
    "LED advertising agency",
    "digital advertising",
    "digital advertising agency",
    "outdoor LED advertising",
    "outdoor advertising agency",
    "digital billboard advertising",
    "LED screen advertising",
    "digital display advertising",
    "LED display advertising",
    "advertising screen rental",
    "business advertising",
    "brand promotion",
    "video advertising",

    // Location-based keywords
    "LED advertising Mannarkkad",
    "LED advertising Mannarkad",
    "LED advertising agency Mannarkkad",
    "digital advertising Mannarkkad",
    "advertising agency Mannarkkad",
    "outdoor advertising Mannarkkad",
    "digital billboard Mannarkkad",
    "LED screen advertising Mannarkkad",
    "advertising in Mannarkkad",
    "advertising in Mannarkad",
    "business promotion Mannarkkad",
    "LED advertising Palakkad",
    "digital advertising Palakkad",
    "outdoor advertising Kerala",

    // Location and venue keywords
    "Cravio Food Court Mannarkkad",
    "Cravio Food Court Mannarkad",
    "LED screen at Cravio Food Court",
    "LED advertising at Cravio Food Court",
    "advertise at Cravio Mannarkkad",

    // Business and event keywords
    "shop advertising Mannarkkad",
    "brand advertising Mannarkkad",
    "new business promotion Mannarkkad",
    "product promotion Mannarkkad",
    "event advertising Mannarkkad",
    "birthday advertising Mannarkkad",
    "local business advertising Kerala",

    // Malayalam keywords
    "മണ്ണാർക്കാട് പരസ്യം",
    "മണ്ണാർക്കാട് എൽഇഡി പരസ്യം",
    "മണ്ണാർക്കാട് ഡിജിറ്റൽ പരസ്യം",
    "മണ്ണാർക്കാട് പരസ്യ ഏജൻസി",
    "എൽഇഡി പരസ്യ ഏജൻസി",
    "ഡിജിറ്റൽ പരസ്യ ഏജൻസി",
    "പാലക്കാട് പരസ്യം",
    "പാലക്കാട് എൽഇഡി പരസ്യം",
    "ബിസിനസ് പരസ്യം",
    "കട പരസ്യം",
    "ബ്രാൻഡ് പ്രമോഷൻ",
    "ക്രാവിയോ ഫുഡ് കോർട്ട്",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Advex Digital",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Advex Digital",
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: "+917907758595",
  email: "ads.advexdigital@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cravio Food Court",
    addressLocality: "Mannarkkad",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: ["Mannarkkad", "Palakkad", "Kerala"],
  sameAs: ["https://www.instagram.com/advex_digital"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${head.variable} ${body.variable} ${tag.variable} ${display.variable} ${spot.variable}`}
    >
      <body className="bg-bg font-body text-white antialiased">
        {/* Google tag (Analytics / Tag Manager) */}
        <Script
          id="gtm-src"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-PV6PZKXP"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());`}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}