import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, business } from "@/lib/site-data";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap"
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rombensonn.github.io/katyusha-autoservice-podolsk").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: `${siteUrl}/favicon.ico`
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Автосервис Катюша",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/katyusha-industrial-hero.png`,
        width: 1200,
        height: 675,
        alt: "Нейтральный технический визуал автосервиса"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${siteUrl}/images/katyusha-industrial-hero.png`]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Машиностроителей, 44Д",
      addressLocality: "Подольск",
      addressCountry: "RU"
    },
    telephone: business.phoneFormatted,
    openingHours: [
      "Mo 09:00-20:00",
      "Tu 09:00-20:00",
      "We 09:00-20:00",
      "Th 09:00-20:00",
      "Fr 09:00-20:00",
      "Sa 09:00-20:00",
      "Su 10:00-19:00"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "43"
    },
    url: siteUrl,
    sameAs: business.mapsUrl,
    paymentAccepted: "Card"
  };

  return (
    <html lang="ru" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
