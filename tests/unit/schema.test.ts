import { describe, it, expect } from "vitest";
import {
  buildOrganizationSchema,
  buildLodgingBusinessSchema,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

describe("buildOrganizationSchema", () => {
  it("should return a valid Organization schema", () => {
    const schema = buildOrganizationSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Tranquilo Vacation Rentals");
    expect(schema.url).toBeDefined();
    expect(schema.contactPoint).toBeDefined();
    expect(schema.address).toBeDefined();
  });

  it("should include Mexico address", () => {
    const schema = buildOrganizationSchema();
    expect(schema.address.addressCountry).toBe("MX");
    expect(schema.address.addressLocality).toBe("Playa del Carmen");
  });
});

describe("buildLodgingBusinessSchema", () => {
  it("should return generic schema without property argument", () => {
    const schema = buildLodgingBusinessSchema();
    expect(schema["@type"]).toBe("LodgingBusiness");
    expect(schema.name).toBe("Tranquilo Vacation Rentals");
    expect(schema.aggregateRating).toBeDefined();
  });

  it("should return property-specific schema with property argument", () => {
    const mockProperty = {
      slug: "test-property",
      name: "Test Villa",
      type: "Villa" as const,
      area: "Centro" as const,
      pricePerNight: 100,
      cleaningFee: 50,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      featured: false,
      published: true,
      shortDescription: "A test property",
      description: "A detailed description",
      locationDescription: "In Centro",
      images: ["/img/placeholder.jpg"],
      amenities: ["wifi"],
      houseRules: ["No smoking"],
      rating: 4.9,
      reviewCount: 10,
    };

    const schema = buildLodgingBusinessSchema(mockProperty);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = schema as any;
    expect(s["@type"]).toBe("VacationRental");
    expect(s.name).toBe("Test Villa");
    expect(s.numberOfBedrooms).toBe(2);
    expect(s.occupancy?.maxValue).toBe(4);
    expect(s.aggregateRating?.ratingValue).toBe("4.9");
  });
});

describe("buildBlogPostingSchema", () => {
  it("should return a valid BlogPosting schema", () => {
    const schema = buildBlogPostingSchema({
      title: "Welcome to Playa",
      description: "A guide",
      date: "2024-01-15",
      slug: "welcome-to-playa",
    });

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.headline).toBe("Welcome to Playa");
    expect(schema.datePublished).toBe("2024-01-15");
    expect(schema.author).toBeDefined();
    expect(schema.publisher).toBeDefined();
  });
});

describe("buildBreadcrumbSchema", () => {
  it("should return a valid BreadcrumbList schema", () => {
    const items = [
      { name: "Home", href: "/" },
      { name: "Stays", href: "/stays" },
      { name: "Villa Maya Azul", href: "/stays/villa-maya-azul" },
    ];

    const schema = buildBreadcrumbSchema(items);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].name).toBe("Home");
    expect(schema.itemListElement[2].position).toBe(3);
    expect(schema.itemListElement[2].name).toBe("Villa Maya Azul");
  });

  it("positions should be 1-indexed", () => {
    const items = [{ name: "A", href: "/" }, { name: "B", href: "/b" }];
    const schema = buildBreadcrumbSchema(items);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });
});
