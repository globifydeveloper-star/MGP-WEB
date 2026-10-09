import { Metadata } from 'next';
import FAQPage from '@/components/faq/FAQPage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HOME_FAQS } from '@/lib/faqsData';

export const metadata: Metadata = {
  title: 'FAQs | Muthoot Gold Point',
  description: 'Frequently Asked Questions about selling gold, gold valuation process, purity testing, live rates, and branch visits at Muthoot Gold Point.',
  keywords: ['Gold Point FAQ', 'Sell Gold Questions', 'How to sell gold', 'Gold valuation process', 'Muthoot Gold Point Help'],
  authors: [{ name: 'Muthoot Gold Point' }],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Muthoot Gold Point',
    description: 'Find answers to all your questions regarding selling gold for cash, XRF scientific purity evaluation, instant payments, and document requirements.',
    url: '/faq',
    siteName: 'Muthoot Gold Point',
    type: 'website',
    images: [
      {
        url: '/default-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muthoot Gold Point FAQs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs | Muthoot Gold Point',
    description: 'Frequently Asked Questions about selling gold, gold valuation process, purity testing, and live rates.',
    images: ['/default-og-image.jpg'],
  },
};

export default function FAQRoute() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <Navbar />
      <FAQPage />
      <Footer />
    </>
  );
}
