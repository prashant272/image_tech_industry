import ProductCategoryManagement from '@/pages-components/admin/ProductCategoryManagement';

export const metadata = {
  title: 'Product Categories | Admin Panel',
  robots: { index: false, follow: false },
};

export default function CategoriesAdminRoute() {
  return <ProductCategoryManagement />;
}
