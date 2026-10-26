import { Metadata } from 'next';
import FAQPage from '@/components/faq/FAQPage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getFAQPageSettings, getFaqs } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getFAQPageSettings();
  const title = settings?.seoTitle || 'FAQs | Muthoot Gold Point';
  const description = settings?.seoDescription || 'Frequently Asked Questions about selling gold, gold valuation process, purity testing, live rates, and branch visits at Muthoot Gold Point.';
  const ogImage = settings?.ogImage || '/default-og-image.jpg';
  return {
    title,
    description,
    keywords: settings?.seoKeywords?.split(',').map((keyword) => keyword.trim()) || ['Gold Point FAQ', 'Sell Gold Questions', 'How to sell gold', 'Gold valuation process', 'Muthoot Gold Point Help'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: { canonical: '/faq' },
    openGraph: { title, description, url: '/faq', siteName: 'Muthoot Gold Point', type: 'website', images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export default async function FAQRoute() {
  const [settings, dedicatedFaqs] = await Promise.all([getFAQPageSettings(), getFaqs('faq')]);
  const faqs = dedicatedFaqs.length > 0 ? dedicatedFaqs : await getFaqs('home');
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
      {!settings?.hideNavbar && <Navbar />}
      <FAQPage faqs={faqs} settings={settings} />
      {!settings?.hideFooter && <Footer />}
    </>
  );
}
