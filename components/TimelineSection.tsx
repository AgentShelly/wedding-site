export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-5xl text-teal mt-6 heading-underline">
            R&amp;A: A Short Story
          </h2>
          <p className="font-body text-muted text-sm mt-6 tracking-wide uppercase">
            Saturday · 12 September 2026
          </p>
        </div>

        {/* Wedding video */}
        <div className="overflow-hidden rounded-sm border border-gold/30 shadow-lg">
          <video
            controls
            preload="metadata"
            poster="https://l5dewgcxwhbhcryx.public.blob.vercel-storage.com/video/wedding-video-poster.jpg"
            className="w-full aspect-video bg-black"
          >
            <source
              src="https://l5dewgcxwhbhcryx.public.blob.vercel-storage.com/video/wedding-video.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px w-14 bg-gold/60" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold shrink-0">
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        <ellipse cx="10" cy="3" rx="2" ry="4" fill="currentColor" opacity="0.6" />
        <ellipse cx="10" cy="17" rx="2" ry="4" fill="currentColor" opacity="0.6" />
        <ellipse cx="3" cy="10" rx="4" ry="2" fill="currentColor" opacity="0.6" />
        <ellipse cx="17" cy="10" rx="4" ry="2" fill="currentColor" opacity="0.6" />
      </svg>
      <div className="h-px w-14 bg-gold/60" />
    </div>
  );
}
