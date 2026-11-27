import type { Metadata } from "next";
import {
  Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, JetBrains_Mono, Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import "./transitions.css";
import { BRAND, PROGRAMMES } from "@/lib/content";
import LocaleProvider from "@/i18n/LocaleProvider";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: BRAND.name,
  alternateName: BRAND.arabic,
  telephone: BRAND.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bd Zerktouni, Maârif",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  hasCourse: PROGRAMMES.map((programme) => ({
    "@type": "Course",
    name: programme.title,
    courseCode: programme.code,
    description: programme.description,
    provider: { "@type": "EducationalOrganization", name: BRAND.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: programme.value,
      availability: "https://schema.org/InStock",
    },
  })),
};

const display = Cormorant_Garamond({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const arabicBody = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-family",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const arabicDisplay = Amiri({
  variable: "--font-arabic-display-family",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.eyebrow}`,
  description:
    "Sept programmes, un seul niveau d’exigence. Allemand A1→B2, IELTS, TCF et préparation complète au Baccalauréat marocain. Bd Zerktouni, Maârif, Casablanca.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr"
      className={`${display.variable} ${body.variable} ${mono.variable} ${arabicBody.variable} ${arabicDisplay.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        <LocaleProvider initialLocale="fr">{children}</LocaleProvider>
      </body>
    </html>
  );
}
