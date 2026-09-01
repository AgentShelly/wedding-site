import Link from "next/link";
import type { Metadata } from "next";
import { UploadClient } from "./UploadClient";

export const metadata: Metadata = {
  title: "Share Your Photos — Alice & Rudolph",
  description: "Upload the photos you took at our wedding.",
};

export default function PhotosPage() {
  return (
    <main className="min-h-screen bg-teal-dark flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <p className="font-body text-xs tracking-[0.35em] uppercase text-gold/80">
          Alice &amp; Rudolph
        </p>
        <h1 className="font-display text-4xl text-ivory mt-3">Share Your Photos</h1>
        <p className="font-body text-ivory/70 text-sm mt-4 leading-relaxed">
          You saw moments we couldn&apos;t. Add every photo you took on the day —
          the originals, straight off your phone.
        </p>

        <div className="mt-10 bg-ivory rounded-sm p-7">
          <UploadClient />
        </div>

        <Link
          href="/gallery"
          className="inline-block mt-8 font-body text-sm text-gold hover:text-gold-light underline underline-offset-4"
        >
          View the album →
        </Link>
      </div>
    </main>
  );
}
