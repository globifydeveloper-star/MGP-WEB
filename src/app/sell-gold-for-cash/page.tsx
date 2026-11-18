import SellGoldForCashPage from '@/components/sell-gold-for-cash/page';
import Footer from '@/components/layout/Footer';
import { getProcessSteps, getSellGoldPageSettings, getComparisonRows } from '@/lib/strapi';
import SellGoldHeader from '@/components/sell-gold-for-cash/SellGoldHeader/SellGoldHeader';

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
  const [processSteps, comparisonRows, pageSettings] = await Promise.all([
    getProcessSteps(),
    getComparisonRows(),
    getSellGoldPageSettings(),
  ]);

  return (
    <>
      <SellGoldHeader phone={pageSettings?.contactPhone} />
      <SellGoldForCashPage processSteps={processSteps} comparisonRows={comparisonRows} pageSettings={pageSettings} />
      <Footer />
    </>
  );
}
