import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "L'Anadot - Ristorante a Lodi | Cucina Italiana Tradizionale",
    template: "%s | L'Anadot Ristorante Lodi",
  },
  description:
    "L'Anadot è il ristorante di riferimento a Lodi per chi cerca cucina italiana autentica. Situato in Via del Capanno 37, offriamo piatti tradizionali lombardi in un ambiente elegante sul fiume Adda. Prenota ora: 0371 944 807",
  keywords: [
    "ristorante Lodi",
    "L'Anadot",
    "cucina italiana Lodi",
    "ristorante Via del Capanno",
    "pranzo cena Lodi",
    "ristorante Adda",
    "cucina lombarda",
    "prenotazione ristorante Lodi",
    "ristorante tradizionale",
    "cucina stagionale Lodi",
    "Alberto Franceschini Franz",
    "ristorante fiume Adda",
    "cucina italiana autentica",
    "ristorante elegante Lodi",
    "specialità lombarde",
  ],
  authors: [{ name: "L'Anadot Ristorante" }],
  creator: "L'Anadot Ristorante",
  publisher: "L'Anadot Ristorante",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lanadot.it"),
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
    },
  },
  openGraph: {
    title: "L'Anadot - Ristorante a Lodi | Cucina Italiana Tradizionale",
    description:
      "Scopri L'Anadot, il ristorante di riferimento a Lodi per cucina italiana autentica. 25 anni di esperienza, ingredienti selezionati, atmosfera elegante sul fiume Adda. Prenota: 0371 944 807",
    url: "https://lanadot.it",
    siteName: "L'Anadot Ristorante",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "L'Anadot Ristorante - Interno elegante con vista sul fiume Adda a Lodi",
      },
      {
        url: "/images/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "L'Anadot Ristorante - Piatti della cucina italiana tradizionale",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Anadot - Ristorante a Lodi | Cucina Italiana Tradizionale",
    description:
      "Cucina italiana autentica a Lodi. 25 anni di esperienza, ingredienti selezionati, atmosfera elegante sul fiume Adda. Prenota: 0371 944 807",
    images: ["/images/twitter-image.jpg"],
    creator: "@lanadot_lodi",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#04241f",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#04241f",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#04241f",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "restaurant",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Structured Data for Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "L'Anadot",
              alternateName: "Ristorante L'Anadot",
              description:
                "Ristorante di cucina italiana tradizionale a Lodi, specializzato in piatti lombardi con ingredienti selezionati e atmosfera elegante sul fiume Adda.",
              image: [
                "https://lanadot.it/images/interior-1.jpg",
                "https://lanadot.it/images/interior-2.jpg",
                "https://lanadot.it/images/terrace.jpg",
              ],
              logo: "https://lanadot.it/images/logo-dark.png",
              url: "https://lanadot.it",
              telephone: "+39 0371 944 807",
              priceRange: "€€",
              servesCuisine: ["Italian", "Lombard", "Mediterranean"],
              acceptsReservations: true,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Via del Capanno, 37",
                addressLocality: "Lodi",
                addressRegion: "Lombardia",
                postalCode: "26900",
                addressCountry: "IT",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.3142,
                longitude: 9.5034,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "12:00",
                  closes: "14:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "19:00",
                  closes: "23:00",
                },
              ],
              menu: "https://lanadot.it/#cucina",
              founder: {
                "@type": "Person",
                name: "Alberto Franceschini",
                alternateName: "Franz",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Marco Rossi",
                  },
                  reviewBody:
                    "Esperienza culinaria eccezionale. Cucina italiana autentica in un ambiente elegante. Il servizio è impeccabile e la vista sul fiume Adda è incantevole.",
                },
              ],
              hasMenu: {
                "@type": "Menu",
                name: "Menu L'Anadot",
                description:
                  "Cucina italiana tradizionale con specialità lombarde, menu stagionale che cambia quotidianamente",
              },
              paymentAccepted: "Cash, Credit Card",
              currenciesAccepted: "EUR",
              smokingAllowed: false,
              sameAs: ["https://www.instagram.com/lanadot_lodi", "https://www.facebook.com/lanadot.lodi"],
            }),
          }}
        />

        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "L'Anadot",
              image: "https://lanadot.it/images/logo-dark.png",
              telephone: "+39 0371 944 807",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Via del Capanno, 37",
                addressLocality: "Lodi",
                addressRegion: "LO",
                postalCode: "26900",
                addressCountry: "IT",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.3142,
                longitude: 9.5034,
              },
              url: "https://lanadot.it",
              openingHours: "Tu-Su 12:00-14:00,19:00-23:00",
            }),
          }}
        />

        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://lanadot.it",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Ristorante",
                  item: "https://lanadot.it/#chisiamo",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Menu",
                  item: "https://lanadot.it/#cucina",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Contatti",
                  item: "https://lanadot.it/#contatti",
                },
              ],
            }),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://www.instagram.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//www.instagram.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://lanadot.it" />

        {/* Hreflang for internationalization */}
        <link rel="alternate" hrefLang="it" href="https://lanadot.it" />
        <link rel="alternate" hrefLang="it-IT" href="https://lanadot.it" />
        <link rel="alternate" hrefLang="x-default" href="https://lanadot.it" />

        {/* Additional meta tags for better SEO */}
        <meta name="geo.region" content="IT-LO" />
        <meta name="geo.placename" content="Lodi" />
        <meta name="geo.position" content="45.3142;9.5034" />
        <meta name="ICBM" content="45.3142, 9.5034" />

        {/* Business specific meta tags */}
        <meta name="business:contact_data:street_address" content="Via del Capanno, 37" />
        <meta name="business:contact_data:locality" content="Lodi" />
        <meta name="business:contact_data:region" content="Lombardia" />
        <meta name="business:contact_data:postal_code" content="26900" />
        <meta name="business:contact_data:country_name" content="Italia" />
        <meta name="business:contact_data:phone_number" content="+39 0371 944 807" />

        {/* Restaurant specific meta tags */}
        <meta name="restaurant:section" content="Italian Restaurant" />
        <meta name="restaurant:price_range" content="€€" />
        <meta name="restaurant:accepts_reservations" content="yes" />
        <meta name="restaurant:cuisine" content="Italian, Lombard, Traditional" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
