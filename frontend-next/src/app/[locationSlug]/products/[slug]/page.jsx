import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import ProductDetail from '@/pages-components/ProductDetail';

export async function generateMetadata({ params }) {
  const { locationSlug, slug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';

  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} in ${city} | Imagetech Industries`,
    description: `Buy ${formatted} in ${city} directly from manufacturer and supplier Imagetech Industries.`,
  };
}

export default async function LocationProductDetailPage({ params }) {
  const { locationSlug, slug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      const products = await res.json();
      if (!products.some(p => p.slug === slug)) {
        notFound();
      }
    }
  } catch (err) {
    // continue
  }

  return <ProductDetail />;
}
