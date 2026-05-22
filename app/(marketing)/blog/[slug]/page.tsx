import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { buildBlogPostingSchema } from "@/lib/schema";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// TODO: Dynamically import MDX files
const POSTS: Record<
  string,
  {
    title: string;
    date: string;
    description: string;
    category: string;
    readTime: string;
  }
> = {
  "welcome-to-playa-del-carmen": {
    title: "Welcome to Playa del Carmen",
    date: "2024-01-15",
    description:
      "Everything you need to know before your first visit to the jewel of the Riviera Maya.",
    category: "Getting Started",
    readTime: "8 min read",
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const blogSchema = buildBlogPostingSchema({
    title: post.title,
    description: post.description,
    date: post.date,
    slug,
  });

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-500 text-xs font-semibold">
              {post.category}
            </span>
            <span className="text-ink-300 text-xs">{post.readTime}</span>
            <span className="text-ink-300 text-xs">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-display text-5xl text-ink-900 font-semibold mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-ink-600">{post.description}</p>
        </header>

        {/* Hero image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12">
          <Image
            src="/img/placeholder.jpg"
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* Content — loaded from MDX */}
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-h2:text-ink-900 prose-p:text-ink-600 prose-a:text-emerald-500 prose-a:no-underline hover:prose-a:underline">
          {/* TODO: Dynamically import and render MDX content for this slug */}
          <p>
            Welcome to Playa del Carmen! This vibrant coastal city on
            Mexico&apos;s Riviera Maya is one of the Caribbean&apos;s most
            beloved destinations — and for good reason.
          </p>
          <h2>Getting there</h2>
          <p>
            Playa del Carmen is located about 45 minutes south of Cancun
            International Airport. The easiest way to get there is by shuttle
            or taxi. The journey takes you along the beautiful Riviera Maya
            coastal highway, with glimpses of turquoise water along the way.
          </p>
          <h2>What to do</h2>
          <p>
            La Quinta Avenida (5th Avenue) is the heart of Playa del Carmen.
            This pedestrian boulevard stretches for kilometers along the coast,
            lined with restaurants, boutiques, bars, and entertainment.
          </p>
          <h2>The beaches</h2>
          <p>
            Playa del Carmen&apos;s beaches are among the Caribbean&apos;s finest.
            The water is a stunning shade of turquoise, the sand is soft and
            white, and the beach clubs offer every amenity you could want.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-emerald-50 border border-emerald-500/20 p-8 text-center">
          <h2 className="font-display text-2xl text-ink-900 font-semibold mb-2">
            Ready to visit Playa del Carmen?
          </h2>
          <p className="text-ink-600 mb-6">
            Browse our hand-picked selection of villas, lofts, and condos.
          </p>
          <Link
            href="/stays"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Browse stays →
          </Link>
        </div>
      </article>
    </>
  );
}
