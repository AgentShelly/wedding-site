import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProperties, getPropertyCountByArea, COLLECTIONS } from "@/content/properties/index";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InquiryModal from "@/components/InquiryModal";
import { testimonials } from "@/content/testimonials/index";
import { buildOrganizationSchema, buildLodgingBusinessSchema } from "@/lib/schema";
import { MapPin, Star, Shield, Calendar, Heart, Waves } from "lucide-react";

export const metadata: Metadata = {
  title: "Tranquilo Vacation Rentals — Playa del Carmen, Mexico",
  description:
    "Discover hand-picked vacation rentals in Playa del Carmen, Mexico. Villas, lofts, and condos with direct booking and no booking fees.",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "es": "/es",
    },
  },
};

// Areas are defined from COLLECTIONS so the neighbourhood names and
// descriptions stay in sync with the property data file.
const AREA_CARDS = [
  {
    collection: COLLECTIONS.UVADEMAR,
    label: "Uva De Mar",
    neighbourhood: "Centro",
    description: "Stylish lofts in the heart of Playa — walk to La Quinta Avenida and the beach",
  },
  {
    collection: COLLECTIONS.MAYALUN,
    label: "Mayalun",
    neighbourhood: "Zazil-Ha",
    description: "Beachside retreats steps from Mamitas Beach Club and the Caribbean Sea",
  },
  {
    collection: COLLECTIONS.CASITAS,
    label: "Casitas",
    neighbourhood: "Colosio",
    description: "Tropical casitas in a lush residential neighbourhood — peaceful and private",
  },
];

const types = [
  { name: "Villas", slug: "villa", icon: "🏡", description: "Private pools, tropical gardens" },
  { name: "Lofts", slug: "loft", icon: "🏙️", description: "Stylish urban spaces" },
  { name: "Condos", slug: "condo", icon: "🌊", description: "Ocean-view living" },
];

