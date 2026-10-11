import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import Industries from '@/pages-components/Industries';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';
  return {
    title: `Industries Served in ${city} | Imagetech Industries`,
    description: `Printing, packaging and coating industries served across ${city}.`,
  };
}

export default async function LocationIndustriesPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <Industries />;
}
