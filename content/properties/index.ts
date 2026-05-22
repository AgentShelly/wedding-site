export interface Property {
  slug: string;
  name: string;
  type: "Villa" | "Loft" | "Condo";
  area: "Zazil-Ha" | "Centro" | "Colosio";
  pricePerNight: number;
  cleaningFee: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
  published: boolean;
  shortDescription: string;
  description: string;
  locationDescription: string;
  images: string[];
  amenities: string[];
  houseRules: string[];
  rating?: number;
  reviewCount?: number;
  airbnbUrl?: string;
  vrboUrl?: string;
}

// ============================================================
// Property definitions — 19 properties
// ============================================================

const properties: Property[] = [
  // 1
  {
    slug: "romantic-maya-lun-nirvana",
    name: "Romantic Maya Lun Nirvana",
    type: "Condo",
    area: "Zazil-Ha",
    pricePerNight: 64,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    published: true,
    shortDescription:
      "A romantic beachside condo in Zazil-Ha with ocean breezes and tropical charm.",
    description:
      "Escape to this beautifully appointed romantic condo in the heart of Zazil-Ha. Perfectly designed for couples, the Nirvana offers a serene retreat with lush tropical surroundings, ocean breezes, and easy access to Playa del Carmen's finest beach clubs. Wake up to the sound of the Caribbean, sip your morning coffee on the private terrace, and spend your days exploring the vibrant culture just steps away.",
    locationDescription:
      "Located in the sought-after Zazil-Ha neighbourhood, walking distance to Mamitas Beach Club and a short stroll to La Quinta Avenida.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "linens",
      "towels",
      "hair-dryer",
      "iron",
    ],
    houseRules: [
      "No smoking inside the property",
      "No pets allowed",
      "No parties or events",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
      "Quiet hours: 10 PM – 8 AM",
    ],
    rating: 4.9,
    reviewCount: 47,
    airbnbUrl: "https://www.airbnb.com", // TODO: Replace with actual URL
  },

  // 2
  {
    slug: "uvademar-1415-two-lofts",
    name: "Uvademar 1415 Two Lofts",
    type: "Loft",
    area: "Centro",
    pricePerNight: 144,
    cleaningFee: 75,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    published: true,
    shortDescription:
      "Two stunning connected lofts in Centro — perfect for groups or families seeking stylish urban living.",
    description:
      "Welcome to Uvademar 1415, a unique property featuring two beautifully connected lofts in the heart of Playa del Carmen's Centro neighbourhood. With two bedrooms and two bathrooms, this is the perfect choice for families or small groups who want style, space, and a prime location. High ceilings, artistic interiors, and a rooftop terrace make this a truly special stay.",
    locationDescription:
      "In the heart of Centro, steps from La Quinta Avenida, with easy access to restaurants, shops, and the beach.",
    images: ["/img/placeholder.jpg"],
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
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 32,
    airbnbUrl: "https://www.airbnb.com", // TODO: Replace with actual URL
  },

  // 3
  {
    slug: "uvademar-11-tropical-maya",
    name: "Uvademar 11 Tropical Maya",
    type: "Loft",
    area: "Centro",
    pricePerNight: 64,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "A charming tropical loft in Centro with vibrant Mexican decor and a prime location.",
    description:
      "The Tropical Maya loft at Uvademar 11 is a celebration of Mexican artisan design. With its vibrant colours, handcrafted furniture, and lush potted plants, this cosy space feels like a boutique hotel room crossed with an artist's studio. Located right in Centro, you're steps from everything Playa has to offer.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: ["wifi", "air-conditioning", "kitchen", "tv", "linens", "towels"],
    houseRules: [
      "No smoking",
      "No pets",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.7,
    reviewCount: 28,
  },

  // 4
  {
    slug: "uvademar-14-aurora",
    name: "Uvademar 14 Aurora",
    type: "Loft",
    area: "Centro",
    pricePerNight: 64,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "The Aurora loft — light-filled, serene, and perfectly positioned in Playa's buzzing Centro.",
    description:
      "Aurora lives up to its name with a light-flooded interior that glows warmly in the Caribbean sun. This loft is designed for those who appreciate understated elegance — clean lines, natural materials, and a calm atmosphere amidst the vibrant Centro neighbourhood.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: ["wifi", "air-conditioning", "kitchen", "tv", "linens", "towels"],
    houseRules: [
      "No smoking",
      "No pets",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 19,
  },

  // 5
  {
    slug: "uvademar-15-xanadu",
    name: "Uvademar 15 Xanadu",
    type: "Loft",
    area: "Centro",
    pricePerNight: 64,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Xanadu — a loft where bohemian design meets Centro's infectious energy.",
    description:
      "Named for the legendary pleasure dome, Xanadu is a place of simple pleasures and sensory delight. This loft combines bohemian design influences with the laid-back spirit of Playa del Carmen. Colourful textiles, eclectic artwork, and a breezy layout make it a truly unique retreat.",
    locationDescription:
      "Centro neighbourhood, steps from La Quinta Avenida.",
    images: ["/img/placeholder.jpg"],
    amenities: ["wifi", "air-conditioning", "kitchen", "tv", "linens", "towels"],
    houseRules: [
      "No smoking",
      "No pets",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.6,
    reviewCount: 22,
  },

  // 6
  {
    slug: "lovely-hawaii-villa",
    name: "Lovely Hawaii Villa",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 54,
    cleaningFee: 60,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "A tropical Hawaiian-inspired villa in Colosio with lush gardens and relaxed vibes.",
    description:
      "The Hawaii Villa brings the spirit of the Pacific islands to the Caribbean coast. With its lush tropical garden, open-air living spaces, and cheerful Hawaiian-inspired decor, this villa is perfect for families or small groups seeking a relaxed, nature-filled escape. Colosio's quiet streets provide the perfect backdrop for a peaceful holiday.",
    locationDescription:
      "Colosio neighbourhood — residential, green, and peaceful. 10 minutes to the beach.",
    images: ["/img/placeholder.jpg"],
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
    ],
    houseRules: [
      "No smoking inside",
      "Small pets considered on request",
      "No large parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.7,
    reviewCount: 41,
  },

  // 7
  {
    slug: "lovely-bali-villa",
    name: "Lovely Bali Villa",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 54,
    cleaningFee: 60,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Balinese design meets Caribbean warmth in this tranquil Colosio villa.",
    description:
      "Inspired by the serene aesthetics of Bali, this villa blends natural materials, carved wooden details, and lush tropical planting to create a deeply peaceful atmosphere. The Bali Villa is ideal for guests who want to unwind completely — meditate in the garden, cook together in the open kitchen, or simply do nothing.",
    locationDescription:
      "Colosio neighbourhood — residential, green, and peaceful. 10 minutes to the beach.",
    images: ["/img/placeholder.jpg"],
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
    ],
    houseRules: [
      "No smoking inside",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 36,
  },

  // 8
  {
    slug: "lovely-honolulu-villa",
    name: "Lovely Honolulu Villa",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 54,
    cleaningFee: 60,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Sunshine, colour, and island spirit in this cheerful Colosio villa.",
    description:
      "The Honolulu Villa radiates the bright, happy energy of its namesake city. Colourful murals, vintage Hawaiian prints, and a sun-drenched terrace make this an uplifting space for any traveller. The villa sleeps four comfortably, with plenty of space to spread out and relax.",
    locationDescription:
      "Colosio neighbourhood — residential, green, and peaceful. 10 minutes to the beach.",
    images: ["/img/placeholder.jpg"],
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
    ],
    houseRules: [
      "No smoking inside",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.7,
    reviewCount: 29,
  },

  // 9
  {
    slug: "romantic-phuket-villa",
    name: "Romantic Phuket Villa",
    type: "Villa",
    area: "Zazil-Ha",
    pricePerNight: 54,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
    published: true,
    shortDescription:
      "Thai-inspired romantic villa in Zazil-Ha — a serene escape for couples.",
    description:
      "The Phuket Villa draws on the romance of Southeast Asian design to create an intimate retreat for couples. Teak accents, silk throws, and a private garden with tropical flowers set the scene for a truly special stay. Located in the premium Zazil-Ha neighbourhood, you're steps from the Caribbean.",
    locationDescription:
      "Zazil-Ha neighbourhood, walking distance to the beach and Mamitas Beach Club.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "garden",
      "linens",
      "towels",
      "hair-dryer",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
      "Adults only — 18+",
    ],
    rating: 4.9,
    reviewCount: 58,
    airbnbUrl: "https://www.airbnb.com", // TODO: Replace with actual URL
  },

  // 10
  {
    slug: "romantic-ubud-villa",
    name: "Romantic Ubud Villa",
    type: "Villa",
    area: "Zazil-Ha",
    pricePerNight: 54,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Ubud's jungle magic transplanted to the Caribbean coast of Playa del Carmen.",
    description:
      "The Ubud Villa recreates the magical atmosphere of Bali's artistic heartland. Surrounded by lush vegetation and filled with handcrafted Indonesian pieces, this romantic villa is an oasis of calm and creativity. Perfect for couples seeking inspiration and tranquility.",
    locationDescription:
      "Zazil-Ha neighbourhood, walking distance to the beach and Mamitas Beach Club.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "garden",
      "linens",
      "towels",
      "hair-dryer",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 44,
  },

  // 11
  {
    slug: "romantic-krabi-villa",
    name: "Romantic Krabi Villa",
    type: "Villa",
    area: "Zazil-Ha",
    pricePerNight: 54,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Cliffside romance without the cliffs — the Krabi Villa in beautiful Zazil-Ha.",
    description:
      "Named for Thailand's dramatic coastal landscape, the Krabi Villa channels dramatic beauty into a compact, intimate space. Stone textures, natural wood, and clever use of light create an atmosphere that feels both rugged and refined. A perfect romantic escape for adventurous couples.",
    locationDescription:
      "Zazil-Ha neighbourhood, walking distance to the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "garden",
      "linens",
      "towels",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.7,
    reviewCount: 31,
  },

  // 12
  {
    slug: "romantic-tokyo-villa",
    name: "Romantic Tokyo Villa",
    type: "Villa",
    area: "Centro",
    pricePerNight: 54,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Minimalist Japanese design meets tropical colour in this romantic Centro villa.",
    description:
      "The Tokyo Villa brings the precision and calm of Japanese design to the heart of Playa del Carmen. Clean lines, neutral tones punctuated with occasional bold accents, and a beautifully minimal aesthetic create a space that is both restful and stimulating. Perfect for design-conscious couples.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "garden",
      "linens",
      "towels",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.6,
    reviewCount: 17,
  },

  // 13
  {
    slug: "romantic-capri-villa",
    name: "Romantic Capri Villa",
    type: "Villa",
    area: "Centro",
    pricePerNight: 54,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Mediterranean elegance in Centro — the Capri Villa brings Italian coastal charm to the Caribbean.",
    description:
      "Inspired by the island of Capri, this romantic villa combines the blue-and-white palette of the Mediterranean with the lush abundance of the tropics. Terracotta tiles, ceramic pottery, and bougainvillaea-draped walls create an irresistibly romantic setting for couples.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "garden",
      "linens",
      "towels",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 26,
  },

  // 14
  {
    slug: "romantic-paris-villa",
    name: "Romantic Paris Villa",
    type: "Villa",
    area: "Centro",
    pricePerNight: 54,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Parisian romance in the tropics — every detail designed for couples in love.",
    description:
      "The Paris Villa proves that romance has no borders. With its French-inspired details — floral wallpapers, ornate mirrors, and soft pastel tones — this villa creates an atmosphere of timeless romance. Combine it with the warmth of the Caribbean and you have the perfect couples' retreat.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "garden",
      "linens",
      "towels",
      "hair-dryer",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
      "Adults only — 18+",
    ],
    rating: 4.9,
    reviewCount: 39,
  },

  // 15
  {
    slug: "romantic-santorini-villa",
    name: "Romantic Santorini Villa",
    type: "Villa",
    area: "Centro",
    pricePerNight: 54,
    cleaningFee: 45,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    published: true,
    shortDescription:
      "Santorini's iconic blue-and-white magic, reimagined in Playa del Carmen's Centro.",
    description:
      "Step into the Santorini Villa and feel transported to the Greek islands. The iconic blue-and-white colour palette, arched doorways, and Mediterranean-inspired ceramics create an unmistakable atmosphere. One of our most Instagrammable properties, and endlessly romantic for couples.",
    locationDescription:
      "Centro neighbourhood, walking distance to La Quinta Avenida and the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "garden",
      "linens",
      "towels",
    ],
    houseRules: [
      "No smoking",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 33,
  },

  // 16
  {
    slug: "villa-maya-azul",
    name: "Villa Maya Azul",
    type: "Villa",
    area: "Zazil-Ha",
    pricePerNight: 89,
    cleaningFee: 90,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    featured: true,
    published: true,
    shortDescription:
      "A spacious family villa in Zazil-Ha with a private pool and stunning Maya-inspired design.",
    description:
      "Villa Maya Azul is one of our signature properties. Designed with deep respect for Maya architectural traditions, this three-bedroom villa surrounds a private pool with lush tropical gardens. Accommodation for up to six guests makes it ideal for family holidays or groups of friends. The location in Zazil-Ha means the beach is always close.",
    locationDescription:
      "Zazil-Ha neighbourhood, 5 minutes walk to Mamitas Beach Club and the Caribbean Sea.",
    images: ["/img/placeholder.jpg"],
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
      "Small gatherings of up to 10 people allowed with advance notice",
      "Check-in: 4:00 PM, Check-out: 11:00 AM",
      "Pool hours: 8 AM – 10 PM",
    ],
    rating: 4.9,
    reviewCount: 67,
    airbnbUrl: "https://www.airbnb.com", // TODO: Replace with actual URL
  },

  // 17
  {
    slug: "villa-cenote-paraiso",
    name: "Villa Cenote Paraíso",
    type: "Villa",
    area: "Colosio",
    pricePerNight: 99,
    cleaningFee: 110,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    featured: true,
    published: true,
    shortDescription:
      "Our flagship family villa in Colosio — four bedrooms, private cenote-style pool, paradise found.",
    description:
      "Villa Cenote Paraíso is the crown jewel of our collection. This stunning four-bedroom estate in Colosio is designed around a spectacular cenote-style pool — a circular, stone-lined swimming pool that recreates the magical experience of swimming in Yucatán's underground cenotes. With four bedrooms, three bathrooms, and expansive outdoor living spaces, this villa accommodates up to eight guests in absolute luxury.",
    locationDescription:
      "Colosio neighbourhood, 15 minutes to the beach, 10 minutes to La Quinta Avenida.",
    images: ["/img/placeholder.jpg"],
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
      "gym",
    ],
    houseRules: [
      "No smoking inside",
      "Pets considered on request — additional fee applies",
      "Events for up to 15 people available — contact us for details",
      "Check-in: 4:00 PM, Check-out: 11:00 AM",
      "Pool hours: 8 AM – 11 PM",
    ],
    rating: 5.0,
    reviewCount: 23,
    airbnbUrl: "https://www.airbnb.com", // TODO: Replace with actual URL
  },

  // 18
  {
    slug: "villa-palma-real",
    name: "Villa Palma Real",
    type: "Villa",
    area: "Centro",
    pricePerNight: 79,
    cleaningFee: 75,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: false,
    published: true,
    shortDescription:
      "A stylish Centro villa with a rooftop terrace and the best location in Playa del Carmen.",
    description:
      "Villa Palma Real offers the best of both worlds: the charm and privacy of a villa with the unbeatable location of Centro. Two beautifully furnished bedrooms, two bathrooms, a fully equipped kitchen, and a spectacular rooftop terrace with views across the rooftops to the Caribbean make this a top choice for discerning travellers.",
    locationDescription:
      "Prime Centro location, two blocks from La Quinta Avenida and five minutes to the beach.",
    images: ["/img/placeholder.jpg"],
    amenities: [
      "wifi",
      "air-conditioning",
      "kitchen",
      "tv",
      "washer",
      "rooftop-terrace",
      "garden",
      "linens",
      "towels",
      "hair-dryer",
      "iron",
    ],
    houseRules: [
      "No smoking inside — smoking permitted on rooftop",
      "No pets",
      "No parties",
      "Check-in: 3:00 PM, Check-out: 11:00 AM",
    ],
    rating: 4.8,
    reviewCount: 51,
  },

  // 19
  {
    slug: "penthouse-luna-mar",
    name: "Penthouse Luna Mar",
    type: "Condo",
    area: "Zazil-Ha",
    pricePerNight: 129,
    cleaningFee: 95,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    published: true,
    shortDescription:
      "Penthouse living in Zazil-Ha — sweeping sea views, two bedrooms, and total luxury.",
    description:
      "The Penthouse Luna Mar is our most luxurious condo, occupying the top floor of a boutique building in the heart of Zazil-Ha. With two bedrooms, two bathrooms, and a wraparound terrace offering panoramic views of the Caribbean Sea, this is as good as it gets in Playa del Carmen. The property features premium furnishings, a fully equipped chef's kitchen, and a dedicated concierge service.",
    locationDescription:
      "Top floor of a boutique building in Zazil-Ha, 2 minutes walk to the beach and Mamitas Beach Club.",
    images: ["/img/placeholder.jpg"],
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
      "Check-in: 4:00 PM, Check-out: 11:00 AM",
      "Adults only — 18+",
    ],
    rating: 4.9,
    reviewCount: 18,
    airbnbUrl: "https://www.airbnb.com", // TODO: Replace with actual URL
  },
];

// ============================================================
// Helpers
// ============================================================

export async function getAllProperties(): Promise<Property[]> {
  return properties.filter((p) => p.published);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  return properties.filter((p) => p.published && p.featured);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return properties.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getPropertiesByArea(area: string): Promise<Property[]> {
  return properties.filter(
    (p) =>
      p.published &&
      p.area.toLowerCase().replace(/\s+/g, "-") === area.toLowerCase()
  );
}

export async function getPropertiesByType(type: string): Promise<Property[]> {
  return properties.filter(
    (p) =>
      p.published && p.type.toLowerCase() === type.toLowerCase()
  );
}

export default properties;
