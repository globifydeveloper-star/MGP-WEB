import type { Metadata } from "next";
import { Outfit, Montserrat } from "next/font/google";
import BranchSelector from "@/components/home/BranchSelector/BranchSelector";
import ScrollToTop from "@/components/layout/ScrollToTop";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-montserrat",
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.muthootgoldpoint.com'),
  title: {
    default: "Goldpoint - Muthoot Exim | Sell Your Gold & Get Cash Today",
    template: "%s | Muthoot Goldpoint"
  },
  description: "Sell your old, unused, or pledged gold instantly at Muthoot Goldpoint. Get the true market value through a transparent evaluation process conducted right in front of you.",
  keywords: ["sell gold", "gold for cash", "muthoot gold point", "gold buyers", "gold valuation", "sell gold online", "old gold buyers", "cash for gold"],
  authors: [{ name: "Muthoot Exim" }],
  creator: "Muthoot Exim",
  publisher: "Muthoot Exim",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Goldpoint - Muthoot Exim | Sell Your Gold & Get Cash Today",
    description: "Get the true market value for your gold through a transparent process.",
    type: "website",
    url: "/",
    siteName: "Muthoot Goldpoint",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goldpoint - Muthoot Exim | Sell Your Gold & Get Cash Today",
    description: "Sell your old, unused, or pledged gold instantly at Muthoot Goldpoint.",
  },
  other: {
    'color-scheme': 'light',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.muthootgoldpoint.com/#organization',
      name: 'Muthoot Gold Point',
      legalName: 'Muthoot Exim Private Limited',
      url: 'https://www.muthootgoldpoint.com',
      logo: 'https://www.muthootgoldpoint.com/images/home/mgp-logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-1800-102-1616',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
      },
      sameAs: [
        'https://www.facebook.com/muthootgoldpoint/',
        'https://www.instagram.com/muthootgoldpoint/',
        'https://www.linkedin.com/company/muthoot-exim-pvt-ltd',
        'https://www.youtube.com/@MuthootGoldpoint',
      ],
    },
    {
      '@type': 'FinancialService',
      '@id': 'https://www.muthootgoldpoint.com/#financialservice',
      name: 'Muthoot Gold Point',
      image: 'https://www.muthootgoldpoint.com/images/home/mgp-logo.png',
      url: 'https://www.muthootgoldpoint.com',
      telephone: '1800 102 1616',
      priceRange: '₹₹₹',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
      description: 'India\'s trusted gold buyer. Sell old, unused, or pledged gold for instant spot payment with scientific XRF purity testing.',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${montserrat.variable}`} style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body style={{ colorScheme: 'light' }}>
        {children}
        <BranchSelector />
        <ScrollToTop />
      </body>
    </html>
  );
}
