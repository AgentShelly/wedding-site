import type { Property } from "@/content/properties/index";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tranquilovacationrentals.com";

// ============================================================
// Organization Schema
// ============================================================
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Tranquilo Vacation Rentals",
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo.png`,
    sameAs: [
      "https://www.instagram.com/tranquilovr", // TODO: Replace with actual social URLs
      "https://www.facebook.com/tranquilovr",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+15005550006",
      contactType: "customer service",
      areaServed: "MX",
      availableLanguage: ["English", "Spanish"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Playa del Carmen",
      addressRegion: "Quintana Roo",
      addressCountry: "MX",
    },
  };
}

// ============================================================
// LodgingBusiness Schema
// ============================================================
export function buildLodgingBusinessSchema(property?: Property) {
  if (!property) {
    // Generic for the homepage
    return {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "@id": `${SITE_URL}/#lodging`,
      name: "Tranquilo Vacation Rentals",
      url: SITE_URL,
      image: `${SITE_URL}/img/placeholder.jpg`,
      description:
        "Hand-picked vacation rentals in Playa del Carmen, Mexico. Villas, lofts, and condos with direct booking and no booking fees.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Playa del Carmen",
        addressRegion: "Quintana Roo",
        addressCountry: "MX",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 20.6296,
        longitude: -87.0739,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "200",
        bestRating: "5",
      },
      priceRange: "$64 - $129 per night",
      currenciesAccepted: "USD",
      paymentAccepted: "Credit Card",
      numberOfRooms: "19",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${SITE_URL}/stays/${property.slug}#lodging`,
    name: property.name,
    url: `${SITE_URL}/stays/${property.slug}`,
    image: property.images.map((img) =>
      img.startsWith("http") ? img : `${SITE_URL}${img}`
    ),
    description: property.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Playa del Carmen",
      addressRegion: "Quintana Roo",
      addressCountry: "MX",
      addressDescription: property.area,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.6296,
      longitude: -87.0739,
    },
    numberOfBedrooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: property.maxGuests,
    },
    priceRange: `$${property.pricePerNight}/night`,
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card",
    ...(property.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(property.rating),
        reviewCount: String(property.reviewCount ?? 1),
        bestRating: "5",
      },
    }),
  };
}

// ============================================================
// BlogPosting Schema
// ============================================================
export function buildBlogPostingSchema({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${slug}#article`,
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: date,
    author: {
      "@type": "Organization",
      name: "Tranquilo Vacation Rentals",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Tranquilo Vacation Rentals",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/logo.png`,
      },
    },
    image: `${SITE_URL}/img/placeholder.jpg`,
    inLanguage: "en",
  };
}

// ============================================================
// BreadcrumbList Schema
// ============================================================
export function buildBreadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
