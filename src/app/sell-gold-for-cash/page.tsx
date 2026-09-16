import SellGoldForCashPage from '@/components/sell-gold-for-cash/page';
import Footer from '@/components/layout/Footer';
import { getProcessSteps, getSellGoldPageSettings } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/images/gp-logo.png';

export async function generateMetadata() {
  const data = await getSellGoldPageSettings();
  
  const title = data?.seoTitle || 'Sell Gold for Cash | Muthoot Gold Point';
  const description = data?.seoDescription || 'Sell your old gold and get cash instantly with 100% fair and precise gold buying. Free purity testing, 100% transparent process, and free ultrasonic cleaning.';
  
  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map((k: string) => k.trim()) : ['Sell Gold', 'Cash for Gold', 'Gold Buyers', 'Sell Old Gold', 'Muthoot Gold Point', 'Instant Cash for Gold'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/sell-gold-for-cash',
    },
    openGraph: {
      title,
      description,
      url: '/sell-gold-for-cash',
      siteName: 'Muthoot Gold Point',
      type: 'website',
      images: data?.ogImage ? [{ url: data.ogImage }] : [
        {
          url: '/default-og-image.jpg',
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
      images: data?.ogImage ? [data.ogImage] : ['/default-og-image.jpg'],
    },
  };
}

export default async function Page() {
  const processSteps = await getProcessSteps();

  return (
    <>
      <header style={{ 
        backgroundColor: '#ffffff', 
        padding: '1.2rem 0', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        transform: 'translateZ(0)',
        willChange: 'transform',
        borderBottom: '1px solid #eaeaea',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <Link href="/">
          <Image src={logoImg} alt="GOLDPOINT - We Buy Gold" width={220} height={60} priority style={{ display: 'block' }} />
        </Link>
      </header>
      <SellGoldForCashPage processSteps={processSteps} />
      <Footer />
    </>
  );
}
