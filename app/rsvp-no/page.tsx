import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "We'll Miss You — Alice & Rudolph",
};

export default function RSVPNoPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="relative w-full h-[40vh] overflow-hidden">
        <img src="/wedding-thankyou.jpg" alt="Alice and Rudolph" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-5xl md:text-7xl text-white font-light tracking-widest">Thank You</p>
          <p className="font-body text-sm text-yellow-200 tracking-[0.3em] uppercase mt-3">Alice &amp; Rudolph</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="bg-white border border-gold/40 rounded-sm p-10 shadow-md">
          {/* Top ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-gold/70 text-lg">✦</span>
            <div className="h-px w-10 bg-gold/50" />
          </div>

          {/* Emoji */}
          <div className="text-5xl mb-4">🥹</div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl text-teal mb-4 italic">
            Oh, we&apos;ll miss you terribly!
          </h1>

          {/* Humorous but warm body */}
          <div className="space-y-4 font-body text-muted text-sm leading-relaxed mb-8 text-left">
            <p>
              Your response has been received, and while our hearts are just a
              little heavy, we completely understand. Life has a funny way of
              filling calendars at the most inopportune moments.
            </p>
            <p>
              Whether it&apos;s a pet grooming appointment, your{" "}
              <em>own</em> grooming appointment, a cell group that simply
              cannot be missed, or — the absolute classic —{" "}
              <strong>all of the above</strong>&hellip; we salute your
              commitment to personal hygiene and spiritual growth.
            </p>
            <p>
              We&apos;ll save you a piece of wedding cake. Wrapped. Labelled.
              Possibly eaten before we remember. But the intention will be
              there.
            </p>
            <p className="text-teal font-display text-lg italic text-center">
              &ldquo;True friends celebrate together — even from afar.&rdquo;
            </p>
            <p>
              We hope to catch up with you soon to share the joy. And who
              knows — there may be a wedding anniversary dinner that finally
              fits your schedule. 😉
            </p>
          </div>

          {/* Warm sign-off */}
          <div className="bg-cream border border-gold/30 rounded-sm px-5 py-4 mb-8">
            <p className="font-body text-muted text-xs mb-1">With love &amp; understanding,</p>
            <p className="font-display text-2xl text-teal">Alice &amp; Rudolph</p>
            <p className="font-body text-gold text-xs tracking-widest mt-1 uppercase">
              12 · September · 2026
            </p>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold/40" />
            <span className="text-gold/60 text-sm">♥</span>
            <div className="h-px w-10 bg-gold/40" />
          </div>

          <Link
            href="/"
            className="inline-block font-body text-sm text-teal hover:text-teal-dark underline underline-offset-4 transition-colors"
          >
            ← Back to the invitation
          </Link>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {["bg-teal", "bg-coral", "bg-gold", "bg-jade"].map((c) => (
            <div key={c} className={`w-1.5 h-1.5 rounded-full ${c} opacity-30`} />
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}
