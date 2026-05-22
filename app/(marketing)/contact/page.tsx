import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryModal from "@/components/InquiryModal";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Tranquilo Vacation Rentals. We're here to help with bookings, questions, and everything in between.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+15005550006";

  return (
    <>
      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            Contact Us
          </h1>
          <p className="text-ink-600 mt-2">
            We&apos;re here to help. Reach out any way that works for you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl text-ink-900 font-semibold mb-8">
              Get in touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink-900 mb-1">WhatsApp</h3>
                  <p className="text-ink-600 text-sm mb-2">
                    Fastest response — usually within 1 hour
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 font-semibold hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  >
                    {whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink-900 mb-1">Email</h3>
                  <p className="text-ink-600 text-sm mb-2">
                    We respond within 24 hours
                  </p>
                  <a
                    href="mailto:hello@tranquilovacationrentals.com"
                    className="text-emerald-500 font-semibold hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  >
                    hello@tranquilovacationrentals.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink-900 mb-1">Location</h3>
                  <p className="text-ink-600 text-sm">
                    Playa del Carmen, Quintana Roo, Mexico
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink-900 mb-1">Hours</h3>
                  <p className="text-ink-600 text-sm">
                    Monday – Sunday: 8am – 9pm CST
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-display text-xl text-ink-900 font-semibold mb-4">
                Send us a message
              </h3>
              <p className="text-ink-600 mb-4">
                Use our inquiry form for detailed questions about properties,
                availability, or custom requests.
              </p>
              <InquiryModal
                trigger={
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                    Open inquiry form
                  </button>
                }
              />
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-2xl text-ink-900 font-semibold mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How do I book a property?",
                  a: "You can book directly through our website using Stripe Checkout, or contact us via WhatsApp or email for assistance.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit and debit cards via Stripe. Payment is secure and encrypted.",
                },
                {
                  q: "What is the cancellation policy?",
                  a: "Cancellation policies vary by property. Please check the property details page or contact us for specifics.",
                },
                {
                  q: "Can I request an early check-in or late check-out?",
                  a: "Yes! Contact us directly and we'll do our best to accommodate your schedule.",
                },
                {
                  q: "Do properties have a minimum stay?",
                  a: "Minimum stays vary by property and season, typically 2-5 nights. Contact us for exact requirements.",
                },
                {
                  q: "Is there a cleaning fee?",
                  a: "Yes, a cleaning fee is included in your booking total, shown clearly before payment.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="border-b border-line pb-6 last:border-0"
                >
                  <h3 className="font-semibold text-ink-900 mb-2">{faq.q}</h3>
                  <p className="text-ink-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
