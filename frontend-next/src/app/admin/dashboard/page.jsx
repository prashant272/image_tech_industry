import AdminDashboard from '@/pages-components/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard | Imagetech Industries',
  robots: { index: false, follow: false },
};

export default function DashboardRoute() {
  return <AdminDashboard />;
}
