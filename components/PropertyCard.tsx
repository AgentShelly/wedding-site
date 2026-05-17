import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Users, Star } from "lucide-react";
import type { Property } from "@/content/properties/index";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-line bg-white hover:shadow-lg transition-shadow">
      {/* Image */}
      <Link
        href={`/stays/${property.slug}`}
        className="block relative aspect-[4/3] overflow-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-t-2xl"
        tabIndex={0}
        aria-label={`View ${property.name}`}
      >
        <Image
          src={property.images[0] ?? "/img/placeholder.jpg"}
          alt={property.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-ink-900">
            {property.type}
          </span>
          {property.featured && (
            <span className="px-2 py-1 rounded-full bg-gold-500 text-white text-xs font-semibold">
              Featured
            </span>
          )}
        </div>
        {/* Price chip */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold shadow-sm">
            ${property.pricePerNight}/night
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <Link
              href={`/stays/${property.slug}`}
              className="block font-display text-lg text-ink-900 font-semibold leading-tight hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded truncate"
            >
              {property.name}
            </Link>
            <p className="text-ink-600 text-sm mt-0.5">{property.area}, Playa del Carmen</p>
          </div>
          {property.rating && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
              <span className="text-sm font-semibold text-ink-900">
                {property.rating}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-ink-600 text-xs mt-3 pt-3 border-t border-line">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {property.maxGuests} guests
          </span>
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5" />
            {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" />
            {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
