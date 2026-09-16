import { Metadata } from 'next';
import GoldRatePage from '@/components/gold-rate/page';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getGoldRatePage, getSharedMedia } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGoldRatePage();
  const title = data?.seoTitle ?? "Today's Gold Rate | Gold Price Per Gram | Gold Point";
  const description = data?.seoDescription ?? "Check today's gold rate and gold price per gram. Calculate the estimated value of your gold and explore transparent gold valuation with Gold Point.";
  const ogImage = data?.ogImage || '/default-og-image.jpg';

  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map(k => k.trim()) : ['Today Gold Rate', 'Gold Rate Today', 'Gold Price Per Gram', 'Live Gold Price', 'Muthoot Gold Rate', 'Gold Calculator'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/gold-rate',
    },
    openGraph: {
      title,
      description,
      url: '/gold-rate',
      siteName: 'Muthoot Gold Point',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function GoldRateRoute() {
  const [data, sharedMedia] = await Promise.all([getGoldRatePage(), getSharedMedia()]);

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
      <GoldRatePage data={data} goldValueFormImage={sharedMedia?.goldValueFormImage} />
      {!data?.hideFooter && <Footer />}
    </>
  );
}
