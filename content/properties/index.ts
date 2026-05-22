// ================================================================
// TRANQUILO VACATION RENTALS — PROPERTY DATA
// ================================================================
//
// HOW TO EDIT A PROPERTY
// ──────────────────────
// Each property block is self-contained. Find the one you want,
// edit the fields, save, and the site rebuilds automatically.
//
// KEY FIELDS TO FILL IN
//   name             ← Display name shown on the site
//   pricePerNight    ← USD, e.g. 85
//   cleaningFee      ← USD, charged once per stay
//   maxGuests        ← Maximum occupancy
//   bedrooms         ← Number of bedrooms
//   bathrooms        ← Number of bathrooms (1.5 = one full + one half)
//   shortDescription ← One sentence shown on listing cards (~120 chars)
//   description      ← Full description shown on the property page
//   images           ← Array of photo URLs (see photo guide at the bottom)
//   amenities        ← Pick from the AMENITIES LIST below
//   airbnbUrl        ← Your Airbnb listing URL (optional)
//   vrboUrl          ← Your VRBO listing URL (optional)
//   featured         ← true = appears on the homepage grid (pick 3–6)
//   published        ← false = hidden from the site entirely
//
// AMENITIES LIST (use these exact strings)
//   "wifi" | "air-conditioning" | "kitchen" | "tv" | "washer" | "dryer"
//   "pool" | "hot-tub" | "gym" | "parking" | "ev-charging"
//   "garden" | "outdoor-dining" | "bbq" | "rooftop-terrace" | "balcony"
//   "sea-view" | "beach-access" | "beachfront"
//   "linens" | "towels" | "hair-dryer" | "iron" | "safe"
//   "workspace" | "concierge" | "baby-cot" | "high-chair"
//
// PHOTO URLS
//   Cloudinary (recommended free tier): https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1/tranquilo/property-slug/photo-1.jpg
//   Or any public HTTPS URL. See hosting guide at the bottom of this file.
//
// ================================================================

// ================================================================
// NEIGHBOURHOOD COLLECTIONS
// ================================================================

export const COLLECTIONS = {
  UVADEMAR: {
    name: "Uva De Mar",
    tagline: "Lofts & villas in the heart of Centro",
    area: "Centro" as const,
    slug: "centro",
  },
  MAYALUN: {
    name: "Mayalun",
    tagline: "Beachside retreats in Zazil-Ha",
    area: "Zazil-Ha" as const,
    slug: "zazil-ha",
  },
  CASITAS: {
    name: "Casitas",
    tagline: "Tropical casitas in Colosio",
    area: "Colosio" as const,
    slug: "colosio",
  },
} as const;

export type AreaName = "Centro" | "Zazil-Ha" | "Colosio";
export type CollectionName = "Uva De Mar" | "Mayalun" | "Casitas";

// ================================================================
// PROPERTY TYPE
// ================================================================

export interface Property {
  slug: string;           // URL-safe identifier — matches /stays/[slug]
  name: string;
  collection: CollectionName;
  type: "Villa" | "Loft" | "Condo";
  area: AreaName;
  pricePerNight: number;  // USD
  cleaningFee: number;    // USD, charged once per stay
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;      // Show on homepage featured grid
  published: boolean;     // false = hidden from site
  shortDescription: string;
  description: string;
  locationDescription: string;
  images: string[];       // First image is the hero/card photo
  amenities: string[];
  houseRules: string[];
  rating?: number;        // e.g. 4.9
  reviewCount?: number;
  airbnbUrl?: string;
  vrboUrl?: string;
  bookingUrl?: string;
}

// ================================================================
// ── UVA DE MAR · CENTRO ─────────────────────────────────────────
// The Uvademar complex and other Centro properties.
// Walk to La Quinta Avenida, 5 min to the beach.
// ================================================================

