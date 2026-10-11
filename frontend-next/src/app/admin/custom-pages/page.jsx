import CustomPageManagement from '@/pages-components/admin/CustomPageManagement';

export const metadata = {
  title: 'Custom Pages Management | Admin Panel',
  robots: { index: false, follow: false },
};

export default function CustomPagesAdminRoute() {
  return <CustomPageManagement />;
}
