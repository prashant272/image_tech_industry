import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import LocationsDirectory from '@/pages-components/LocationsDirectory';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';
  return {
    title: `Sitemap & Directory for ${city} | Imagetech Industries`,
    description: `Directory of custom pages and services for ${city}.`,
  };
}

export default async function LocationSitemapPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <LocationsDirectory />;
}
