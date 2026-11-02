import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Take Our Photo Challenge — Alice & Rudolph",
  description: "Tap an album, pick your photos, done.",
};

export default function PhotosPage() {
  return (
    <main className="min-h-screen bg-teal-dark flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <p className="font-body text-xs tracking-[0.35em] uppercase text-gold/80">
          Alice &amp; Rudolph
        </p>
        <h1 className="font-display text-4xl text-ivory mt-3">The Photo Album</h1>
        <p className="font-body text-ivory/70 text-sm mt-4 mb-10 leading-relaxed">
          Browse the wedding photos and open any original to download it.
        </p>
        <Link href="/gallery" className="inline-block font-body text-sm text-gold underline underline-offset-4">
          View the album →
        </Link>
      </div>
    </main>
  );
}
