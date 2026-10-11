import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import Home from '@/pages-components/Home';
import { buildPageMetadata, webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    return buildPageMetadata({
      title: 'Location Not Found',
      description: 'The requested location is not available.',
      path: `/${locationSlug}`,
      noindex: true,
    });
  }

  const title = `Doctor Blades & Printing Machinery Accessories in ${location.name}`;
  const description = `ImageTech Industries manufactures and supplies precision doctor blades, magnetic ink mixing rollers, bar coaters and packaging machinery accessories in ${location.name}, ${location.state || 'India'}.`;

  return buildPageMetadata({
    title,
    description,
    path: `/${locationSlug}`,
  });
}

export default async function LocationHomePage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const title = `Doctor Blades & Printing Accessories in ${location.name}`;
  const wpSchema = webPageJsonLd({
    type: "WebPage",
    name: title,
    description: `Industrial doctor blade and printing machinery products supplied in ${location.name} by ImageTech Industries.`,
    path: `/${locationSlug}`,
  });

  const bcSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: location.name, path: `/${locationSlug}` },
  ]);

  return (
    <>
      <JsonLd data={[wpSchema, bcSchema]} />
      <Home />
    </>
  );
}
