import Link from "next/link";

export function PhotosSection() {
  return (
    <section id="photos" className="bg-teal-dark px-6 py-20">
      <div className="mx-auto max-w-2xl">
        {/* Framed card — echoes the printed guest handout */}
        <div
          className="relative overflow-hidden px-8 py-14 text-center sm:px-14"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -10%, #12798c 0%, #0a5f6e 34%, #063540 100%)",
          }}
        >
          {/* Peranakan lattice, quiet */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(196,154,60,0.30) 1px, transparent 1px), linear-gradient(-45deg, rgba(196,154,60,0.30) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              backgroundPosition: "center",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 38%, #000 0%, rgba(0,0,0,0.12) 60%, transparent 80%)",
              maskImage:
                "radial-gradient(circle at 50% 38%, #000 0%, rgba(0,0,0,0.12) 60%, transparent 80%)",
            }}
          />
          {/* Double gold frame */}
          <div aria-hidden className="pointer-events-none absolute inset-4 border border-gold/40">
            <div className="absolute inset-[6px] border border-gold/15" />
          </div>

          <div className="relative">
            <p className="font-display text-sm uppercase tracking-[0.42em] text-gold-light">
              A &nbsp;&amp;&nbsp; R
            </p>

            <div className="mx-auto my-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span className="h-1 w-1 rotate-45 bg-gold" />
              <span className="h-px w-10 bg-gold/50" />
            </div>

            <h2 className="font-display text-4xl text-ivory md:text-5xl">
              Share Your Photos
            </h2>
            <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-ivory/70">
              You&apos;ll see moments we won&apos;t. Add the photos you take on the
              day to our album —{" "}
              <span className="font-display text-base italic text-ivory">
                full-resolution, straight off your phone
              </span>{" "}
              — and take home everyone else&apos;s too.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/photos"
                className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-teal-dark transition-colors hover:bg-gold-light"
              >
                <span className="text-lg">📷</span>
                Add Your Photos
              </Link>
              <Link
                href="/gallery"
                className="font-body text-sm text-gold underline underline-offset-4 transition-colors hover:text-gold-light"
              >
                View the album →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
