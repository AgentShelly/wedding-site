import type { Metadata } from "next";
import { getAllProperties } from "@/content/properties/index";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import Breadcrumb from "@/components/Breadcrumb";
import type { Property } from "@/content/properties/index";

export const metadata: Metadata = {
  title: "All Stays",
  description:
    "Browse all 19 vacation rentals in Playa del Carmen. Filter by type, bedrooms, guests, price, and amenities.",
  alternates: {
    canonical: "/stays",
    languages: {
      en: "/stays",
      es: "/es/stays",
    },
  },
};

const PAGE_SIZE = 12;

interface StaysPageProps {
  searchParams: Promise<{
    type?: string;
    area?: string;
    bedrooms?: string;
    bathrooms?: string;
    guests?: string;
    minPrice?: string;
    maxPrice?: string;
    amenities?: string;
    page?: string;
  }>;
}

function filterProperties(
  properties: Property[],
  params: Awaited<StaysPageProps["searchParams"]>
): Property[] {
  let filtered = [...properties];

  if (params.type) {
    filtered = filtered.filter(
      (p) => p.type.toLowerCase() === params.type!.toLowerCase()
    );
  }
  if (params.area) {
    filtered = filtered.filter(
      (p) => p.area.toLowerCase().replace(/\s+/g, "-") === params.area!.toLowerCase()
    );
  }
  if (params.bedrooms) {
    const beds = parseInt(params.bedrooms, 10);
    if (!isNaN(beds)) {
      filtered = filtered.filter((p) => p.bedrooms >= beds);
    }
  }
  if (params.bathrooms) {
    const baths = parseInt(params.bathrooms, 10);
    if (!isNaN(baths)) {
      filtered = filtered.filter((p) => p.bathrooms >= baths);
    }
  }
  if (params.guests) {
    const guests = parseInt(params.guests, 10);
    if (!isNaN(guests)) {
      filtered = filtered.filter((p) => p.maxGuests >= guests);
    }
  }
  if (params.minPrice) {
    const min = parseInt(params.minPrice, 10);
    if (!isNaN(min)) {
      filtered = filtered.filter((p) => p.pricePerNight >= min);
    }
  }
  if (params.maxPrice) {
    const max = parseInt(params.maxPrice, 10);
    if (!isNaN(max)) {
      filtered = filtered.filter((p) => p.pricePerNight <= max);
    }
  }
  if (params.amenities) {
    const amenityList = params.amenities.split(",").filter(Boolean);
    filtered = filtered.filter((p) =>
      amenityList.every((a) => p.amenities.includes(a))
    );
  }

  return filtered;
}

export default async function StaysPage({ searchParams }: StaysPageProps) {
  const params = await searchParams;
  const allProperties = await getAllProperties();
  const filteredProperties = filterProperties(allProperties, params);

  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageProperties = filteredProperties.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Stays", href: "/stays" },
  ];

  const buildPageUrl = (page: number) => {
    const sp = new URLSearchParams();
    if (params.type) sp.set("type", params.type);
    if (params.area) sp.set("area", params.area);
    if (params.bedrooms) sp.set("bedrooms", params.bedrooms);
    if (params.bathrooms) sp.set("bathrooms", params.bathrooms);
    if (params.guests) sp.set("guests", params.guests);
    if (params.minPrice) sp.set("minPrice", params.minPrice);
    if (params.maxPrice) sp.set("maxPrice", params.maxPrice);
    if (params.amenities) sp.set("amenities", params.amenities);
    if (page > 1) sp.set("page", String(page));
    const qs = sp.toString();
    return `/stays${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            All Stays
          </h1>
          <p className="text-ink-600 mt-2">
            {filteredProperties.length} propert{filteredProperties.length === 1 ? "y" : "ies"} in Playa del Carmen
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <PropertyFilters currentParams={params} />
          </aside>

          {/* Properties grid */}
          <div className="flex-1">
            {pageProperties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-3xl mb-4">🌴</p>
                <h2 className="font-display text-2xl text-ink-900 font-semibold mb-2">
                  No properties found
                </h2>
                <p className="text-ink-600">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {pageProperties.map((property) => (
                    <PropertyCard key={property.slug} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination"
                    className="flex justify-center items-center gap-2 mt-12"
                  >
                    {safeCurrentPage > 1 && (
                      <a
                        href={buildPageUrl(safeCurrentPage - 1)}
                        className="px-4 py-2 rounded-xl border border-line text-ink-900 hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                        aria-label="Previous page"
                      >
                        ← Previous
                      </a>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <a
                          key={page}
                          href={buildPageUrl(page)}
                          aria-label={`Page ${page}`}
                          aria-current={page === safeCurrentPage ? "page" : undefined}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                            page === safeCurrentPage
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-line text-ink-900 hover:bg-limestone-100"
                          }`}
                        >
                          {page}
                        </a>
                      )
                    )}

                    {safeCurrentPage < totalPages && (
                      <a
                        href={buildPageUrl(safeCurrentPage + 1)}
                        className="px-4 py-2 rounded-xl border border-line text-ink-900 hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                        aria-label="Next page"
                      >
                        Next →
                      </a>
                    )}
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
