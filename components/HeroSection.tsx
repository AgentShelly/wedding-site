import { CountdownClock } from "./CountdownClock";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background: swap /hero-photo.jpg with your own photo ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Fallback gradient shown when no photo present */}


      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-dark/55 via-teal/35 to-teal-dark/65" />

      {/* Peranakan double-frame border */}
      <div className="absolute inset-4 md:inset-8 border border-gold/35 pointer-events-none" />
      <div className="absolute inset-[22px] md:inset-[42px] border border-gold/15 pointer-events-none" />

      {/* Corner ornaments */}
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map(
        (pos) => (
          <CornerOrnament key={pos} pos={pos} />
        )
      )}

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto w-full">
        {/* Top divider with floral */}
        <Divider />

        {/* Names */}
        <div className="mt-8 mb-6">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[96px] text-ivory font-light tracking-widest leading-tight">
            Alice
          </h1>
          <p className="font-display text-3xl md:text-4xl text-gold italic tracking-wider my-1">
            &amp;
          </p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[96px] text-ivory font-light tracking-widest leading-tight">
            Rudolph
          </h1>
        </div>

        {/* Date line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[80px] bg-gold/50" />
          <p className="font-body text-sm sm:text-base text-gold tracking-[0.3em] uppercase">
            12 · September · 2026
          </p>
          <div className="h-px flex-1 max-w-[80px] bg-gold/50" />
        </div>

        {/* Countdown */}
        <div className="bg-teal-dark/40 backdrop-blur-sm border border-gold/20 rounded-sm px-6 py-8 inline-block w-full max-w-lg">
          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-ivory/55 mb-5">
            Counting down to the celebration
          </p>
          <CountdownClock />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6 text-gold/60"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px w-12 sm:w-20 bg-gold/50" />
      <FlowerSvg />
      <div className="h-px w-12 sm:w-20 bg-gold/50" />
    </div>
  );
}

function FlowerSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-gold shrink-0">
      <circle cx="14" cy="14" r="3.5" fill="currentColor" />
      <ellipse cx="14" cy="5" rx="3" ry="5.5" fill="currentColor" opacity="0.65" />
      <ellipse cx="14" cy="23" rx="3" ry="5.5" fill="currentColor" opacity="0.65" />
      <ellipse cx="5" cy="14" rx="5.5" ry="3" fill="currentColor" opacity="0.65" />
      <ellipse cx="23" cy="14" rx="5.5" ry="3" fill="currentColor" opacity="0.65" />
      <ellipse cx="8.1" cy="8.1" rx="2.8" ry="5" fill="currentColor" opacity="0.45" transform="rotate(45 8.1 8.1)" />
      <ellipse cx="19.9" cy="8.1" rx="2.8" ry="5" fill="currentColor" opacity="0.45" transform="rotate(-45 19.9 8.1)" />
      <ellipse cx="8.1" cy="19.9" rx="2.8" ry="5" fill="currentColor" opacity="0.45" transform="rotate(-45 8.1 19.9)" />
      <ellipse cx="19.9" cy="19.9" rx="2.8" ry="5" fill="currentColor" opacity="0.45" transform="rotate(45 19.9 19.9)" />
    </svg>
  );
}

function CornerOrnament({ pos }: { pos: string }) {
  return (
    <div className={`absolute ${pos} w-8 h-8 pointer-events-none`}>
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-gold opacity-50">
        <path d="M2 2 L14 2 L2 14 Z" fill="currentColor" opacity="0.5" />
        <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
