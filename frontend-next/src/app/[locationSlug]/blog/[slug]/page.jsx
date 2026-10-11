import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import BlogDetail from '@/pages-components/BlogDetail';

export async function generateMetadata({ params }) {
  const { locationSlug, slug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';

  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} - ${city} Edition | Imagetech Industries`,
    description: `Read ${formatted} for packaging and printing professionals in ${city}.`,
  };
}

export default async function LocationBlogDetailPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <BlogDetail />;
}
