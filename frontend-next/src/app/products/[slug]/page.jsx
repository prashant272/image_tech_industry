import { notFound } from 'next/navigation';
import ProductDetail from '@/pages-components/ProductDetail';
import { buildPageMetadata, productJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { resolveProductAndLocation } from '@/lib/productResolver';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product, location, isLocationPseo } = await resolveProductAndLocation(slug);

  if (!product) {
    return buildPageMetadata({
      title: "Product Not Found",
      description: "The requested industrial product was not found in our catalogue.",
      path: `/products/${slug}`,
      noindex: true,
    });
  }

  const productName = product.seoTitle || product.name || product.title;
  const cityName = location?.name;
  const stateName = location?.state || cityName;

  const title = isLocationPseo
    ? `${productName} in ${cityName}, ${stateName} | ImageTech Industries`
    : productName;

  const description = isLocationPseo
    ? `Buy ${productName} in ${cityName}, ${stateName} directly from manufacturer & supplier ImageTech Industries. Precision industrial supplies with fast delivery across ${stateName}.`
    : (
        product.seoDescription ||
        product.shortDescription ||
        product.description?.slice(0, 160) ||
        `High-precision ${productName} manufactured by ImageTech Industries for printing, coating and packaging applications.`
      );

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
  const { product, location, isLocationPseo } = await resolveProductAndLocation(slug);

  if (!product) {
    notFound();
  }

  const productName = product.name || product.title;
  const cityName = location?.name;

  const pSchema = productJsonLd({
    name: isLocationPseo ? `${productName} in ${cityName}` : productName,
    description: product.description || product.shortDescription,
    path: `/products/${slug}`,
    images: product.images?.map(img => (typeof img === 'object' ? img.url : img)) || [],
    category: product.category?.name,
  });

  const breadcrumbs = isLocationPseo
    ? [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: cityName, path: `/${location.slug}` },
        { name: `${productName} in ${cityName}`, path: `/products/${slug}` },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: productName, path: `/products/${slug}` },
      ];

  const bSchema = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <JsonLd data={[pSchema, bSchema]} />
      <ProductDetail initialProduct={product} locationData={location} isLocationPseo={isLocationPseo} />
    </>
  );
}
