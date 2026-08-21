import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileVanTab from '@/components/mobilevantab/page';
import { getMobileVanPageSettings } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMobileVanPageSettings();
  return {
    title: data?.seoTitle || 'Mobile Van | Muthoot Gold Point',
    description: data?.seoDescription || 'Experience the luxury of professional gold valuation without leaving your home with our secure mobile vans.',
    openGraph: {
      title: data?.seoTitle || 'Mobile Van | Muthoot Gold Point',
      description: data?.seoDescription || 'Experience the luxury of professional gold valuation without leaving your home with our secure mobile vans.',
      type: 'website',
    }
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
