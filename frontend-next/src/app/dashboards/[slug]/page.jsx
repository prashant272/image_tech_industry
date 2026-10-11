import DashboardDetailPage from '@/pages-components/DashboardDetailPage';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formatted = (slug || '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} Dashboard | Imagetech Industries`,
    description: `Dashboard preview and functionality for ${formatted}.`,
  };
}

export default function DashboardPage() {
  return <DashboardDetailPage />;
}
