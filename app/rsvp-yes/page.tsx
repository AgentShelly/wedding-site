import Link from "next/link";

export const metadata = {
  title: "See You There! — Alice & Rudolph",
};

export default function RSVPYesPage() {
  return (
    <main className="min-h-screen bg-ivory peranakan-grid flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="bg-white border-2 border-gold/50 rounded-sm overflow-hidden shadow-lg">
          <div className="p-6 pb-0">
            <img src="/wedding-thankyou.jpg" alt="Alice and Rudolph" className="w-full rounded-sm" />
          </div>
          <div className="p-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-gold text-lg">✦</span>
              <div className="h-px w-10 bg-gold/60" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-teal mb-4 italic">
              We can&apos;t wait to see you!
            </h1>
            <div className="space-y-4 font-body text-muted text-sm leading-relaxed mb-8">
              <p>Your RSVP has been received and we are absolutely thrilled that you will be joining us to celebrate our special day.</p>
              <p>We are counting down the days and cannot wait to share this joyful occasion with you. Expect great food, wonderful company, and memories that will last a lifetime.</p>
              <p className="text-teal font-display text-lg italic">&ldquo;The more the merrier — especially when it&apos;s you!&rdquo;</p>
            </div>
            <div className="bg-ivory border border-gold/30 rounded-sm px-5 py-4 mb-8">
              <p className="font-body text-muted text-xs mb-1">With so much love,</p>
              <p className="font-display text-2xl text-teal">Alice &amp; Rudolph</p>
              <p className="font-body text-gold text-xs tracking-widest mt-1 uppercase">12 · September · 2026</p>
            </div>

            {/* Add to Calendar */}
            <div className="mb-8">
              <p className="font-body text-muted text-xs uppercase tracking-wider mb-3">Add to your calendar</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Alice+%26+Rudolph%27s+Wedding+Lunch&dates=20260912T120000%2B0800%2F20260912T150000%2B0800&location=Singapore&details=We+are+so+glad+you+can+make+it!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gold/40 rounded-sm font-body text-xs text-teal hover:bg-gold/10 transition-colors"
                >
                  📅 Google Calendar
                </a>
                
                  href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20260912T120000%0ADTEND:20260912T150000%0ASUMMARY:Alice%20%26%20Rudolph%27s%20Wedding%20Lunch%0ALOCATION:Singapore%0ADESCRIPTION:We%20are%20so%20glad%20you%20can%20make%20it!%0AEND:VEVENT%0AEND:VCALENDAR"
                  download="alice-rudolph-wedding.ics"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gold/40 rounded-sm font-body text-xs text-teal hover:bg-gold/10 transition-colors"
                >
                  🍎 Apple Calendar
                </a>
                
                  href="https://outlook.live.com/calendar/0/deeplink/compose?subject=Alice+%26+Rudolph%27s+Wedding+Lunch&startdt=2026-09-12T12:00:00%2B08:00&enddt=2026-09-12T15:00:00%2B08:00&location=Singapore&body=We+are+so+glad+you+can+make+it!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gold/40 rounded-sm font-body text-xs text-teal hover:bg-gold/10 transition-colors"
                >
                  📆 Outlook
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-gold/40" />
              <span className="text-gold/60 text-sm">♥</span>
              <div className="h-px w-10 bg-gold/40" />
            </div>
            <Link href="/" className="inline-block font-body text-sm text-teal hover:text-teal-dark underline underline-offset-4 transition-colors">
              ← Back to the invitation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
