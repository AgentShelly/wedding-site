import { NextResponse } from "next/server";
import { getAllProperties } from "@/content/properties/index";

export const revalidate = 3600; // 1 hour

/**
 * GET /api/properties
 *
 * Returns all published properties as JSON.
 * This endpoint is designed for AI crawlers and programmatic access.
 * See /llms.txt for documentation.
 */
export async function GET() {
  const properties = await getAllProperties();

  const simplified = properties.map((p) => ({
    slug: p.slug,
    name: p.name,
    type: p.type,
    area: p.area,
    pricePerNight: p.pricePerNight,
    currency: "USD",
    maxGuests: p.maxGuests,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    featured: p.featured,
    amenities: p.amenities,
    rating: p.rating ?? null,
    reviewCount: p.reviewCount ?? null,
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tranquilovacationrentals.com"}/stays/${p.slug}`,
  }));

  return NextResponse.json(
    {
      count: simplified.length,
      location: "Playa del Carmen, Quintana Roo, Mexico",
      currency: "USD",
      properties: simplified,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
