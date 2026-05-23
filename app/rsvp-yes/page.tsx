import Link from "next/link";

export const metadata = {
  title: "See You There! — Alice & Rudolph",
};

export default function RSVPYesPage() {
  return (
    <main className="min-h-screen bg-ivory peranakan-grid flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center">
        {/* Peranakan-framed card */}
        <div className="bg-white border-2 border-gold/50 rounded-sm p-10 shadow-lg peranakan-frame">
          {/* Top ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold/60" />
            <PeranakanFlower />
            <div className="h-px w-10 bg-gold/60" />
          </div>

          {/* Emoji */}
          <div className="text-5xl mb-4">🎊</div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl text-teal mb-4 italic">
            We cannot wait to see you!
          </h1>

          {/* Body */}
          <div className="space-y-4 font-body text-muted text-sm leading-relaxed mb-8">
            <p>
              Your RSVP has been received, and our hearts are full knowing you
              will be part of our celebration.
            </p>
            <p className="text-teal font-semibold text-base not-italic font-display italic">
              &ldquo;Two hearts, one love, one unforgettable day.&rdquo;
            </p>
            <p>
              A confirmation has been sent to your email. Keep an eye out — we
              will follow up with venue details and any updates closer to the
              date.
            </p>
          </div>

          {/* Date reminder */}
          <div className="bg-cream border border-gold/40 rounded-sm px-5 py-4 mb-8">
            <p className="font-body text-xs uppercase tracking-widest text-muted mb-1">
              Save the date
            </p>
            <p className="font-display text-2xl text-teal">
              Saturday, 12 September 2026
            </p>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold/40" />
            <span className="text-gold text-xs tracking-widest uppercase">
              Alice &amp; Rudolph
            </span>
            <div className="h-px w-10 bg-gold/40" />
          </div>

          <Link
            href="/"
            className="inline-block font-body text-sm text-teal hover:text-teal-dark underline underline-offset-4 transition-colors"
          >
            ← Back to the invitation
          </Link>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-6">
          {["bg-teal", "bg-coral", "bg-gold", "bg-jade"].map((c) => (
            <div key={c} className={`w-1.5 h-1.5 rounded-full ${c} opacity-40`} />
          ))}
        </div>
      </div>
    </main>
  );
}

function PeranakanFlower() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-coral shrink-0">
      <circle cx="16" cy="16" r="4" fill="currentColor" />
      <ellipse cx="16" cy="5.5" rx="3.5" ry="6" fill="currentColor" opacity="0.6" />
      <ellipse cx="16" cy="26.5" rx="3.5" ry="6" fill="currentColor" opacity="0.6" />
      <ellipse cx="5.5" cy="16" rx="6" ry="3.5" fill="currentColor" opacity="0.6" />
      <ellipse cx="26.5" cy="16" rx="6" ry="3.5" fill="currentColor" opacity="0.6" />
      <ellipse cx="9" cy="9" rx="3" ry="5.5" fill="currentColor" opacity="0.4" transform="rotate(45 9 9)" />
      <ellipse cx="23" cy="9" rx="3" ry="5.5" fill="currentColor" opacity="0.4" transform="rotate(-45 23 9)" />
      <ellipse cx="9" cy="23" rx="3" ry="5.5" fill="currentColor" opacity="0.4" transform="rotate(-45 9 23)" />
      <ellipse cx="23" cy="23" rx="3" ry="5.5" fill="currentColor" opacity="0.4" transform="rotate(45 23 23)" />
      <circle cx="16" cy="16" r="1.8" fill="#C49A3C" />
    </svg>
  );
}
