import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Tranquilo Vacation Rentals.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Terms of Service", href: "/terms" },
            ]}
          />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            Terms of Service
          </h1>
          <p className="text-ink-300 mt-2">Last updated: January 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-h2:text-ink-900 prose-p:text-ink-600">
          {/* TODO: Replace with actual terms of service */}
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Tranquilo Vacation Rentals website and
            services, you accept and agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use our
            services.
          </p>

          <h2>2. Booking and Payment</h2>
          <p>
            All bookings are subject to availability and confirmation.
            Payments are processed securely through Stripe. The total cost
            includes the nightly rate and a cleaning fee, clearly displayed
            before checkout.
          </p>

          <h2>3. Cancellation Policy</h2>
          <p>
            Cancellation policies vary by property. The applicable policy for
            each property is displayed on the property detail page and
            confirmed at booking. Please review this carefully before booking.
          </p>

          <h2>4. Property Rules</h2>
          <p>
            Guests must comply with all property-specific house rules provided
            at booking. Violation of house rules may result in immediate
            eviction without refund.
          </p>

          <h2>5. Liability</h2>
          <p>
            Tranquilo Vacation Rentals acts as an intermediary between guests
            and property owners. We are not liable for losses, damages, or
            injuries occurring during your stay beyond our reasonable control.
          </p>

          <h2>6. Privacy</h2>
          <p>
            Your use of our services is also governed by our{" "}
            <a href="/privacy">Privacy Policy</a>, which is incorporated
            into these terms by reference.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href="mailto:hello@tranquilovacationrentals.com">
              hello@tranquilovacationrentals.com
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
