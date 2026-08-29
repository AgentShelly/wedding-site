const ALBUM_URL = "https://photos.app.goo.gl/LaN6PFnpSzY8XcPg8";

export function PhotosSection() {
  return (
    <section id="photos" className="py-20 px-6 bg-teal-dark">
      <div className="max-w-2xl mx-auto text-center">
        <SectionDivider />
        <h2 className="font-display text-4xl md:text-5xl text-ivory mt-6">
          Share Your Photos
        </h2>
        <p className="font-body text-ivory/70 text-sm mt-4 leading-relaxed">
          You&apos;ll see moments we won&apos;t. Add every photo and video you
          take on the day to our shared album — and take home everyone
          else&apos;s too.
        </p>

        <div className="mt-10">
          <a
            href={ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light transition-colors text-teal-dark font-body font-semibold text-sm uppercase tracking-[0.2em] px-8 py-4 rounded-sm"
          >
            <span className="text-lg">📷</span>
            Add &amp; View Photos
          </a>
        </div>

        <p className="font-body text-ivory/40 text-xs mt-6">
          Opens our Google Photos album. Anyone with the link can view; sign in
          to Google to add your own.
        </p>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px w-14 bg-gold/40" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold shrink-0">
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        <ellipse cx="10" cy="3" rx="2" ry="4" fill="currentColor" opacity="0.6" />
        <ellipse cx="10" cy="17" rx="2" ry="4" fill="currentColor" opacity="0.6" />
        <ellipse cx="3" cy="10" rx="4" ry="2" fill="currentColor" opacity="0.6" />
        <ellipse cx="17" cy="10" rx="4" ry="2" fill="currentColor" opacity="0.6" />
      </svg>
      <div className="h-px w-14 bg-gold/40" />
    </div>
  );
}
