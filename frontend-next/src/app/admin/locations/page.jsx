import LocationManagement from '@/pages-components/admin/LocationManagement';

export const metadata = {
  title: 'Locations Management | Admin Panel',
  robots: { index: false, follow: false },
};

export default function LocationsAdminRoute() {
  return <LocationManagement />;
}
