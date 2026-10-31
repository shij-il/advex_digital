import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
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

const SITE_URL = "https://advexdigital.com";
const TITLE = "Advex Digital | LED Advertising in Mannarkad, Kerala";
const DESCRIPTION =
  "Advex Digital offers outdoor LED screen advertising in Cravio, Mannarkad (Mannarkkad), Kerala. Promote your shop, brand or event on a premium portrait LED display at Cravio Food Court.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Advex Digital",
  keywords: [
    "Advex Digital",
    "Advex Digital Mannarkkad",
    "Advex LED advertising",
    "LED advertising in Mannarkad",
    "LED advertising in Mannarkkad",
    "advertising in Mannarkad",
    "advertising in Mannarkkad",
    "outdoor advertising Mannarkkad",
    "digital billboard Mannarkkad",
    "LED screen advertising Mannarkkad",
    "LED display advertising Palakkad",
    "shop advertising Mannarkkad",
    "advertise your business in Mannarkkad",
    "Cravio Food Court Mannarkkad",
    "Cravio Food Court Mannarkad",
    "LED screen at Cravio Food Court",
    "LED advertising at Cravio Food Court",
    "advertise at Cravio Mannarkkad",
    "birthday and event ad screen Mannarkkad",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)" },
    ],
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
  telephone: "+919207674546",
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
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body className="bg-bg font-body text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}