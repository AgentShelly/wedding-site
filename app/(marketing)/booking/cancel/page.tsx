import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Cancelled",
  description: "Your booking was cancelled. Browse our stays and try again.",
  robots: { index: false },
};

export default function BookingCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-limestone-100 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-ink-300" />
          </div>
        </div>
        <h1 className="font-display text-4xl text-ink-900 font-semibold mb-4">
          Booking Cancelled
        </h1>
        <p className="text-ink-600 mb-8">
          No worries — your booking was cancelled and you have not been charged.
          Head back to browse our properties and find your perfect stay.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/stays"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Browse Stays
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-line text-ink-900 font-semibold hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}
