import { Metadata } from 'next';
import GoldRatePage from '@/components/gold-rate/page';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getGoldRatePage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGoldRatePage();
  return {
    title: data?.seoTitle ?? "Today's Gold Rate | Gold Price Per Gram | Gold Point",
    description:
      data?.seoDescription ??
      "Check today's gold rate and gold price per gram. Calculate the estimated value of your gold and explore transparent gold valuation with Gold Point.",
    openGraph: {
      title: data?.seoTitle ?? "Today's Gold Rate | Gold Price Per Gram | Gold Point",
      description:
        data?.seoDescription ??
        "Check today's gold rate and gold price per gram. Calculate the estimated value of your gold with Gold Point.",
      type: 'website',
      ...(data?.ogImage && { images: [{ url: data.ogImage }] }),
    },
  };
}

export default async function GoldRateRoute() {
  const data = await getGoldRatePage();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (data?.faqs || []).map((faq) => ({
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
      {!data?.hideNavbar && <Navbar />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GoldRatePage data={data} />
      {!data?.hideFooter && <Footer />}
    </>
  );
}
