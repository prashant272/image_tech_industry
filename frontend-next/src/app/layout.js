import { Suspense } from "react";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://imagetechindustries.com'),
  title: {
    default: "Imagetech Industries | Printing & Packaging Industry Products",
    template: "%s | Imagetech Industries",
  },
  description:
    "Imagetech Industries supplies doctor blades, magnetic ink mixing rollers, bar coaters, dyne test pens, stroboscopes, GSM testing products, slitting blades and other printing and packaging industry accessories.",
  keywords: [
    "Imagetech Industries",
    "doctor blade",
    "doctor blade manufacturer",
    "carbon steel doctor blade",
    "polymer doctor blade",
    "plastic doctor blade",
    "Wipex doctor blade",
    "magnetic ink mixing roller",
    "bar coater",
    "draw down pad",
    "dyne test pen",
    "dyne test ink",
    "stroboscope",
    "nylon filter cloth",
    "GSM round cutter",
    "Teflon dam",
    "solventless lamination accessories",
    "Lutz slitting blade",
    "Mozart slitting blade",
    "cylinder cleaning brush",
    "printing industry products",
    "packaging industry products",
    "printing machine accessories",
  ],
  authors: [{ name: "Imagetech Industries" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Imagetech Industries | Printing & Packaging Industry Products",
    description:
      "Explore doctor blades, ink mixing rollers, bar coaters, dyne testing products, stroboscopes, GSM testing products, slitting blades and other printing and packaging industry accessories from Imagetech Industries.",
    url: "https://imagetechindustries.com/",
    siteName: "Imagetech Industries",
    images: [
      {
        url: "https://imagetechindustries.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Imagetech Industries",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imagetech Industries | Printing & Packaging Industry Products",
    description:
      "Printing and packaging industry products including doctor blades, ink mixing rollers, bar coaters, dyne testing products, stroboscopes and GSM testing equipment.",
    images: ["https://imagetechindustries.com/og-image.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Imagetech Industries",
    url: "https://imagetechindustries.com/",
    logo: "https://imagetechindustries.com/logo.png",
    description:
      "Imagetech Industries supplies products and accessories for the printing and packaging industry, including doctor blades, ink mixing rollers, bar coaters, dyne testing products, stroboscopes, GSM testing products and slitting blades.",
  };

  const webJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Imagetech Industries",
    url: "https://imagetechindustries.com/",
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="preload" as="image" href="/images/popup-bg.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webJsonLd) }}
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <AppShell>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  );
}
