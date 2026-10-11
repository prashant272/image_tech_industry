import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import Home from '@/pages-components/Home';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    return {
      title: 'Not Found | Imagetech Industries',
    };
  }

  return {
    title: `Doctor Blade Manufacturer & Packaging Accessories in ${location.name} | Imagetech Industries`,
    description: `Imagetech Industries supplies doctor blades, magnetic ink mixing rollers, bar coaters and packaging accessories in ${location.name}, ${location.state || 'India'}.`,
    openGraph: {
      title: `Printing & Packaging Machinery Products in ${location.name} | Imagetech Industries`,
      description: `Supplying high quality doctor blades and accessories across ${location.name}.`,
    },
  };
}

export default async function LocationHomePage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  return <Home />;
}
