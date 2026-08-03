import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OTPEnquiryForm from '@/components/common/OTPEnquiryForm/OTPEnquiryForm';
import BlogCard from '@/components/blog/BlogCard/BlogCard';
import { getBlogPostBySlug, getBlogPosts, getBlogPageSettings } from '@/lib/strapi';
import '../blog-page.css';
import './blog-post-page.css';

interface BlogPostRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found | Gold Point' };
  }

  return {
    title: post.metaTitle ?? `${post.title} | Gold Point Blog`,
    description: post.metaDescription ?? post.excerpt,
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      type: 'article',
    },
  };
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [allPosts, settings] = await Promise.all([
    getBlogPosts(),
    getBlogPageSettings(),
  ]);
  
  // Compute related articles: same category first (date desc), backfill from others up to 3 total
  const otherPosts = allPosts.filter(p => p.id !== post.id);
  const sameCategory = otherPosts.filter(
    p => p.category && post.category && p.category.id === post.category.id
  );
  const differentCategory = otherPosts.filter(
    p => !p.category || !post.category || p.category.id !== post.category.id
  );

  const related = [...sameCategory];
  if (related.length < 3) {
    related.push(...differentCategory.slice(0, 3 - related.length));
  }
  const displayRelated = related.slice(0, 3);

  const isVideo = post.coverMedia?.mime?.startsWith('video/');

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <div className="container back-to-blog-wrapper">
          <Link href="/blog" className="back-to-blog-link">
            {settings?.backToBlogLabel || '← Back to Blog'}
          </Link>
        </div>

        <div className="container blog-layout-wrapper">
          <article className="blog-post-content">
            {post.category && <span className="blog-post-tag">{post.category.name}</span>}
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-date">{formatDate(post.publishedAt)}</p>

            {post.coverMedia && (
              <div className="blog-post-media">
                {isVideo ? (
                  <video src={post.coverMedia.url} controls className="blog-post-media-el" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverMedia.url} alt={post.title} className="blog-post-media-el" />
                )}
              </div>
            )}

            <div className="blog-post-body">{post.body}</div>

            {post.cta?.enabled && post.cta.link && (
              <a href={post.cta.link} className="btn btn-primary blog-post-cta">
                {post.cta.label ?? 'Learn More'}
              </a>
            )}
          </article>

          <aside className="blog-post-sidebar">
            <div className="blog-sidebar-sticky">
              <OTPEnquiryForm />
            </div>
          </aside>
        </div>

        {displayRelated.length > 0 && (
          <section className="related-articles-section">
            <div className="container">
              <h2 className="related-articles-title">
                {settings?.relatedArticlesHeading || 'Related Articles'}
              </h2>
              <div className="related-articles-grid">
                {displayRelated.map(relatedPost => (
                  <BlogCard 
                    key={relatedPost.id} 
                    post={relatedPost} 
                    readMoreLabel={settings?.readMoreLabel} 
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

