import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <p className="text-6xl font-display font-semibold text-emerald-500 mb-4">404</p>
          <h1 className="text-3xl font-display font-semibold text-ink-900 mb-4">
            Page not found
          </h1>
          <p className="text-ink-600 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back to finding your perfect stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Back to Home
            </Link>
            <Link
              href="/stays"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-line text-ink-900 font-semibold hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Browse Stays
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
