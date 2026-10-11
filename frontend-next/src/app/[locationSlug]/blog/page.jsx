import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import Blog from '@/pages-components/Blog';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';
  return {
    title: `Articles & News for ${city} | Imagetech Industries`,
    description: `Latest printing and packaging equipment updates in ${city}.`,
  };
}

export default async function LocationBlogPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <Blog />;
}
