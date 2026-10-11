import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/locations';
import Pricing from '@/pages-components/Pricing';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  const city = location?.name || 'Delhi';
  return {
    title: `Pricing & Quotations in ${city} | Imagetech Industries`,
    description: `Get pricing and quotations for doctor blades and accessories in ${city}.`,
  };
}

export default async function LocationPricingPage({ params }) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) notFound();
  return <Pricing />;
}
