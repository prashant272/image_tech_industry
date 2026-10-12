import Products from '@/pages-components/Products';
import { buildPageMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = buildPageMetadata({
  title: 'Special Products | Precision Printing & Industrial Solutions',
  description:
    'Explore ImageTech Industries exclusive special products line including high-precision doctor blades, coating accessories, and custom printing machinery equipment.',
  path: '/special-product',
});

export default function SpecialProductPage() {
  const wpSchema = webPageJsonLd({
    type: "CollectionPage",
    name: "Special Products Catalogue",
    description: "Specialized precision printing and packaging machinery products catalogue.",
    path: "/special-product",
  });

  const bcSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Special Products", path: "/special-product" },
  ]);

  return (
    <>
      <JsonLd data={[wpSchema, bcSchema]} />
      <Products isSpecialOnly={true} />
    </>
  );
}
