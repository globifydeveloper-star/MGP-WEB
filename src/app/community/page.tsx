import { Metadata } from 'next';
import CommunityPage from '@/components/community/CommunityPage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getCommunityPage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCommunityPage();
  const title = data?.seoTitle || 'Community | Muthoot Gold Point';
  const description = data?.seoDescription || 'Discover the CSR initiatives of the Muthoot Pappachan Foundation across Health, Education, Environment and Livelihood (HEEL) — touching thousands of lives across India.';
  const ogImage = data?.ogImage || '/default-og-image.jpg';

  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map((k: string) => k.trim()) : ['Muthoot Pappachan Foundation', 'CSR', 'Community', 'HEEL', 'Smile Mission', 'Muthoot Football Academy', 'Muthoot Gold Point'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/community',
    },
    openGraph: {
      title,
      description,
      url: '/community',
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

export default async function CommunityRoute() {
  const data = await getCommunityPage();
  return (
    <>
      <Navbar />
      <CommunityPage data={data} />
      <Footer />
    </>
  );
}
