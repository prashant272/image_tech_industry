import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import Contact from '@/pages-components/Contact';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';
  return {
    title: `Contact Imagetech Industries in ${city}`,
    description: `Contact our sales and technical team in ${city} for doctor blades and printing accessories.`,
  };
}

export default async function LocationContactPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <Contact />;
}
