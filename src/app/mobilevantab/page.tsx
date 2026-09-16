import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileVanTab from '@/components/mobilevantab/page';
import { getMobileVanPageSettings } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMobileVanPageSettings();
  const title = data?.seoTitle || 'Mobile Van | Muthoot Gold Point';
  const description = data?.seoDescription || 'Experience the luxury of professional gold valuation without leaving your home with our secure mobile vans.';
  const ogImage = data?.ogImage || '/default-og-image.jpg';

  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map((k: string) => k.trim()) : ['Mobile Van Gold Buyer', 'Sell Gold from Home', 'Muthoot Gold Point Mobile Van', 'Gold Valuation at Home'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/mobilevantab',
    },
    openGraph: {
      title,
      description,
      url: '/mobilevantab',
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

export default async function MobileVanRoute() {
  const data = await getMobileVanPageSettings();
  
  return (
    <>
      <Navbar />
      <MobileVanTab data={data} />
      <Footer />
    </>
  );
}
