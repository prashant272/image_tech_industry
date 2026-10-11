export async function getActiveLocations() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/locations`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).filter(loc => loc.status === 'Active');
  } catch (err) {
    console.error('Error fetching active locations:', err);
    return [];
  }
}

export async function getLocationBySlug(slug) {
  const locations = await getActiveLocations();
  return locations.find(l => l.slug.toLowerCase() === (slug || '').toLowerCase()) || null;
}
