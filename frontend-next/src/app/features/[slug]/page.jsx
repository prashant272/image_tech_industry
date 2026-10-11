import FeatureDetail from '@/pages-components/FeatureDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} Feature Guide | Imagetech Industries`,
    description: `Detailed guide and technical specifications for ${formatted} provided by Imagetech Industries.`,
  };
}

export default function FeatureDetailPage() {
  return <FeatureDetail />;
}
