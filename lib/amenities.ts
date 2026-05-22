export interface Amenity {
  slug: string;
  en: string;
  es: string;
  icon: string;
  category: "essential" | "comfort" | "outdoor" | "kitchen" | "safety" | "services";
}

export const AMENITIES: Amenity[] = [
  // Essential
  { slug: "wifi", en: "Free Wi-Fi", es: "Wi-Fi gratuito", icon: "📶", category: "essential" },
  { slug: "air-conditioning", en: "Air conditioning", es: "Aire acondicionado", icon: "❄️", category: "essential" },
  { slug: "kitchen", en: "Fully equipped kitchen", es: "Cocina totalmente equipada", icon: "🍳", category: "kitchen" },
  { slug: "tv", en: "Smart TV", es: "TV inteligente", icon: "📺", category: "essential" },
  { slug: "linens", en: "Fresh linens provided", es: "Ropa de cama incluida", icon: "🛏️", category: "essential" },
  { slug: "towels", en: "Towels provided", es: "Toallas incluidas", icon: "🛁", category: "essential" },

  // Comfort
  { slug: "washer", en: "Washing machine", es: "Lavadora", icon: "🫧", category: "comfort" },
  { slug: "hair-dryer", en: "Hair dryer", es: "Secador de pelo", icon: "💨", category: "comfort" },
  { slug: "iron", en: "Iron & ironing board", es: "Plancha y tabla", icon: "👔", category: "comfort" },
  { slug: "safe", en: "Safe box", es: "Caja fuerte", icon: "🔒", category: "comfort" },
  { slug: "blackout-curtains", en: "Blackout curtains", es: "Cortinas opacas", icon: "🌙", category: "comfort" },
  { slug: "workspace", en: "Dedicated workspace", es: "Área de trabajo", icon: "💼", category: "comfort" },

  // Outdoor
  { slug: "pool", en: "Private pool", es: "Piscina privada", icon: "🏊", category: "outdoor" },
  { slug: "garden", en: "Private garden", es: "Jardín privado", icon: "🌿", category: "outdoor" },
  { slug: "outdoor-dining", en: "Outdoor dining area", es: "Comedor al aire libre", icon: "🌴", category: "outdoor" },
  { slug: "bbq", en: "BBQ / Grill", es: "Parrilla / BBQ", icon: "🔥", category: "outdoor" },
  { slug: "hammock", en: "Hammock", es: "Hamaca", icon: "🌅", category: "outdoor" },
  { slug: "rooftop-terrace", en: "Rooftop terrace", es: "Terraza en azotea", icon: "🏙️", category: "outdoor" },
  { slug: "sea-view", en: "Sea view", es: "Vista al mar", icon: "🌊", category: "outdoor" },
  { slug: "parking", en: "Free parking", es: "Estacionamiento gratuito", icon: "🚗", category: "outdoor" },

  // Kitchen
  { slug: "coffee-maker", en: "Coffee maker", es: "Cafetera", icon: "☕", category: "kitchen" },
  { slug: "blender", en: "Blender", es: "Licuadora", icon: "🥤", category: "kitchen" },
  { slug: "dishwasher", en: "Dishwasher", es: "Lavavajillas", icon: "🫧", category: "kitchen" },

  // Safety
  { slug: "first-aid", en: "First aid kit", es: "Botiquín de primeros auxilios", icon: "🩺", category: "safety" },
  { slug: "smoke-detector", en: "Smoke detector", es: "Detector de humo", icon: "🚨", category: "safety" },
  { slug: "fire-extinguisher", en: "Fire extinguisher", es: "Extintor de incendios", icon: "🧯", category: "safety" },

  // Services
  { slug: "concierge", en: "Concierge service", es: "Servicio de conserjería", icon: "🛎️", category: "services" },
  { slug: "gym", en: "Gym access", es: "Acceso al gimnasio", icon: "💪", category: "services" },
  { slug: "beach-access", en: "Private beach access", es: "Acceso privado a la playa", icon: "🏖️", category: "services" },
];

export function getAmenityBySlug(slug: string): Amenity | undefined {
  return AMENITIES.find((a) => a.slug === slug);
}

export function getAmenitiesBySlugs(slugs: string[]): Amenity[] {
  return slugs
    .map((slug) => getAmenityBySlug(slug))
    .filter((a): a is Amenity => a !== undefined);
}

export function getAmenitiesByCategory(category: Amenity["category"]): Amenity[] {
  return AMENITIES.filter((a) => a.category === category);
}
