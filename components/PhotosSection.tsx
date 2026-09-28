import Link from "next/link";
import { getGalleryPhotos } from "@/lib/photo-store";

export async function PhotosSection() {
  const photos = await getGalleryPhotos();
  const preview = photos.slice(0, 12);

  return (
    <section id="photos" className="bg-teal-dark px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <div
          className="relative overflow-hidden px-6 py-14 text-center sm:px-12"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -10%, #12798c 0%, #0a5f6e 34%, #063540 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(196,154,60,0.30) 1px, transparent 1px), linear-gradient(-45deg, rgba(196,154,60,0.30) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              backgroundPosition: "center",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 30%, #000 0%, rgba(0,0,0,0.12) 60%, transparent 80%)",
              maskImage:
                "radial-gradient(circle at 50% 30%, #000 0%, rgba(0,0,0,0.12) 60%, transparent 80%)",
            }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-4 border border-gold/40">
            <div className="absolute inset-[6px] border border-gold/15" />
          </div>

          <div className="relative">
            <p className="font-display text-sm uppercase tracking-[0.42em] text-gold-light">
              A &nbsp;&amp;&nbsp; R
            </p>
            <div className="mx-auto my-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span className="h-1 w-1 rotate-45 bg-gold" />
              <span className="h-px w-10 bg-gold/50" />
            </div>

            <h2 className="font-display text-4xl text-ivory md:text-5xl">
              The Photo Gallery
            </h2>
            <p className="mx-auto mt-4 mb-10 max-w-md font-body text-sm leading-relaxed text-ivory/70">
              Photos from the people who were there, straight off their phones.
            </p>

            {preview.length === 0 ? (
              <p className="font-body text-ivory/60 text-sm">
                No photos yet. Be the first to add some.
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {preview.map((p) => (
                  <Link
                    key={p.pathname}
                    href="/gallery"
                    className="block aspect-square overflow-hidden bg-teal rounded-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.thumbUrl}
                      alt={`Photo by ${p.uploader}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/gallery"
              className="mt-10 inline-block font-body text-sm text-gold underline underline-offset-4 transition-colors hover:text-gold-light"
            >
              View the full album →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
