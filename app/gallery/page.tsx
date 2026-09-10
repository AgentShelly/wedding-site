import Link from "next/link";
import type { Metadata } from "next";
import { getAlbumSections } from "@/lib/photo-store";
import { ChallengeAlbums } from "@/components/ChallengeAlbums";
import { MusicPlayer } from "@/components/MusicPlayer";

export const metadata: Metadata = {
  title: "Photo Album — Alice & Rudolph",
  description: "Photos from our wedding, shared by the people who were there.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const sections = await getAlbumSections();

  return (
    <main className="min-h-screen bg-teal-dark px-4 sm:px-6 py-14">
      <MusicPlayer />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-gold/80">
            Alice &amp; Rudolph
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ivory mt-3">
            The Photo Album
          </h1>
          <p className="font-body text-ivory/60 text-sm mt-4">
            Seven challenges, seven albums. Tap <span className="text-ivory/80">Add photos</span> on
            any album, or a photo to view it full size.{" "}
            <Link
              href="/"
              className="text-gold hover:text-gold-light underline underline-offset-4"
            >
              Back home
            </Link>
          </p>
        </div>

        <ChallengeAlbums sections={sections} variant="gallery" />
      </div>
    </main>
  );
}
