import { Metadata } from 'next';
import AboutUsPage from '@/components/about-us/page';
import { getAboutUsPage } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutUsPage();
  return {
    title: data?.seoTitle || 'About Us - Muthoot Gold Point | A Legacy of Trust',
    description: data?.seoDescription || "Discover the history, values, and vision of Muthoot Gold Point, India's pioneer in safe, scientific, and transparent gold recycling under the Muthoot Pappachan Group.",
    openGraph: {
      title: data?.seoTitle || 'About Us - Muthoot Gold Point | A Legacy of Trust',
      description: data?.seoDescription || "Discover the history, values, and vision of Muthoot Gold Point, India's pioneer in gold recycling.",
      type: 'website',
      images: data?.ogImage ? [{ url: data.ogImage }] : undefined,
    }
  };
}

export default async function Page() {
  const data = await getAboutUsPage();
  if (!data) return notFound();
  return (
    <>
      {!pageData?.hideNavbar && <Navbar />}
      <AboutUsPage data={data} />
      { !data?.hideFooter && <Footer /> }
    </>
  );
}