const uvaDeMar: Property[] = [

  // ── Property 1 of 4 ──────────────────────────────────────────
  {
    slug: "uvademar-1415-two-lofts",
    name: "Uvademar 1415 — Two Lofts",          // TODO: confirm name
    collection: "Uva De Mar",
    type: "Loft",
    area: "Centro",
    pricePerNight: 144,                          // TODO: set your price
    cleaningFee: 75,                             // TODO: set cleaning fee
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    published: true,
    shortDescription:
      "Two stunning connected lofts in Centro — perfect for groups or families seeking stylish urban living.",
    description:
      "TODO: Add your full description here. What makes this property special? What do guests love about it?",
    locationDescription:
      "In the heart of Centro, steps from La Quinta Avenida, with easy access to restaurants, shops, and the beach.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "washer",
      "linens",
      "towels",
      "rooftop-terrace",
      "hair-dryer",
    ],
    houseRules: [
      "No smoking inside the property",
      "Pets considered on request",
      "No large parties",
      "Check-in: 3:00 PM — Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 32,
    airbnbUrl: "", // TODO: paste your Airbnb listing URL
  },

  // ── Property 2 of 4 ──────────────────────────────────────────
  {
    slug: "uvademar-11-tropical-maya",
    name: "Uvademar 11 — Tropical Maya",        // TODO: confirm name
    collection: "Uva De Mar",
    type: "Loft",
    area: "Centro",
    pricePerNight: 64,                           // TODO: set your price
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "A charming tropical loft in Centro with vibrant Mexican décor and a prime location.",
    description:
      "TODO: Add your full description here.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "linens",
      "towels",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "Check-in: 3:00 PM — Check-out: 11:00 AM",
    ],
    rating: 4.7,
    reviewCount: 28,
    airbnbUrl: "", // TODO
  },

  // ── Property 3 of 4 ──────────────────────────────────────────
  {
    slug: "uvademar-14-aurora",
    name: "Uvademar 14 — Aurora",               // TODO: confirm name
    collection: "Uva De Mar",
    type: "Loft",
    area: "Centro",
    pricePerNight: 64,                           // TODO: set your price
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Light-filled and serene — Aurora is perfectly positioned in Playa's buzzing Centro.",
    description:
      "TODO: Add your full description here.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "linens",
      "towels",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "Check-in: 3:00 PM — Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 19,
    airbnbUrl: "", // TODO
  },

  // ── Property 4 of 4 ──────────────────────────────────────────
  {
    slug: "uvademar-15-xanadu",
    name: "Uvademar 15 — Xanadu",               // TODO: confirm name
    collection: "Uva De Mar",
    type: "Loft",
    area: "Centro",
    pricePerNight: 64,                           // TODO: set your price
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Bohemian design meets Centro's infectious energy in this unique Uvademar loft.",
    description:
      "TODO: Add your full description here.",
    locationDescription:
      "Centro neighbourhood, steps from La Quinta Avenida.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "linens",
      "towels",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "Check-in: 3:00 PM — Check-out: 11:00 AM",
    ],
    rating: 4.6,
    reviewCount: 22,
    airbnbUrl: "", // TODO
  },

  // ── ADD MORE UVA DE MAR PROPERTIES HERE ──────────────────────
  // Copy a block above, give it a new slug and fill in the details.

];

// ================================================================
// ── MAYALUN · ZAZIL-HA ──────────────────────────────────────────
// Beachside properties in the Zazil-Ha neighbourhood.
// Steps from Mamitas Beach Club and the Caribbean Sea.
// ================================================================

