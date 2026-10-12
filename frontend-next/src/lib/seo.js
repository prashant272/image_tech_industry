// Shared SEO configuration and helpers. Server-safe (no client-only code).

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.imagetechindustries.com"
).replace(/\/+$/, "");

export const SITE_NAME = "ImageTech Industries";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "ImageTech Industries - Doctor blades and printing & packaging machinery accessories",
};

export const COMPANY = {
  legalName: "ImageTech Industries",
  alternateNames: [
    "Image Tech Industries",
    "Imagetech Industries",
    "Image Tech Industry",
    "Imagetech Industry",
    "Image Tech"
  ],
  logoPath: "/images/logo.png",
  email: "sales@imagetechindustries.com",
  telephone: null,
  address: {
    addressCountry: "IN",
    addressLocality: "Delhi"
  },
  sameAs: []
};

/* -------------------------------------------------------------------------- */
/* URL + slug helpers                                                         */
/* -------------------------------------------------------------------------- */

export function slugify(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizePath(path = "/") {
  let p = ("/" + String(path).split(/[?#]/)[0]).replace(/\/{2,}/g, "/");
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p;
}

export function absoluteUrl(path = "/") {
  const p = normalizePath(path);
  return p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}

/* -------------------------------------------------------------------------- */
/* Template helpers                                                           */
/* -------------------------------------------------------------------------- */

export function fillTemplate(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    values[key] !== undefined && values[key] !== null ? String(values[key]) : match
  );
}

const BRAND_SUFFIX = /\s*[|\u2013\u2014-]\s*image\s?tech(?:\s+industries)?\s*$/i;
export function stripBrand(title = "") {
  return String(title).replace(BRAND_SUFFIX, "").trim();
}

/* -------------------------------------------------------------------------- */
/* Metadata builder for pages (use inside generateMetadata / metadata)       */
/* -------------------------------------------------------------------------- */

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  noindex = false,
  type = "website",
}) {
  const cleanTitle = stripBrand(title);
  const canonical = absoluteUrl(path);
  const ogImage = image || DEFAULT_OG_IMAGE;
  const shareTitle = `${cleanTitle} | ${SITE_NAME}`;

  const isRoot = !path || path === "/" || path === "";
  const finalTitle = isRoot ? shareTitle : cleanTitle;

  return {
    title: finalTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: shareTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD Structured Data                                                    */
/* -------------------------------------------------------------------------- */

const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)
    )
  );

export function safeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function homepageJsonLd() {
  const organization = compact({
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    alternateName: COMPANY.alternateNames,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl(COMPANY.logoPath) },
    description:
      "ImageTech Industries is a manufacturer, supplier and global exporter of high-precision printing, packaging, and lamination machinery accessories — including doctor blades, magnetic ink mixing rollers, wire bar coaters, dyne test pens, slitting blades, stroboscopes and testing instruments.",
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    address: COMPANY.address
      ? compact({ "@type": "PostalAddress", ...COMPANY.address })
      : null,
    sameAs: COMPANY.sameAs,
  });

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    alternateName: COMPANY.alternateNames,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };

  return { "@context": "https://schema.org", "@graph": [organization, website] };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd({ type = "WebPage", name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, url: absoluteUrl("/") },
  };
}

export function productJsonLd({ name, description, path, images = [], brand = SITE_NAME, sku, category }) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(path),
    image: images.map((src) => (src.startsWith("http") ? src : absoluteUrl(src))),
    brand: brand ? { "@type": "Brand", name: brand } : null,
    sku: sku || null,
    category: category || null,
  });
}
