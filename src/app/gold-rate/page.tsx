import { Metadata } from 'next';
import GoldRatePage from '@/components/gold-rate/page';
import { GOLD_RATE_FAQS } from '@/lib/goldRateFaqs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Today's Gold Rate | Gold Price Per Gram | Gold Point",
  description:
    "Check today's gold rate and gold price per gram. Calculate the estimated value of your gold and explore transparent gold valuation with Gold Point.",
  openGraph: {
    title: "Today's Gold Rate | Gold Price Per Gram | Gold Point",
    description:
      "Check today's gold rate and gold price per gram. Calculate the estimated value of your gold with Gold Point.",
    type: 'website',
  },
};

export default function GoldRateRoute() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GOLD_RATE_FAQS.map((faq) => ({
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
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GoldRatePage />
          <Footer />
    </>
  );
}
