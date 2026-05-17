import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tranquilovacationrentals.com"
  ),
  title: {
    default: "Tranquilo Vacation Rentals — Playa del Carmen, Mexico",
    template: "%s | Tranquilo Vacation Rentals",
  },
  description:
    "Discover hand-picked vacation rentals in Playa del Carmen, Mexico. Villas, lofts, and condos with direct booking and no booking fees.",
  keywords: [
    "vacation rentals Playa del Carmen",
    "villas Mexico",
    "direct booking",
    "no fees",
    "Quinta Avenida",
    "Caribbean coast",
  ],
  authors: [{ name: "Tranquilo Vacation Rentals" }],
  creator: "Tranquilo Vacation Rentals",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_MX"],
    siteName: "Tranquilo Vacation Rentals",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tranquilovr",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1B5E4B",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? "";

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        {/* TODO: Pass nonce to Analytics when Vercel Analytics supports it */}
        <Analytics />
      </body>
    </html>
  );
}
