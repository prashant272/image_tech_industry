import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import CustomDetails from '@/pages-components/CustomDetails';

export async function generateMetadata({ params }) {
  const { locationSlug, slug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const cityName = location ? location.name : 'Delhi';
  const stateName = location ? (location.state || cityName) : 'Delhi';

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${apiUrl}/custom-pages/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const page = await res.json();
      if (page) {
        const replacePlaceholders = (text) => {
          if (!text || typeof text !== 'string') return text;
          return text.replace(/{city}/gi, cityName).replace(/{state}/gi, stateName);
        };

        const metaTitle = replacePlaceholders(page.metaTitle || page.heroTitle || page.title);
        const metaDesc = replacePlaceholders(page.metaDescription || page.heroSubtitle);
        const metaKeywords = replacePlaceholders(page.metaKeywords);

        return {
          title: `${metaTitle} | Imagetech Industries`,
          description: metaDesc,
          keywords: metaKeywords ? metaKeywords.split(',').map(s => s.trim()) : undefined,
          openGraph: {
            title: metaTitle,
            description: metaDesc,
            images: page.heroImage ? [{ url: page.heroImage }] : [],
          },
        };
      }
    }
  } catch (err) {
    console.error('Error generating custom page metadata:', err);
  }

  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: '404 - Page Not Found | Imagetech Industries',
    robots: { index: false, follow: false },
  };
}

export default async function LocationCustomPage({ params }) {
  const { locationSlug, slug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/custom-pages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      notFound();
    }
  } catch (err) {
    notFound();
  }

  return <CustomDetails />;
}
