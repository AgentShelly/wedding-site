import Link from "next/link";
import type { Metadata } from "next";
import { ChallengeAlbums } from "@/components/ChallengeAlbums";

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
        <h1 className="font-display text-4xl text-ivory mt-3">
          Take Our Photo Challenge
        </h1>
        <p className="font-body text-ivory/70 text-sm mt-4 mb-10 leading-relaxed">
          Seven shots to hunt down. Tap an album, pick your photos — that&apos;s it.
          Full-resolution, straight off your phone.
        </p>

        <ChallengeAlbums />

        <Link
          href="/gallery"
          className="inline-block mt-10 font-body text-sm text-gold hover:text-gold-light underline underline-offset-4"
        >
          View the album →
        </Link>
      </div>
    </main>
  );
}
