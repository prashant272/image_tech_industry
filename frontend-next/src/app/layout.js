import { Suspense } from "react";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const DEFAULT_TITLE = "ImageTech Industries | Printing & Packaging Accessories";
const DEFAULT_DESCRIPTION =
  "Manufacturer and supplier of doctor blades, dyne test pens, ink mixing rollers, stroboscopes and packaging machinery accessories based in Delhi, India.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "ImageTech Industries",
    "printing machine accessories manufacturer",
    "packaging machinery accessories supplier",
    "lamination machine accessories exporter",
    "doctor blades manufacturer",
    "magnetic ink mixing rollers",
    "wire bar coaters",
    "dyne test pens",
    "slitting blades",
    "solventless lamination teflon dams",
    "printing consumables exporter India"
  ],
  authors: [{ name: SITE_NAME }],
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
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: "/images/logo.png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body>
        <Suspense fallback={null}>
          <AppShell>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  );
}
