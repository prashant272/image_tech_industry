import Home from '@/pages-components/Home';
import { buildPageMetadata, homepageJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = buildPageMetadata({
  title: "Printing & Packaging Machinery Accessories Manufacturer, Supplier & Exporter",
  description:
    "Leading manufacturer, supplier and global exporter of high-precision printing, packaging, and lamination machinery accessories — doctor blades, ink mixing rollers, wire bar coaters, dyne test pens, slitting blades and testing equipment.",
  path: "/",
});

export default function HomePage() {
  const schema = homepageJsonLd();

  return (
    <>
      <JsonLd data={schema} />
      <Home />
    </>
  );
}
