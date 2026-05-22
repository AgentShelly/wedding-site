"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { AMENITIES } from "@/lib/amenities";
import { SlidersHorizontal } from "lucide-react";

interface PropertyFiltersProps {
  currentParams: {
    type?: string;
    area?: string;
    bedrooms?: string;
    bathrooms?: string;
    guests?: string;
    minPrice?: string;
    maxPrice?: string;
    amenities?: string;
  };
}

const TYPES = ["Villa", "Loft", "Condo"];
const AREAS = ["Zazil-Ha", "Centro", "Colosio"];
const KEY_AMENITIES = [
  "wifi",
  "pool",
  "air-conditioning",
  "kitchen",
  "parking",
  "garden",
  "sea-view",
  "bbq",
  "washer",
];

export default function PropertyFilters({ currentParams }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset to page 1 when filters change
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const toggleAmenity = useCallback(
    (slug: string) => {
      const current = (currentParams.amenities ?? "").split(",").filter(Boolean);
      const next = current.includes(slug)
        ? current.filter((a) => a !== slug)
        : [...current, slug];
      updateFilter("amenities", next.join(","));
    },
    [currentParams.amenities, updateFilter]
  );

  const clearAll = () => {
    router.push(pathname);
  };

  const hasFilters = Object.values(currentParams).some(Boolean);
  const selectedAmenities = (currentParams.amenities ?? "").split(",").filter(Boolean);

  const keyAmenities = AMENITIES.filter((a) => KEY_AMENITIES.includes(a.slug));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-ink-900">
          <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
          Filters
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-sm text-emerald-500 hover:text-emerald-700 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Type */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Property Type</h3>
        <div className="space-y-2">
          {TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={type.toLowerCase()}
                checked={currentParams.type === type.toLowerCase()}
                onChange={(e) =>
                  updateFilter("type", e.target.checked ? type.toLowerCase() : undefined)
                }
                className="w-4 h-4 text-emerald-500 border-line focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
              <span className="text-sm text-ink-600 group-hover:text-ink-900 transition-colors">
                {type}
              </span>
            </label>
          ))}
          {currentParams.type && (
            <button
              onClick={() => updateFilter("type", undefined)}
              className="text-xs text-emerald-500 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Clear type
            </button>
          )}
        </div>
      </div>

      {/* Area */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Neighbourhood</h3>
        <div className="space-y-2">
          {AREAS.map((area) => {
            const slug = area.toLowerCase().replace(/\s+/g, "-");
            return (
              <label key={area} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="area"
                  value={slug}
                  checked={currentParams.area === slug}
                  onChange={(e) =>
                    updateFilter("area", e.target.checked ? slug : undefined)
                  }
                  className="w-4 h-4 text-emerald-500 border-line focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
                <span className="text-sm text-ink-600 group-hover:text-ink-900 transition-colors">
                  {area}
                </span>
              </label>
            );
          })}
          {currentParams.area && (
            <button
              onClick={() => updateFilter("area", undefined)}
              className="text-xs text-emerald-500 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Clear area
            </button>
          )}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {["1", "2", "3", "4+"].map((val) => {
            const numVal = val === "4+" ? "4" : val;
            const isActive = currentParams.bedrooms === numVal;
            return (
              <button
                key={val}
                onClick={() =>
                  updateFilter("bedrooms", isActive ? undefined : numVal)
                }
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-xl border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-line text-ink-600 hover:border-emerald-500 hover:text-emerald-500"
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>

      {/* Guests */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Guests</h3>
        <div className="flex flex-wrap gap-2">
          {["2", "4", "6", "8+"].map((val) => {
            const numVal = val === "8+" ? "8" : val;
            const isActive = currentParams.guests === numVal;
            return (
              <button
                key={val}
                onClick={() =>
                  updateFilter("guests", isActive ? undefined : numVal)
                }
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-xl border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-line text-ink-600 hover:border-emerald-500 hover:text-emerald-500"
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Price per night</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="filter-min-price" className="text-xs text-ink-600 mb-1 block">
              Min $
            </label>
            <input
              id="filter-min-price"
              type="number"
              min={0}
              max={500}
              value={currentParams.minPrice ?? ""}
              onChange={(e) =>
                updateFilter("minPrice", e.target.value || undefined)
              }
              placeholder="0"
              className="w-full px-3 py-2 rounded-xl border border-line text-ink-900 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="filter-max-price" className="text-xs text-ink-600 mb-1 block">
              Max $
            </label>
            <input
              id="filter-max-price"
              type="number"
              min={0}
              max={500}
              value={currentParams.maxPrice ?? ""}
              onChange={(e) =>
                updateFilter("maxPrice", e.target.value || undefined)
              }
              placeholder="500"
              className="w-full px-3 py-2 rounded-xl border border-line text-ink-900 text-sm focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-sm font-semibold text-ink-900 mb-3">Amenities</h3>
        <div className="space-y-2">
          {keyAmenities.map((amenity) => (
            <label key={amenity.slug} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity.slug)}
                onChange={() => toggleAmenity(amenity.slug)}
                className="w-4 h-4 text-emerald-500 rounded border-line focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
              <span className="text-sm text-ink-600 group-hover:text-ink-900 transition-colors">
                {amenity.icon} {amenity.en}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