const mayalun: Property[] = [

  // ── Property 1 of 6 ──────────────────────────────────────────
  {
    slug: "romantic-maya-lun-nirvana",
    name: "Mayalun — Nirvana",                  // TODO: confirm name
    collection: "Mayalun",
    type: "Condo",
    area: "Zazil-Ha",
    pricePerNight: 64,                           // TODO: set your price
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    published: true,
    shortDescription:
      "A romantic beachside condo in Zazil-Ha with ocean breezes and tropical charm.",
    description:
      "TODO: Add your full description here.",
    locationDescription:
      "Zazil-Ha neighbourhood, walking distance to Mamitas Beach Club and a short stroll to La Quinta Avenida.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "linens",
      "towels",
      "hair-dryer",
    ],
    houseRules: [
      "No smoking inside the property",
      "No pets",
      "No parties or events",
      "Check-in: 3:00 PM — Check-out: 11:00 AM",
      "Quiet hours: 10 PM – 8 AM",
    ],
    rating: 4.9,
    reviewCount: 47,
    airbnbUrl: "", // TODO
  },

  // ── Property 2 of 6 ──────────────────────────────────────────
  {
    slug: "mayalun-2",                          // TODO: rename to a real slug, e.g. "mayalun-serenity"
    name: "Mayalun — TODO Name",                // TODO: fill in property name
    collection: "Mayalun",
    type: "Condo",                              // TODO: "Villa" | "Loft" | "Condo"
    area: "Zazil-Ha",
    pricePerNight: 0,                           // TODO: set your price
    cleaningFee: 0,                             // TODO: set cleaning fee
    maxGuests: 0,                               // TODO: max guests
    bedrooms: 0,                                // TODO: bedrooms
    bathrooms: 0,                               // TODO: bathrooms
    featured: false,
    published: false,                           // Set to true when ready
    shortDescription: "TODO: One-sentence description for the listing card.",
    description: "TODO: Full property description.",
    locationDescription: "Zazil-Ha neighbourhood, steps from the beach.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      // TODO: add more from the amenities list at the top
    ],
    houseRules: [
      "No smoking",
      "Check-in: 3:00 PM — Check-out: 11:00 AM",
      // TODO: add your house rules
    ],
    airbnbUrl: "", // TODO
  },

  // ── Property 3 of 6 ──────────────────────────────────────────
  {
    slug: "mayalun-3",                          // TODO: rename
    name: "Mayalun — TODO Name",
    collection: "Mayalun",
    type: "Condo",
    area: "Zazil-Ha",
    pricePerNight: 0,
    cleaningFee: 0,
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    featured: false,
    published: false,                           // Set to true when ready
    shortDescription: "TODO: One-sentence description.",
    description: "TODO: Full property description.",
    locationDescription: "Zazil-Ha neighbourhood, steps from the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: ["wifi", "air-conditioning", "kitchen"],
    houseRules: ["No smoking", "Check-in: 3:00 PM — Check-out: 11:00 AM"],
    airbnbUrl: "",
  },

  // ── Property 4 of 6 ──────────────────────────────────────────
  {
    slug: "villa-maya-azul",
    name: "Villa Maya Azul",                    // TODO: confirm name
    collection: "Mayalun",
    type: "Villa",
    area: "Zazil-Ha",
    pricePerNight: 89,                          // TODO: set your price
    cleaningFee: 90,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    featured: true,
    published: true,
    shortDescription:
      "A spacious family villa in Zazil-Ha with a private pool and lush tropical gardens.",
    description:
      "TODO: Add your full description here.",
    locationDescription:
      "Zazil-Ha neighbourhood, 5 minutes walk to Mamitas Beach Club and the Caribbean Sea.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "washer",
      "pool",
      "garden",
      "outdoor-dining",
      "bbq",
      "linens",
      "towels",
      "parking",
      "hair-dryer",
    ],
    houseRules: [
      "No smoking inside",
      "Pets considered on request",
      "Small gatherings up to 10 people with advance notice",
      "Check-in: 4:00 PM — Check-out: 11:00 AM",
      "Pool hours: 8 AM – 10 PM",
    ],
    rating: 4.9,
    reviewCount: 67,
    airbnbUrl: "", // TODO
  },

  // ── Property 5 of 6 ──────────────────────────────────────────
  {
    slug: "penthouse-luna-mar",
    name: "Penthouse Luna Mar",                 // TODO: confirm name
    collection: "Mayalun",
    type: "Condo",
    area: "Zazil-Ha",
    pricePerNight: 129,                         // TODO: set your price
    cleaningFee: 95,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    published: true,
    shortDescription:
      "Penthouse living in Zazil-Ha — sea views, two bedrooms, and total luxury.",
    description:
      "TODO: Add your full description here.",
    locationDescription:
      "Top floor of a boutique building in Zazil-Ha, 2 minutes walk to the beach.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "washer",
      "sea-view",
      "rooftop-terrace",
      "linens",
      "towels",
      "hair-dryer",
      "iron",
      "concierge",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 4:00 PM — Check-out: 11:00 AM",
    ],
    rating: 4.9,
    reviewCount: 18,
    airbnbUrl: "", // TODO
  },

  // ── Property 6 of 6 ──────────────────────────────────────────
  {
    slug: "mayalun-6",                          // TODO: rename
    name: "Mayalun — TODO Name",
    collection: "Mayalun",
    type: "Condo",
    area: "Zazil-Ha",
    pricePerNight: 0,
    cleaningFee: 0,
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    featured: false,
    published: false,                           // Set to true when ready
    shortDescription: "TODO: One-sentence description.",
    description: "TODO: Full property description.",
    locationDescription: "Zazil-Ha neighbourhood, steps from the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: ["wifi", "air-conditioning", "kitchen"],
    houseRules: ["No smoking", "Check-in: 3:00 PM — Check-out: 11:00 AM"],
    airbnbUrl: "",
  },

  // ── ADD MORE MAYALUN PROPERTIES HERE ─────────────────────────

];

