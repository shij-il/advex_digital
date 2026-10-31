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
const TITLE = "Advex Digital — LED Digital Advertising";
const DESCRIPTION = "Advertise on a premium outdoor LED screen";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Advex Digital",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/icon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon-light.png",
        media: "(prefers-color-scheme: light)",
      },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body className="bg-bg font-body text-white antialiased">
        {children}
      </body>
    </html>
  );
}