import IndustryDetail from '@/pages-components/IndustryDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} Solutions | Imagetech Industries`,
    description: `Explore tailor-made manufacturing and supply solutions for ${formatted} by Imagetech Industries.`,
  };
}

export default function IndustryDetailPage() {
  return <IndustryDetail />;
}
