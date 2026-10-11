import Products from '@/pages-components/Products';
import { buildPageMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = buildPageMetadata({
  title: 'Our Products | Printing & Packaging Machinery Accessories',
  description:
    'Browse ImageTech Industries catalogue of WIPEX carbon steel doctor blades, polymer blades, magnetic ink mixing rollers, wire bar coaters, dyne test pens, and slitting blades.',
  path: '/products',
});

export default function ProductsPage() {
  const wpSchema = webPageJsonLd({
    type: "CollectionPage",
    name: "Printing & Packaging Machinery Products Catalogue",
    description: "Industrial doctor blades, mixing rollers, testing equipment, and machine accessories catalogue.",
    path: "/products",
  });

  const bcSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ]);

  return (
    <>
      <JsonLd data={[wpSchema, bcSchema]} />
      <Products />
    </>
  );
}
