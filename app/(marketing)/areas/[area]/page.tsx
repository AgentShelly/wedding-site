import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProperties } from "@/content/properties/index";
import PropertyCard from "@/components/PropertyCard";
import Breadcrumb from "@/components/Breadcrumb";

const AREA_INFO: Record<
  string,
  { name: string; description: string; longDescription: string }
> = {
  "zazil-ha": {
    name: "Zazil-Ha",
    description: "Beachside tranquility steps from Mamitas Beach",
    longDescription:
      "Zazil-Ha is Playa del Carmen's premier beachside neighbourhood. Wake up to the sound of waves, stroll to Mamitas Beach Club, and enjoy sunsets from your terrace. This upscale area blends Caribbean charm with modern comfort.",
  },
  centro: {
    name: "Centro",
    description: "Heart of Playa, walkable to La Quinta Avenida",
    longDescription:
      "Centro puts you at the heart of everything Playa del Carmen has to offer. Walk to the iconic La Quinta Avenida for restaurants, boutiques, and nightlife. Everything is within reach in this vibrant neighbourhood.",
  },
  colosio: {
    name: "Colosio",
    description: "Residential calm with lush gardens",
    longDescription:
      "Colosio is a peaceful residential neighbourhood perfect for families and those seeking a quieter stay. Lush tropical gardens, friendly neighbours, and easy access to local markets make this area a hidden gem.",
  },
};

interface AreaPageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return Object.keys(AREA_INFO).map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { area } = await params;
  const info = AREA_INFO[area];
  if (!info) return {};
  return {
    title: `${info.name} Vacation Rentals`,
    description: `Browse vacation rentals in ${info.name}, Playa del Carmen. ${info.description}.`,
    alternates: { canonical: `/areas/${area}` },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area } = await params;
  const info = AREA_INFO[area];
  if (!info) notFound();

  const allProperties = await getAllProperties();
  const areaProperties = allProperties.filter(
    (p) => p.area.toLowerCase().replace(/\s+/g, "-") === area.toLowerCase()
  );

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Stays", href: "/stays" },
    { name: info.name, href: `/areas/${area}` },
  ];

  return (
    <>
      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            {info.name} Vacation Rentals
          </h1>
          <p className="text-ink-600 mt-2 max-w-2xl">{info.longDescription}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-ink-600 mb-8">
          {areaProperties.length} propert{areaProperties.length === 1 ? "y" : "ies"} in {info.name}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {areaProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </div>
    </>
  );
}
