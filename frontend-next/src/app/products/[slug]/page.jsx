import { notFound } from 'next/navigation';
import ProductDetail from '@/pages-components/ProductDetail';
import { buildPageMetadata, productJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

async function getProduct(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/products`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const products = await res.json();
    return products.find(p => p.slug === slug) || null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return buildPageMetadata({
      title: "Product Not Found",
      description: "The requested industrial product was not found in our catalogue.",
      path: `/products/${slug}`,
      noindex: true,
    });
  }

  const title = product.seoTitle || product.name || product.title;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    product.description?.slice(0, 160) ||
    `High-precision ${product.name} manufactured by ImageTech Industries for printing, coating and packaging applications.`;

  const ogImageUrl = product.images?.[0]?.url || (typeof product.images?.[0] === 'string' ? product.images[0] : null);

  return buildPageMetadata({
    title,
    description,
    path: `/products/${slug}`,
    image: ogImageUrl ? { url: ogImageUrl, width: 800, height: 800, alt: title } : undefined,
  });
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const pSchema = productJsonLd({
    name: product.name || product.title,
    description: product.description || product.shortDescription,
    path: `/products/${slug}`,
    images: product.images?.map(img => (typeof img === 'object' ? img.url : img)) || [],
    category: product.category?.name,
  });

  const bSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.name || product.title, path: `/products/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={[pSchema, bSchema]} />
      <ProductDetail />
    </>
  );
}
