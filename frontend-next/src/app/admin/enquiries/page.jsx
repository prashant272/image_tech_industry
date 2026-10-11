import EnquiryList from '@/pages-components/admin/EnquiryList';

export const metadata = {
  title: 'Enquiry List | Admin Panel',
  robots: { index: false, follow: false },
};

export default function EnquiriesAdminRoute() {
  return <EnquiryList />;
}