const whyUs = [
  {
    icon: Shield,
    title: "No booking fees",
    description: "Pay only the nightly rate + cleaning fee. Zero OTA markups.",
  },
  {
    icon: Calendar,
    title: "Flexible dates",
    description: "Direct communication for custom stays and last-minute requests.",
  },
  {
    icon: Heart,
    title: "Hand-picked properties",
    description: "Every property personally vetted for quality and comfort.",
  },
  {
    icon: Star,
    title: "5-star service",
    description: "Concierge support from inquiry through checkout.",
  },
  {
    icon: MapPin,
    title: "Prime locations",
    description: "All properties within 15 minutes of La Quinta Avenida.",
  },
  {
    icon: Waves,
    title: "Caribbean vibes",
    description: "Wake up to turquoise water, cenotes, and fresh sea air.",
  },
];

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const countByArea = getPropertyCountByArea();
  const orgSchema = buildOrganizationSchema();
  const lodgingSchema = buildLodgingBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
      />

      {/* A — Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-emerald-700">
        <div className="absolute inset-0">
          <Image
            src="/img/placeholder.jpg"
            alt="Playa del Carmen turquoise water and white sand beach"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold-400 font-semibold tracking-widest uppercase text-sm mb-4">
            Playa del Carmen, Mexico
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-limestone-50 font-semibold leading-tight mb-6">
            Your tranquil escape{" "}
            <em className="text-gold-400 not-italic">awaits</em>
          </h1>
          <p className="text-limestone-100 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Hand-picked villas, lofts, and condos in Playa del Carmen.
            Book direct — no fees, no middlemen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stays"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gold-500 text-white font-semibold text-lg hover:bg-gold-600 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"
            >
              Browse all stays
            </Link>
            <InquiryModal
              trigger={
                <button className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-limestone-50 text-limestone-50 font-semibold text-lg hover:bg-limestone-50 hover:text-ink-900 transition-colors focus-visible:ring-2 focus-visible:ring-limestone-50 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700">
                  Ask a question
                </button>
              }
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-limestone-50 to-transparent" />
      </section>

      {/* B — Trust bar */}
      <section className="bg-limestone-50 py-8 border-b border-line">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-ink-600 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
              4.9 average rating
            </span>
            <span className="hidden sm:block text-line">|</span>
            <span>19 properties</span>
            <span className="hidden sm:block text-line">|</span>
            <span>3 neighbourhoods</span>
            <span className="hidden sm:block text-line">|</span>
            <span>Direct booking · No fees</span>
            <span className="hidden sm:block text-line">|</span>
            <span>WhatsApp support</span>
          </div>
        </div>
      </section>

      {/* C — Featured Properties */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Featured Stays
            </p>
            <h2 className="font-display text-4xl text-ink-900 font-semibold">
              Our most loved properties
            </h2>
          </div>
          <Link
            href="/stays"
            className="hidden sm:inline-flex items-center gap-2 text-emerald-500 font-semibold hover:text-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
          >
            View all 19 properties →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/stays"
            className="inline-flex items-center gap-2 text-emerald-500 font-semibold hover:text-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
          >
            View all 19 properties →
          </Link>
        </div>
      </section>

      {/* D — Areas */}
      <section className="bg-limestone-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Neighbourhoods
            </p>
            <h2 className="font-display text-4xl text-ink-900 font-semibold">
              Find your perfect area
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AREA_CARDS.map((area) => {
              const count = countByArea[area.collection.slug] ?? 0;
              return (
                <Link
                  key={area.collection.slug}
                  href={`/areas/${area.collection.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-emerald-700 aspect-[4/3] hover:shadow-xl transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  <Image
                    src="/img/placeholder.jpg"
                    alt={`${area.label} — ${area.neighbourhood}`}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">
                      {area.neighbourhood}
                    </p>
                    <h3 className="font-display text-2xl text-white font-semibold mb-1">
                      {area.label}
                    </h3>
                    <p className="text-limestone-100 text-sm mb-2">
                      {area.description}
                    </p>
                    {count > 0 && (
                      <p className="text-gold-400 text-sm font-semibold">
                        {count} {count === 1 ? "property" : "properties"}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* E — Types */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Property Types
            </p>
            <h2 className="font-display text-4xl text-ink-900 font-semibold">
              Choose your style
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {types.map((type) => (
              <Link
                key={type.slug}
                href={`/types/${type.slug}`}
                className="group rounded-2xl border border-line p-8 hover:border-emerald-500 hover:shadow-md transition-all text-center focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="font-display text-2xl text-ink-900 font-semibold mb-2">
                  {type.name}
                </h3>
                <p className="text-ink-600 text-sm">{type.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* F — Why us */}
      <section className="bg-emerald-700 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-widest mb-2">
              Why Book Direct
            </p>
            <h2 className="font-display text-4xl text-limestone-50 font-semibold">
              The Tranquilo difference
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-limestone-50" />
                </div>
                <div>
                  <h3 className="text-limestone-50 font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-limestone-200 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G — Testimonials */}
      <section className="py-20 px-4 bg-limestone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Guest Reviews
            </p>
            <h2 className="font-display text-4xl text-ink-900 font-semibold">
              What our guests say
            </h2>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* H — About snippet */}
      <section className="py-20 px-4 bg-limestone-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="/img/placeholder.jpg"
              alt="Playa del Carmen beach at sunset"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Our Story
            </p>
            <h2 className="font-display text-4xl text-ink-900 font-semibold mb-6">
              Born from a love of Playa del Carmen
            </h2>
            <p className="text-ink-600 mb-4">
              {/* TODO: Replace with real founder story */}
              Tranquilo Vacation Rentals was founded by locals who fell in love
              with the magic of Playa del Carmen — the turquoise Caribbean
              waters, the vibrant culture of La Quinta Avenida, and the
              laid-back tranquility that defines life here.
            </p>
            <p className="text-ink-600 mb-8">
              We hand-pick every property to ensure it meets our standards for
              comfort, design, and location. When you book with us, you book
              direct — saving you money and giving you a personal connection
              to your hosts.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* I — Blog snippet */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
                Travel Guide
              </p>
              <h2 className="font-display text-4xl text-ink-900 font-semibold">
                Explore Playa del Carmen
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex text-emerald-500 font-semibold hover:text-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              All articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/blog/welcome-to-playa-del-carmen"
              className="group rounded-2xl overflow-hidden border border-line hover:shadow-md transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <div className="relative aspect-video">
                <Image
                  src="/img/placeholder.jpg"
                  alt="Welcome to Playa del Carmen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-2">
                  Getting Started
                </p>
                <h3 className="font-display text-xl text-ink-900 font-semibold mb-2 group-hover:text-emerald-500 transition-colors">
                  Welcome to Playa del Carmen
                </h3>
                <p className="text-ink-600 text-sm line-clamp-3">
                  Everything you need to know before your first visit to the
                  jewel of the Riviera Maya.
                </p>
              </div>
            </Link>
            {/* TODO: Add more blog post cards as content grows */}
          </div>
        </div>
      </section>

      {/* J — CTA Banner */}
      <section className="bg-gold-500 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl text-white font-semibold mb-4">
            Ready to find your tranquil escape?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Browse our full collection of hand-picked properties and book
            directly with no fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stays"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-gold-600 font-semibold text-lg hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gold-500"
            >
              Browse all stays
            </Link>
            <InquiryModal
              trigger={
                <button className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-gold-600 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gold-500">
                  Get in touch
                </button>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
