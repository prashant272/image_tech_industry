import ProductManagement from '@/pages-components/admin/ProductManagement';

export const metadata = {
  title: 'Product Management | Admin Panel',
  robots: { index: false, follow: false },
};

export default function ProductsAdminRoute() {
  return <ProductManagement />;
}
