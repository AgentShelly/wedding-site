import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProperties } from "@/content/properties/index";
import PropertyCard from "@/components/PropertyCard";
import Breadcrumb from "@/components/Breadcrumb";

const AREA_INFO: Record<
  string,
  { name: string; collection: string; description: string; longDescription: string }
> = {
  "zazil-ha": {
    name: "Zazil-Ha",
    collection: "Mayalun",
    description: "Beachside retreats steps from Mamitas Beach Club",
    longDescription:
      "Mayalun in Zazil-Ha sits in Playa del Carmen's most sought-after beachside neighbourhood. Wake up to the sound of the Caribbean, stroll to Mamitas Beach Club in minutes, and watch the sun set over the sea from your terrace. This is the closest you can get to the water while still being steps from the restaurants and nightlife of La Quinta Avenida.",
  },
  centro: {
    name: "Centro",
    collection: "Uva De Mar",
    description: "Stylish lofts a short walk from La Quinta Avenida",
    longDescription:
      "Uva De Mar in Centro puts you at the beating heart of Playa del Carmen. The iconic La Quinta Avenida — lined with restaurants, boutiques, street art, and open-air bars — is right on your doorstep. The beach is a 5-minute walk. These lofts are ideal for travellers who want to be in the middle of everything, with a stylish home base to return to.",
  },
  colosio: {
    name: "Colosio",
    collection: "Casitas",
    description: "Tropical casitas in a lush, peaceful neighbourhood",
    longDescription:
      "The Casitas in Colosio offer a different side of Playa del Carmen — one of leafy streets, neighbours chatting over garden walls, and a pace of life that's genuinely relaxing. Colosio is a residential neighbourhood beloved by locals, with excellent local restaurants, markets, and parks. The beach and La Quinta are a short ride away, but you may find you don't want to leave.",
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
          <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mt-4 mb-1">
            {info.name}
          </p>
          <h1 className="font-display text-4xl text-ink-900 font-semibold">
            {info.collection}
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