// ================================================================
// ── CASITAS · COLOSIO ───────────────────────────────────────────
// Tropical casitas in the residential Colosio neighbourhood.
// Lush gardens, local markets, quiet streets.
// ================================================================

const casitas: Property[] = [

  // ── Property 1 of 4 ──────────────────────────────────────────
  {
    slug: "casita-colosio-1",                   // TODO: rename, e.g. "casita-palmera"
    name: "Casita — TODO Name",                 // TODO: fill in property name
    collection: "Casitas",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 54,                          // TODO: set your price
    cleaningFee: 60,                            // TODO: set cleaning fee
    maxGuests: 4,                               // TODO: max guests
    bedrooms: 2,                                // TODO: bedrooms
    bathrooms: 1,                               // TODO: bathrooms
    featured: false,
    published: false,                           // Set to true when ready
    shortDescription: "TODO: One-sentence description for the listing card.",
    description: "TODO: Full property description.",
    locationDescription:
      "Colosio neighbourhood — residential, green, and peaceful. 10 minutes to the beach.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "washer",
      "garden",
      "outdoor-dining",
      "linens",
      "towels",
      "parking",
      // TODO: add more from the amenities list at the top
    ],
    houseRules: [
      "No smoking inside",
      "Check-in: 3:00 PM — Check-out: 11:00 AM",
      // TODO: add your house rules
    ],
    airbnbUrl: "", // TODO
  },

  // ── Property 2 of 4 ──────────────────────────────────────────
  {
    slug: "casita-colosio-2",                   // TODO: rename
    name: "Casita — TODO Name",
    collection: "Casitas",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 54,
    cleaningFee: 60,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    featured: false,
    published: false,                           // Set to true when ready
    shortDescription: "TODO: One-sentence description.",
    description: "TODO: Full property description.",
    locationDescription:
      "Colosio neighbourhood — residential, green, and peaceful. 10 minutes to the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: ["wifi", "air-conditioning", "kitchen", "garden", "linens", "towels", "parking"],
    houseRules: ["No smoking inside", "Check-in: 3:00 PM — Check-out: 11:00 AM"],
    airbnbUrl: "",
  },

  // ── Property 3 of 4 ──────────────────────────────────────────
  {
    slug: "casita-colosio-3",                   // TODO: rename
    name: "Casita — TODO Name",
    collection: "Casitas",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 54,
    cleaningFee: 60,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    featured: false,
    published: false,                           // Set to true when ready
    shortDescription: "TODO: One-sentence description.",
    description: "TODO: Full property description.",
    locationDescription:
      "Colosio neighbourhood — residential, green, and peaceful. 10 minutes to the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: ["wifi", "air-conditioning", "kitchen", "garden", "linens", "towels", "parking"],
    houseRules: ["No smoking inside", "Check-in: 3:00 PM — Check-out: 11:00 AM"],
    airbnbUrl: "",
  },

  // ── Property 4 of 4 (flagship) ───────────────────────────────
  {
    slug: "villa-cenote-paraiso",
    name: "Villa Cenote Paraíso",               // TODO: confirm name
    collection: "Casitas",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 99,                          // TODO: set your price
    cleaningFee: 110,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    featured: true,
    published: true,
    shortDescription:
      "Our flagship Colosio villa — four bedrooms, private cenote-style pool, pure paradise.",
    description:
      "TODO: Add your full description here.",
    locationDescription:
      "Colosio neighbourhood, 15 minutes to the beach, 10 minutes to La Quinta Avenida.",
    images: ["/img/placeholder.jpg"],           // TODO: add your photo URLs
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "washer",
      "pool",
      "garden",
      "outdoor-dining",
      "bbq",
      "linens",
      "towels",
      "parking",
      "hair-dryer",
      "iron",
    ],
    houseRules: [
      "No smoking inside — terrace permitted",
      "Pets considered on request, additional fee applies",
      "Events for up to 15 people available — contact us",
      "Check-in: 4:00 PM — Check-out: 11:00 AM",
      "Pool hours: 8 AM – 11 PM",
    ],
    rating: 5.0,
    reviewCount: 23,
    airbnbUrl: "", // TODO
  },

  // ── ADD MORE CASITAS HERE ─────────────────────────────────────

];

