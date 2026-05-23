export function VenueSection() {
  return (
    <section id="venue" className="py-20 px-6 bg-teal">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-5xl text-ivory mt-6">
            Where to Find Us
          </h2>
          <p className="font-body text-ivory/60 text-sm mt-4">
            We look forward to welcoming you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Venue card */}
          <Card icon="📍" title="The Venue">
            <p className="font-body text-ivory/90 text-lg font-semibold">To Be Determined</p>
            <p className="font-body text-ivory/70 text-sm mt-1">Venue details coming soon</p>
            
            
            <div className="mt-5 pt-5 border-t border-gold/20">
              <p className="font-body text-ivory/50 text-xs leading-relaxed">
                Parking and transport details will be shared once venue is confirmed.
              </p>
            </div>
          </Card>

          {/* Dress code card */}
          <Card icon="👗" title="What to Wear">
            <div className="space-y-4 font-body text-sm text-ivory/80">
              <div>
                <p className="font-semibold text-ivory text-sm uppercase tracking-wider">Dress Code</p>
                <p className="mt-1">Smart Casual</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-gold/30 rounded-sm p-7">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-display text-2xl text-ivory">{title}</h3>
      </div>
      {children}
    </div>
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
