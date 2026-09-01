import Link from "next/link";

export function PhotosSection() {
  return (
    <section id="photos" className="py-20 px-6 bg-teal-dark">
      <div className="max-w-2xl mx-auto text-center">
        <SectionDivider />
        <h2 className="font-display text-4xl md:text-5xl text-ivory mt-6">
          Share Your Photos
        </h2>
        <p className="font-body text-ivory/70 text-sm mt-4 leading-relaxed">
          You&apos;ll see moments we won&apos;t. Add the photos you take on the
          day to our album — full-resolution, straight off your phone — and see
          everyone else&apos;s too.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/photos"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light transition-colors text-teal-dark font-body font-semibold text-sm uppercase tracking-[0.2em] px-8 py-4 rounded-sm"
          >
            <span className="text-lg">📷</span>
            Add Your Photos
          </Link>
          <Link
            href="/gallery"
            className="font-body text-sm text-gold hover:text-gold-light underline underline-offset-4"
          >
            View the album →
          </Link>
        </div>
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
