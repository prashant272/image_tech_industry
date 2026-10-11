export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/sitemap`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return new Response('Error loading sitemap', { status: 500 });
    }
    const xml = await res.text();
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err) {
    console.error('Error proxying sitemap:', err);
    return new Response('Error loading sitemap', { status: 500 });
  }
}