// ================================================================
// COMBINED REGISTRY (do not edit — add to sections above)
// ================================================================

const allProperties: Property[] = [...uvaDeMar, ...mayalun, ...casitas];

// ================================================================
// QUERY HELPERS
// ================================================================

export async function getAllProperties(): Promise<Property[]> {
  return allProperties.filter((p) => p.published);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return allProperties.filter((p) => p.published && p.featured);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return allProperties.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getPropertiesByArea(area: string): Promise<Property[]> {
  return allProperties.filter(
    (p) =>
      p.published &&
      p.area.toLowerCase().replace(/\s+/g, "-") === area.toLowerCase()
  );
}

export async function getPropertiesByType(type: string): Promise<Property[]> {
  return allProperties.filter(
    (p) => p.published && p.type.toLowerCase() === type.toLowerCase()
  );
}

export async function getPropertiesByCollection(
  collection: CollectionName
): Promise<Property[]> {
  return allProperties.filter(
    (p) => p.published && p.collection === collection
  );
}

export function getPropertyCountByArea(): Record<string, number> {
  return allProperties
    .filter((p) => p.published)
    .reduce<Record<string, number>>((acc, p) => {
      const key = p.area.toLowerCase().replace(/\s+/g, "-");
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
}

// ================================================================
// PHOTO HOSTING GUIDE
// ================================================================
//
// OPTION 1 — Cloudinary (recommended, free tier)
//   1. Create a free account at cloudinary.com
//   2. Upload photos via their dashboard
//   3. Copy the URL, e.g.:
//        https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/tranquilo/casita-1/photo-1.jpg
//   4. Paste into the images[] array above
//   Free tier: 25 GB storage, automatic CDN, no credit card needed.
//
// OPTION 2 — Vercel Blob (built into Vercel)
//   1. In your Vercel dashboard → Storage → Create Blob Store
//   2. Upload photos via the Vercel dashboard or CLI
//   3. Copy the URL and paste into images[] above
//   Pricing: $0.023/GB stored, $0.09/GB served.
//
// OPTION 3 — Public folder (simplest, for < 20 photos)
//   1. Place photos in /public/img/properties/[slug]/
//   2. Reference as: "/img/properties/casita-1/photo-1.jpg"
//   Fine for a small number of photos; commit them to git.
//
// RECOMMENDED IMAGE SIZES
//   Landscape photos: 1600 × 1067 px (3:2 ratio)
//   File size: aim for < 500 KB per image (use squoosh.app to compress)
//
// ================================================================
