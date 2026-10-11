import { notFound } from 'next/navigation';
import ProductDetail from '@/pages-components/ProductDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  
  try {
    const res = await fetch(`${apiUrl}/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      const products = await res.json();
      const product = products.find(p => p.slug === slug);
      if (product) {
        return {
          title: `${product.name} | Imagetech Industries`,
          description: product.metaDescription || product.shortDescription || product.description?.slice(0, 160) || `Buy premium ${product.name} from Imagetech Industries.`,
          openGraph: {
            title: `${product.name} | Imagetech Industries`,
            description: product.metaDescription || product.shortDescription,
            images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
          },
        };
      }
    }
  } catch (err) {
    console.error('Error generating product metadata:', err);
  }

  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} | Imagetech Industries`,
    description: `High-quality ${formatted} for printing and packaging industry.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${apiUrl}/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      const products = await res.json();
      const product = products.find(p => p.slug === slug);
      if (!product) {
        notFound();
      }
    }
  } catch (err) {
    // allow client to handle error or throw notFound()
  }

  return <ProductDetail />;
}
