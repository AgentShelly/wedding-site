import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProperties } from "@/content/properties/index";
import PropertyCard from "@/components/PropertyCard";
import Breadcrumb from "@/components/Breadcrumb";

const TYPE_INFO: Record<
  string,
  { name: string; description: string; longDescription: string }
> = {
  villa: {
    name: "Villas",
    description: "Private tropical villas with gardens",
    longDescription:
      "Our villas offer the ultimate in private, spacious living. Many feature private pools, tropical gardens, and outdoor entertaining areas. Perfect for families or groups seeking total privacy and comfort.",
  },
  loft: {
    name: "Lofts",
    description: "Stylish urban lofts in the heart of Playa",
    longDescription:
      "Our lofts combine modern design with the bohemian spirit of Playa del Carmen. Open-plan spaces with high ceilings, artistic interiors, and prime locations put you in the middle of the action.",
  },
  condo: {
    name: "Condos",
    description: "Ocean-view condos with resort amenities",
    longDescription:
      "Our condos offer the best of both worlds — private living with shared resort amenities like pools and gyms. Many enjoy spectacular views of the Caribbean Sea.",
  },
};

interface TypePageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return Object.keys(TYPE_INFO).map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const { type } = await params;
  const info = TYPE_INFO[type];
  if (!info) return {};
  return {
    title: `${info.name} in Playa del Carmen`,
    description: `Browse ${info.name.toLowerCase()} for rent in Playa del Carmen, Mexico. ${info.description}.`,
    alternates: { canonical: `/types/${type}` },
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { type } = await params;
  const info = TYPE_INFO[type];
  if (!info) notFound();

  const allProperties = await getAllProperties();
  const typeProperties = allProperties.filter(
    (p) => p.type.toLowerCase() === type.toLowerCase()
  );

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Stays", href: "/stays" },
    { name: info.name, href: `/types/${type}` },
  ];

  return (
    <>
      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            {info.name} in Playa del Carmen
          </h1>
          <p className="text-ink-600 mt-2 max-w-2xl">{info.longDescription}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-ink-600 mb-8">
          {typeProperties.length} {info.name.toLowerCase()} available
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {typeProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </div>
    </>
  );
}
