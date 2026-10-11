import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import CustomDetails from '@/pages-components/CustomDetails';
import { buildPageMetadata, webPageJsonLd, breadcrumbJsonLd, fillTemplate } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

async function getCustomPage(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/custom-pages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { locationSlug, slug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    return buildPageMetadata({
      title: "Page Not Found",
      description: "The requested location or product page does not exist.",
      path: `/${locationSlug}/${slug}`,
      noindex: true,
    });
  }

  const page = await getCustomPage(slug);
  if (!page) {
    return buildPageMetadata({
      title: "Page Not Found",
      description: "The requested page does not exist in our directory.",
      path: `/${locationSlug}/${slug}`,
      noindex: true,
    });
  }

  const cityName = location.name;
  const stateName = location.state || cityName;

  const rawTitle = page.metaTitle || page.heroTitle || page.title || `${slug} Manufacturer in {city}`;
  const rawDesc = page.metaDescription || page.heroSubtitle || `High quality industrial ${slug} manufactured and supplied in {city}, {state} by ImageTech Industries.`;

  const title = fillTemplate(rawTitle, { city: cityName, state: stateName });
  const description = fillTemplate(rawDesc, { city: cityName, state: stateName });

  const ogImageUrl = page.heroImage || null;

  return buildPageMetadata({
    title,
    description,
    path: `/${locationSlug}/${slug}`,
    image: ogImageUrl ? { url: ogImageUrl, width: 1200, height: 630, alt: title } : undefined,
  });
}

export default async function LocationCustomPage({ params }) {
  const { locationSlug, slug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const page = await getCustomPage(slug);
  if (!page) {
    notFound();
  }

  const cityName = location.name;
  const stateName = location.state || cityName;
  const title = fillTemplate(page.heroTitle || page.title || slug, { city: cityName, state: stateName });

  const wpSchema = webPageJsonLd({
    type: "WebPage",
    name: title,
    description: fillTemplate(page.metaDescription || page.heroSubtitle || "", { city: cityName, state: stateName }),
    path: `/${locationSlug}/${slug}`,
  });

  const bcSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: location.name, path: `/${locationSlug}` },
    { name: title, path: `/${locationSlug}/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={[wpSchema, bcSchema]} />
      <CustomDetails />
    </>
  );
}
