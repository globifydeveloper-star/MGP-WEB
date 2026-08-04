import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogListing from '@/components/blog/BlogListing/BlogListing';
import BlogHero from '@/components/blog/BlogHero/BlogHero';
import { getBlogPosts, getCategories, getBlogPageSettings } from '@/lib/strapi';
import fallbackHeroBg from '@/assets/images/conbg.png';
import './blog-page.css';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogPageSettings();
  const title = settings?.seoTitle || 'Blog | Gold Point';
  const description = settings?.seoDescription || 'Read the latest articles, insights, and updates on gold rates, gold selling, and gold recycling from Gold Point.';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function BlogRoute() {
  const [posts, categories, settings] = await Promise.all([
    getBlogPosts(),
    getCategories(),
    getBlogPageSettings(),
  ]);

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <div className="container blog-page-container">
          <BlogHero
            heading={settings?.heroHeading}
            subheading={settings?.heroSubheading}
            imageUrl={settings?.heroImage?.url}
            fallbackImage={fallbackHeroBg}
          />
          <BlogListing 
            initialPosts={posts} 
            categories={categories} 
            settings={settings ?? undefined} 
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
