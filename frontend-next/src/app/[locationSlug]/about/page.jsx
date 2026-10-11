import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import About from '@/pages-components/About';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';
  return {
    title: `About Us in ${city} | Imagetech Industries`,
    description: `Leading provider of printing and packaging solutions in ${city}.`,
  };
}

export default async function LocationAboutPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <About />;
}
