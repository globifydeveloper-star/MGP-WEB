import { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getContactUsPage } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactUsPage();
  const title = data?.seoTitle || 'Contact Us | Muthoot Gold Point';
  const description = data?.seoDescription || 'Get in touch with Muthoot Gold Point. Find our registered office details, write to us directly, or look up the address, phone, and email for any of our branches.';
  const ogImage = data?.ogImage || '/default-og-image.jpg';

  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map(k => k.trim()) : ['Contact Muthoot Gold Point', 'Muthoot Gold Point Customer Care', 'Gold Point Branches', 'Muthoot Exim Contact'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/contact-us',
    },
    openGraph: {
      title,
      description,
      url: '/contact-us',
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
  const data = await getContactUsPage();
  if (!data) return notFound();
  return (
    <>
      {!data?.hideNavbar && <Navbar />}
      <ContactPage data={data} />
      { !data?.hideFooter && <Footer /> }
    </>
  );
}
