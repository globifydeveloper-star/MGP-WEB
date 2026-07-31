import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogListing from '@/components/blog/BlogListing/BlogListing';
import { getBlogPosts, getCategories } from '@/lib/strapi';
import './blog-page.css';

export const metadata: Metadata = {
  title: 'Blog | Gold Point',
  description: 'Read the latest articles, insights, and updates on gold rates, gold selling, and gold recycling from Gold Point.',
  openGraph: {
    title: 'Blog | Gold Point',
    description: 'Read the latest articles, insights, and updates on gold rates, gold selling, and gold recycling from Gold Point.',
    type: 'website',
  },
};

export default async function BlogRoute() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getCategories()]);

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <div className="container blog-page-container">
          <div className="blog-page-header">
            <h1 className="blog-page-title">Our Blog</h1>
            <p className="blog-page-subtitle">
              Insights, updates, and stories on gold rates, selling, and recycling.
            </p>
          </div>
          <BlogListing initialPosts={posts} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
