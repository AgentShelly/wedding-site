import Link from "next/link";

export const metadata = {
  title: "See You There! — Alice & Rudolph",
};

export default function RSVPYesPage() {
  return (
    <main className="min-h-screen bg-ivory peranakan-grid flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center">
          <div className="bg-white border-2 border-gold/50 rounded-sm p-10 shadow-lg">
            <img src="/wedding-thankyou.jpg" alt="Alice and Rudolph" className="w-full rounded-sm mb-6" />
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
            <img src="/wedding-thankyou.jpg" alt="Alice and Rudolph" className="w-full rounded-sm mb-6" />
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
    </main>
  );
}
