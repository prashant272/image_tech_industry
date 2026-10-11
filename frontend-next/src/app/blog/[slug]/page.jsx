import { notFound } from 'next/navigation';
import BlogDetail from '@/pages-components/BlogDetail';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${apiUrl}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const blog = await res.json();
      if (blog) {
        return buildPageMetadata({
          title: blog.metaTitle || blog.title,
          description: blog.metaDescription || blog.excerpt || blog.content?.slice(0, 160) || `Insights on ${blog.title} from ImageTech Industries.`,
          path: `/blog/${slug}`,
          image: blog.featuredImage ? { url: blog.featuredImage, width: 1200, height: 630, alt: blog.title } : undefined,
          type: 'article',
        });
      }
    }
  } catch (err) {
    console.error('Error generating blog metadata:', err);
  }

  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return buildPageMetadata({
    title: formatted,
    description: `Read technical insights on ${formatted} from ImageTech Industries.`,
    path: `/blog/${slug}`,
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${apiUrl}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      notFound();
    }
  } catch (err) {
    notFound();
  }

  return <BlogDetail />;
}
