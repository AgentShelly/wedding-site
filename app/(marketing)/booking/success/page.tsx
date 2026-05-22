import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Confirmed!",
  description: "Your booking at Tranquilo Vacation Rentals has been confirmed.",
  robots: { index: false },
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function BookingSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
        </div>
        <h1 className="font-display text-4xl text-ink-900 font-semibold mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-ink-600 mb-2">
          Thank you for booking with Tranquilo Vacation Rentals. A confirmation
          email has been sent to your inbox.
        </p>
        {session_id && (
          <p className="text-ink-300 text-sm mb-8">
            Reference: {session_id.slice(0, 20)}...
          </p>
        )}
        <p className="text-ink-600 mb-8">
          Our team will reach out within a few hours with check-in details and
          any additional information you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-line text-ink-900 font-semibold hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
