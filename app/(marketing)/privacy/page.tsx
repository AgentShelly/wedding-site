import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Tranquilo Vacation Rentals collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-limestone-100 border-b border-line py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Privacy Policy", href: "/privacy" },
            ]}
          />
          <h1 className="font-display text-4xl text-ink-900 font-semibold mt-4">
            Privacy Policy
          </h1>
          <p className="text-ink-300 mt-2">Last updated: January 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-h2:text-ink-900 prose-p:text-ink-600">
          {/* TODO: Replace with actual privacy policy */}
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when
            you make a booking or send an inquiry. This includes your name,
            email address, phone number, and payment information.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to process bookings, send confirmation
            emails, provide customer support, and improve our services.
            We do not sell your personal data to third parties.
          </p>

          <h2>3. Data Storage and Security</h2>
          <p>
            Your data is stored securely. Payment information is processed
            by Stripe and never stored on our servers. We use
            industry-standard encryption for all data transmission.
          </p>

          <h2>4. Cookies</h2>
          <p>
            We use essential cookies to operate the website and analytics
            cookies (via Vercel Analytics) to understand how visitors use
            our site. Vercel Analytics is privacy-friendly and does not
            use personal cookies.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            We use Stripe for payment processing, Resend for email delivery,
            and Vercel Analytics for anonymous usage statistics. Each has its
            own privacy policy governing their use of data.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            data. Contact us at{" "}
            <a href="mailto:hello@tranquilovacationrentals.com">
              hello@tranquilovacationrentals.com
            </a>{" "}
            to exercise these rights.
          </p>

          <h2>7. Contact</h2>
          <p>
            For privacy-related questions, contact us at{" "}
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
