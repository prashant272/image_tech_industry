import { getActiveLocations, getLocationBySlug } from './locations.js';

/**
 * Resolves whether a slug is a direct product slug or a pSEO slug (e.g. `nylon-filter-cloth-in-jaipur`).
 * If it contains `-in-`, it extracts the product slug and location slug, and verifies both exist.
 */
export async function resolveProductAndLocation(rawSlug = '') {
  const normalized = String(rawSlug).trim().toLowerCase();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';

  let allProducts = [];
  try {
    const res = await fetch(`${apiUrl}/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      allProducts = await res.json();
    }
  } catch (err) {
    console.error('Error loading products list:', err.message);
  }

  // 1. Direct match first
  const directProduct = allProducts.find(p => p.slug === normalized);
  if (directProduct) {
    return {
      product: directProduct,
      location: null,
      isLocationPseo: false,
    };
  }

  // 2. Check for `-in-` pattern
  if (normalized.includes('-in-')) {
    const lastInIndex = normalized.lastIndexOf('-in-');
    const potentialProductSlug = normalized.slice(0, lastInIndex);
    const potentialLocationSlug = normalized.slice(lastInIndex + 4);

    const product = allProducts.find(p => p.slug === potentialProductSlug);
    if (product) {
      const location = await getLocationBySlug(potentialLocationSlug);
      if (location) {
        return {
          product,
          location,
          isLocationPseo: true,
        };
      }
    }
  }

  return { product: null, location: null, isLocationPseo: false };
}
