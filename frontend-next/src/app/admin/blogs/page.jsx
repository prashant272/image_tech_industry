import BlogManagement from '@/pages-components/admin/BlogManagement';

export const metadata = {
  title: 'Blog Management | Admin Panel',
  robots: { index: false, follow: false },
};

export default function BlogsAdminRoute() {
  return <BlogManagement />;
}
