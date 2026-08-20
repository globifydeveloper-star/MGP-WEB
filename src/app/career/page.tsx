import { Metadata } from 'next';
import CareerPage from '@/components/career/page';
import { getCareerPageSettings } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCareerPageSettings();
  return {
    title: data?.seoTitle || 'Careers | Muthoot Gold Point',
    description: data?.seoDescription || 'Join the Muthoot Gold Point team. Explore our current job openings and build a rewarding career with India\'s first organized gold recycler.',
    openGraph: {
      title: data?.seoTitle || 'Careers | Muthoot Gold Point',
      description: data?.seoDescription || 'Explore our current job openings and build a rewarding career.',
      type: 'website',
    }
  };
}

export default async function Page() {
  const data = await getCareerPageSettings();
  return (
    <>
      <Navbar />
      <CareerPage data={data} />
      { !(data as any)?.hideFooter && <Footer /> }
    </>
  );
}
