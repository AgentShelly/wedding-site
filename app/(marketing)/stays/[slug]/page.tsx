import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyBySlug, getAllProperties } from "@/content/properties/index";
import PropertyGallery from "@/components/PropertyGallery";
import BookingWidget from "@/components/BookingWidget";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryModal from "@/components/InquiryModal";
import { AMENITIES } from "@/lib/amenities";
import { buildLodgingBusinessSchema } from "@/lib/schema";
import { BedDouble, Bath, Users, MapPin, Star } from "lucide-react";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: property.name,
    description: property.shortDescription,
    alternates: {
      canonical: `/stays/${slug}`,
    },
    openGraph: {
      title: `${property.name} | Tranquilo Vacation Rentals`,
      description: property.shortDescription,
      images: property.images.slice(0, 1).map((img) => ({ url: img })),
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Stays", href: "/stays" },
    { name: property.name, href: `/stays/${slug}` },
  ];

  const propertySchema = buildLodgingBusinessSchema(property);

  const propertyAmenities = AMENITIES.filter((a) =>
    property.amenities.includes(a.slug)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Gallery */}
      <PropertyGallery images={property.images} name={property.name} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 text-sm font-semibold">
                  {property.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-limestone-100 text-ink-600 text-sm">
                  {property.area}
                </span>
                {property.featured && (
                  <span className="px-3 py-1 rounded-full bg-gold-400 text-white text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl text-ink-900 font-semibold mb-4">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-ink-600">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  {property.area}, Playa del Carmen
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  Up to {property.maxGuests} guests
                </span>
                <span className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-emerald-500" />
                  {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-emerald-500" />
                  {property.bathrooms} bathroom{property.bathrooms !== 1 ? "s" : ""}
                </span>
                {property.rating && (
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                    {property.rating} ({property.reviewCount} reviews)
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <section className="mb-10">
              <h2 className="font-display text-2xl text-ink-900 font-semibold mb-4">
                About this property
              </h2>
              <div className="text-ink-600 space-y-4 leading-relaxed">
                <p>{property.description}</p>
                {/* TODO: Replace with full MDX description */}
              </div>
            </section>

            {/* Amenities */}
            <section className="mb-10">
              <h2 className="font-display text-2xl text-ink-900 font-semibold mb-6">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {propertyAmenities.map((amenity) => (
                  <div
                    key={amenity.slug}
                    className="flex items-center gap-3 text-ink-700"
                  >
                    <span className="text-xl">{amenity.icon}</span>
                    <span className="text-sm">{amenity.en}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* House rules */}
            <section className="mb-10">
              <h2 className="font-display text-2xl text-ink-900 font-semibold mb-4">
                House rules
              </h2>
              <ul className="space-y-2 text-ink-600">
                {property.houseRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </section>

            {/* Location */}
            <section className="mb-10">
              <h2 className="font-display text-2xl text-ink-900 font-semibold mb-4">
                Location
              </h2>
              <p className="text-ink-600 mb-4">
                {property.locationDescription}
              </p>
              {/* TODO: Embed map */}
              <div className="rounded-2xl bg-limestone-100 border border-line h-64 flex items-center justify-center">
                <span className="text-ink-300 text-sm">
                  Map — {property.area}, Playa del Carmen
                </span>
              </div>
            </section>

            {/* OTA links */}
            <section className="mb-10">
              <h2 className="font-display text-2xl text-ink-900 font-semibold mb-4">
                Also available on
              </h2>
              <div className="flex flex-wrap gap-3">
                {property.airbnbUrl && (
                  <a
                    href={property.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-line text-ink-600 text-sm font-semibold hover:border-ink-600 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    View on Airbnb ↗
                  </a>
                )}
                {property.vrboUrl && (
                  <a
                    href={property.vrboUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-line text-ink-600 text-sm font-semibold hover:border-ink-600 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    View on VRBO ↗
                  </a>
                )}
              </div>
            </section>

            {/* Inquire */}
            <section className="rounded-2xl bg-emerald-50 border border-emerald-500/20 p-8">
              <h2 className="font-display text-2xl text-ink-900 font-semibold mb-2">
                Have questions?
              </h2>
              <p className="text-ink-600 mb-6">
                We&apos;re happy to answer any questions about this property
                before you book.
              </p>
              <InquiryModal
                propertySlug={property.slug}
                propertyName={property.name}
                trigger={
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                    Send an inquiry
                  </button>
                }
              />
            </section>
          </div>

          {/* Booking widget */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="sticky top-6">
              <BookingWidget property={property} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
