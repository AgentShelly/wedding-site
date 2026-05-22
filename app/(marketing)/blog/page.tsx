import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Travel Blog",
  description:
    "Tips, guides, and inspiration for your Playa del Carmen vacation. Discover the best restaurants, beaches, cenotes, and local secrets.",
  alternates: { canonical: "/blog" },
};

// TODO: Auto-generate this list from MDX files
const posts = [
  {
    slug: "welcome-to-playa-del-carmen",
    title: "Welcome to Playa del Carmen",
    excerpt:
      "Everything you need to know before your first visit to the jewel of the Riviera Maya. From the best beaches to hidden cenotes.",
    date: "2024-01-15",
    category: "Getting Started",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
            ]}
          />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            Travel Blog
          </h1>
          <p className="text-ink-600 mt-2">
            Tips, guides, and inspiration for your Playa del Carmen vacation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden border border-line hover:shadow-md transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <div className="relative aspect-video">
                <Image
                  src="/img/placeholder.jpg"
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-500 text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-ink-300 text-xs">{post.readTime}</span>
                </div>
                <h2 className="font-display text-xl text-ink-900 font-semibold mb-2 group-hover:text-emerald-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-ink-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-ink-300 text-xs mt-4">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
