const events = [
  {
    time: "3:00 PM",
    title: "Guest Arrival",
    desc: "Welcome drinks and seating — please arrive promptly",
  },
  {
    time: "4:00 PM",
    title: "Solemnisation",
    desc: "Exchange of vows, rings, and a lifetime of promises",
  },
  {
    time: "5:00 PM",
    title: "Cocktail Hour",
    desc: "Champagne, canapés, and warm conversation",
  },
  {
    time: "7:00 PM",
    title: "Dinner Banquet",
    desc: "Eight-course feast to celebrate the newlyweds",
  },
  {
    time: "10:00 PM",
    title: "Last Dance & Send-Off",
    desc: "Dancing, desserts, and a joyful farewell",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-5xl text-teal mt-6 heading-underline">
            The Day Unfolds
          </h2>
          <p className="font-body text-muted text-sm mt-6 tracking-wide uppercase">
            Saturday · 12 September 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-16 sm:pl-0">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gold/35" />

          <div className="space-y-10">
            {events.map((ev, i) => (
              <div
                key={i}
                className="relative flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8"
              >
                {/* Time — left col on desktop */}
                <div className="sm:w-[45%] sm:text-right sm:pt-0.5">
                  <span className="font-body text-xs font-semibold uppercase tracking-widest text-gold">
                    {ev.time}
                  </span>
                </div>

                {/* Dot */}
                <div className="absolute left-[7px] sm:left-1/2 sm:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-gold ring-2 ring-cream shadow-sm" />

                {/* Content */}
                <div className="sm:w-[45%] sm:pl-0 pl-12">
                  <h3 className="font-display text-xl text-teal">{ev.title}</h3>
                  <p className="font-body text-muted text-sm mt-0.5 leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
