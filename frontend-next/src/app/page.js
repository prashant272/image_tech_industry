import Home from '@/pages-components/Home';
import { homepageJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { getFeaturedProducts } from '@/lib/products';

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const schema = homepageJsonLd();
  const products = await getFeaturedProducts();

  return (
    <>
      <JsonLd data={schema} />
      <Home products={products} />
    </>
  );
}
