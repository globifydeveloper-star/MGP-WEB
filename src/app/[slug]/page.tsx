import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionRenderer from '@/components/page-builder/SectionRenderer';
import { getPageBySlug } from '@/lib/strapi';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found | Muthoot Gold Point',
    };
  }

  return {
    title: page.seoTitle || `${page.title} | Muthoot Gold Point`,
    description: page.seoDescription || `Learn more about ${page.title} at Muthoot Gold Point.`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <SectionRenderer sections={page.sections} />
      <Footer />
    </main>
  );
}
