import { HeroSection } from "@/components/HeroSection";
import { RSVPSection } from "@/components/RSVPSection";
import { TimelineSection } from "@/components/TimelineSection";
import { VenueSection } from "@/components/VenueSection";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MusicPlayer />
      <HeroSection />
      <RSVPSection />
      <TimelineSection />
      <VenueSection />

      {/* Footer */}
      <footer className="bg-teal-dark py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-14 bg-gold/35" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gold">
              <circle cx="9" cy="9" r="2.2" fill="currentColor" />
              <ellipse cx="9" cy="2.5" rx="1.8" ry="3.5" fill="currentColor" opacity="0.6" />
              <ellipse cx="9" cy="15.5" rx="1.8" ry="3.5" fill="currentColor" opacity="0.6" />
              <ellipse cx="2.5" cy="9" rx="3.5" ry="1.8" fill="currentColor" opacity="0.6" />
              <ellipse cx="15.5" cy="9" rx="3.5" ry="1.8" fill="currentColor" opacity="0.6" />
            </svg>
            <div className="h-px w-14 bg-gold/35" />
          </div>

          <p className="font-display text-3xl text-ivory tracking-widest">
            Alice &amp; Rudolph
          </p>
          <p className="font-body text-gold/75 text-xs tracking-[0.3em] uppercase mt-2">
            12 · September · 2026
          </p>

          <p className="font-body text-ivory/25 text-[11px] mt-8">
            Music: Bossa by Bensound · bensound.com/royalty-free-music
          </p>
        </div>
      </footer>
    </main>
  );
}
