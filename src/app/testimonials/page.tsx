import { Metadata } from 'next';
import TestimonialsPage from '@/components/testimonials/page';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getTestimonialsPage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTestimonialsPage();
  const title = data?.seoTitle || 'Customer Testimonials | Muthoot Gold Point';
  const description = data?.seoDescription || "Read real customer testimonials and reviews about Muthoot Gold Point's transparent gold valuation, fair pricing, and trusted service.";
  const ogImage = data?.ogImage || '/default-og-image.jpg';

  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map((k: string) => k.trim()) : ['Customer Testimonials', 'Muthoot Gold Point Reviews', 'Customer Feedback', 'Gold Buyer Reviews'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/testimonials',
    },
    openGraph: {
      title,
      description,
      url: '/testimonials',
      siteName: 'Muthoot Gold Point',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function TestimonialsRoute() {
  const data = await getTestimonialsPage();
  return (
    <>
      <Navbar />
      <TestimonialsPage data={data} />
      <Footer />
    </>
  );
}
