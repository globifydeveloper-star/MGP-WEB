import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OTPEnquiryForm from '@/components/common/OTPEnquiryForm/OTPEnquiryForm';
import { getBlogPostBySlug } from '@/lib/strapi';
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

  const isVideo = post.coverMedia?.mime?.startsWith('video/');

  return (
    <>
      <Navbar />
      <main className="blog-page">
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
      </main>
      <Footer />
    </>
  );
}

