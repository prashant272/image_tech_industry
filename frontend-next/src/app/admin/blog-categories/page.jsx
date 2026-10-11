import BlogCategoryManagement from '@/pages-components/admin/BlogCategoryManagement';

export const metadata = {
  title: 'Blog Categories | Admin Panel',
  robots: { index: false, follow: false },
};

export default function BlogCategoriesRoute() {
  return <BlogCategoryManagement />;
}
