import { productsData } from '@/data/products';

export async function getFeaturedProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/products`, {
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.error('Error fetching products for server render, falling back to static:', err.message);
  }

  // Fallback to static catalog so raw HTML always has products and links
  return productsData;
}
