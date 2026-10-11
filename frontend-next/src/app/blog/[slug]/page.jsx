import { notFound } from 'next/navigation';
import BlogDetail from '@/pages-components/BlogDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${apiUrl}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const blog = await res.json();
      if (blog) {
        return {
          title: `${blog.metaTitle || blog.title} | Imagetech Industries`,
          description: blog.metaDescription || blog.excerpt || blog.content?.slice(0, 160),
          keywords: blog.metaKeywords ? blog.metaKeywords.split(',').map(s => s.trim()) : undefined,
          openGraph: {
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.excerpt,
            images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
          },
        };
      }
    }
  } catch (err) {
    console.error('Error generating blog metadata:', err);
  }

  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} | Imagetech Industries Blog`,
    description: `Read about ${formatted} on the Imagetech Industries blog.`,
  };
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
