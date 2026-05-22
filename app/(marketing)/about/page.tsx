import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryModal from "@/components/InquiryModal";
import { buildOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Tranquilo Vacation Rentals — a local team passionate about sharing the best of Playa del Carmen with travelers from around the world.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Authentic local knowledge",
    description:
      "We live and breathe Playa del Carmen. Every recommendation, every property, every tip comes from real local experience.",
  },
  {
    title: "Curated quality",
    description:
      "We personally inspect and approve every property. If we wouldn't stay there ourselves, it doesn't make our collection.",
  },
  {
    title: "Direct relationships",
    description:
      "When you book with us, you deal with real people — not algorithms. We're here for every question, big or small.",
  },
  {
    title: "Transparent pricing",
    description:
      "No hidden fees, no OTA markups. You see the price, you pay the price. It's that simple.",
  },
];

export default function AboutPage() {
  const orgSchema = buildOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            About Tranquilo
          </h1>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Our Story
            </p>
            <h2 className="font-display text-4xl text-ink-900 font-semibold mb-6">
              Born from a love of Playa del Carmen
            </h2>
            <div className="text-ink-600 space-y-4">
              {/* TODO: Replace with real founder story */}
              <p>
                Tranquilo Vacation Rentals was founded by a small team of
                Playa del Carmen locals who wanted to share the magic of this
                place with travelers from around the world — without the
                impersonal experience of big OTA platforms.
              </p>
              <p>
                We believe that where you stay shapes your entire trip. That&apos;s
                why we hand-pick every property, personally verify its quality,
                and build real relationships with our property owners.
              </p>
              <p>
                When you book with us, you&apos;re not just getting a place to
                sleep — you&apos;re getting a team of local experts ready to help
                you experience the very best of Playa del Carmen.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="/img/placeholder.jpg"
              alt="The Tranquilo team in Playa del Carmen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-limestone-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-500 font-semibold text-sm uppercase tracking-widest mb-2">
              What we stand for
            </p>
            <h2 className="font-display text-4xl text-ink-900 font-semibold">
              Our values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white p-8 border border-line"
              >
                <h3 className="font-display text-xl text-ink-900 font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-ink-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "19", label: "Properties" },
              { number: "3", label: "Neighbourhoods" },
              { number: "4.9★", label: "Average rating" },
              { number: "100%", label: "Direct booking" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-emerald-500 font-semibold">
                  {stat.number}
                </p>
                <p className="text-ink-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl text-limestone-50 font-semibold mb-4">
            Ready to experience Tranquilo?
          </h2>
          <p className="text-limestone-200 mb-8">
            Browse our collection or reach out — we&apos;d love to help you plan
            your perfect Playa del Carmen escape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stays"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"
            >
              Browse stays
            </Link>
            <InquiryModal
              trigger={
                <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-limestone-50 text-limestone-50 font-semibold hover:bg-limestone-50 hover:text-ink-900 transition-colors focus-visible:ring-2 focus-visible:ring-limestone-50 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700">
                  Get in touch
                </button>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
