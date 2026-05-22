import { describe, it, expect } from "vitest";
import {
  AMENITIES,
  getAmenityBySlug,
  getAmenitiesBySlugs,
  getAmenitiesByCategory,
} from "@/lib/amenities";

describe("AMENITIES constant", () => {
  it("should contain at least 20 amenities", () => {
    expect(AMENITIES.length).toBeGreaterThanOrEqual(20);
  });

  it("should have unique slugs", () => {
    const slugs = AMENITIES.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("every amenity should have required fields", () => {
    for (const amenity of AMENITIES) {
      expect(amenity.slug).toBeTruthy();
      expect(amenity.en).toBeTruthy();
      expect(amenity.es).toBeTruthy();
      expect(amenity.icon).toBeTruthy();
      expect(amenity.category).toBeTruthy();
    }
  });

  it("should include essential amenities", () => {
    const slugs = new Set(AMENITIES.map((a) => a.slug));
    expect(slugs.has("wifi")).toBe(true);
    expect(slugs.has("air-conditioning")).toBe(true);
    expect(slugs.has("kitchen")).toBe(true);
    expect(slugs.has("pool")).toBe(true);
  });
});

describe("getAmenityBySlug", () => {
  it("should return an amenity by slug", () => {
    const amenity = getAmenityBySlug("wifi");
    expect(amenity).toBeDefined();
    expect(amenity?.slug).toBe("wifi");
    expect(amenity?.en).toBe("Free Wi-Fi");
  });

  it("should return undefined for unknown slug", () => {
    const amenity = getAmenityBySlug("unknown-amenity");
    expect(amenity).toBeUndefined();
  });
});

describe("getAmenitiesBySlugs", () => {
  it("should return amenities for valid slugs", () => {
    const amenities = getAmenitiesBySlugs(["wifi", "pool", "kitchen"]);
    expect(amenities).toHaveLength(3);
    expect(amenities.map((a) => a.slug)).toContain("wifi");
    expect(amenities.map((a) => a.slug)).toContain("pool");
  });

  it("should skip unknown slugs", () => {
    const amenities = getAmenitiesBySlugs(["wifi", "nonexistent", "pool"]);
    expect(amenities).toHaveLength(2);
  });

  it("should return empty array for empty input", () => {
    const amenities = getAmenitiesBySlugs([]);
    expect(amenities).toHaveLength(0);
  });
});

describe("getAmenitiesByCategory", () => {
  it("should filter by category", () => {
    const outdoor = getAmenitiesByCategory("outdoor");
    expect(outdoor.length).toBeGreaterThan(0);
    expect(outdoor.every((a) => a.category === "outdoor")).toBe(true);
  });

  it("pool should be in outdoor category", () => {
    const outdoor = getAmenitiesByCategory("outdoor");
    expect(outdoor.some((a) => a.slug === "pool")).toBe(true);
  });

  it("wifi should be in essential category", () => {
    const essential = getAmenitiesByCategory("essential");
    expect(essential.some((a) => a.slug === "wifi")).toBe(true);
  });
});
