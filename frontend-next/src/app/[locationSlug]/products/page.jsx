import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import Products from '@/pages-components/Products';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';
  return {
    title: `Printing & Packaging Machinery Products in ${city} | Imagetech Industries`,
    description: `Browse doctor blades, ink mixing rollers, bar coaters and more in ${city}.`,
  };
}

export default async function LocationProductsPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <Products />;
}
