export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  propertySlug?: string;
  propertyName?: string;
  date: string;
  avatarInitials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    location: "New York, USA",
    rating: 5,
    text: "Absolutely magical stay! The Penthouse Luna Mar exceeded every expectation. Waking up to panoramic Caribbean views every morning was a dream. The booking process was seamless and the team was incredibly responsive. We'll definitely be back!",
    propertySlug: "penthouse-luna-mar",
    propertyName: "Penthouse Luna Mar",
    date: "2024-01-08",
    avatarInitials: "SM",
  },
  {
    id: "t2",
    name: "James & Olivia T.",
    location: "London, UK",
    rating: 5,
    text: "Villa Maya Azul was the perfect family holiday base. The kids loved the pool, we loved the beautiful design and the amazing location. Tranquilo were so helpful throughout — they recommended the best local restaurants and even arranged a cenote tour for us.",
    propertySlug: "villa-maya-azul",
    propertyName: "Villa Maya Azul",
    date: "2023-12-22",
    avatarInitials: "JT",
  },
  {
    id: "t3",
    name: "Carlos & Ana R.",
    location: "Mexico City, Mexico",
    rating: 5,
    text: "Pasamos una semana increíble en el Villa Cenote Paraíso. La piscina estilo cenote es espectacular, nunca habíamos visto nada igual en una propiedad privada. El equipo de Tranquilo fue amabilísimo y siempre disponible. Regresaremos con toda la familia.",
    propertySlug: "villa-cenote-paraiso",
    propertyName: "Villa Cenote Paraíso",
    date: "2023-12-15",
    avatarInitials: "CR",
  },
  {
    id: "t4",
    name: "Emma L.",
    location: "Toronto, Canada",
    rating: 5,
    text: "My partner and I stayed at the Romantic Phuket Villa for our anniversary and it was absolutely perfect. The Thai-inspired decor is stunning, the location in Zazil-Ha is ideal, and the team at Tranquilo made everything effortless. Highly recommend for couples!",
    propertySlug: "romantic-phuket-villa",
    propertyName: "Romantic Phuket Villa",
    date: "2023-11-28",
    avatarInitials: "EL",
  },
  {
    id: "t5",
    name: "Michael B.",
    location: "Chicago, USA",
    rating: 5,
    text: "We've used big booking platforms before and the difference with Tranquilo is night and day. Direct communication, no hidden fees, and genuinely personal service. The Uvademar Two Lofts was spacious, beautifully designed, and perfectly located. 10/10.",
    propertySlug: "uvademar-1415-two-lofts",
    propertyName: "Uvademar 1415 Two Lofts",
    date: "2023-11-10",
    avatarInitials: "MB",
  },
  {
    id: "t6",
    name: "Sophie & Pierre G.",
    location: "Paris, France",
    rating: 5,
    text: "Le Romantic Paris Villa était parfait pour notre lune de miel. Les détails d'inspiration française dans un cadre tropical — c'est tout à fait charmant! Le service de l'équipe Tranquilo était impeccable. Nous recommandons vivement!",
    propertySlug: "romantic-paris-villa",
    propertyName: "Romantic Paris Villa",
    date: "2023-10-30",
    avatarInitials: "SG",
  },
  {
    id: "t7",
    name: "David & Lisa K.",
    location: "Sydney, Australia",
    rating: 5,
    text: "Came to Playa del Carmen for two weeks and stayed at two Tranquilo properties. Both were immaculate, well-equipped, and in great locations. The team really knows their city and gave us tips that made the trip unforgettable. Can't recommend enough!",
    date: "2023-10-15",
    avatarInitials: "DK",
  },
  {
    id: "t8",
    name: "Isabella F.",
    location: "Milan, Italy",
    rating: 5,
    text: "The Romantic Santorini Villa transported me straight to the Greek islands — but with Caribbean weather! The blue and white decor is absolutely beautiful, the garden is peaceful, and being in Centro means everything is walkable. Perfect solo retreat.",
    propertySlug: "romantic-santorini-villa",
    propertyName: "Romantic Santorini Villa",
    date: "2023-09-20",
    avatarInitials: "IF",
  },
];

export default testimonials;
