import { Metadata } from 'next';
import AboutUsPage from '@/components/about-us/page';
import { getAboutUsPage } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutUsPage();
  
  const title = data?.seoTitle || 'About Us - Muthoot Gold Point | A Legacy of Trust';
  const description = data?.seoDescription || "Discover the history, values, and vision of Muthoot Gold Point, India's pioneer in safe, scientific, and transparent gold recycling under the Muthoot Pappachan Group.";
  const ogImage = data?.ogImage || '/default-og-image.jpg'; // Using a fallback image if none provided

  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map(k => k.trim()) : ['Muthoot Gold Point', 'About Us', 'Gold Recycling', 'Muthoot Pappachan Group', 'Muthoot Blue', 'Sell Gold', 'Gold Buyers'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/about-us',
    },
    openGraph: {
      title,
      description,
      url: '/about-us',
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

export default async function Page() {
  const data = await getAboutUsPage();
  if (!data) return notFound();
  return (
    <>
      {!data?.hideNavbar && <Navbar />}
      <AboutUsPage data={data} />
      { !data?.hideFooter && <Footer /> }
    </>
  );
}
