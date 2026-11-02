import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-teal-dark px-6 text-center">
      <p className="font-body text-xs uppercase tracking-[0.35em] text-gold/80">Alice &amp; Rudolph</p>
      <h1 className="mt-4 font-display text-5xl text-ivory">The Wedding Album</h1>
      <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ivory/70">
        Seven albums of photos from the people who were there.
      </p>
      <Link href="/gallery" className="mt-8 rounded-sm bg-gold px-6 py-3 font-body text-sm font-semibold uppercase tracking-widest text-teal-dark">
        Browse the album
      </Link>
    </main>
  );
}
