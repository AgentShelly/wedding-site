import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

const STAYS_LINKS = [
  { href: "/stays", label: "All Stays" },
  { href: "/types/villa", label: "Villas" },
  { href: "/types/loft", label: "Lofts" },
  { href: "/types/condo", label: "Condos" },
  { href: "/areas/zazil-ha", label: "Zazil-Ha" },
  { href: "/areas/centro", label: "Centro" },
  { href: "/areas/colosio", label: "Colosio" },
];

const INFO_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Travel Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+15005550006";

  return (
    <footer className="bg-limestone-900 text-limestone-200" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-display font-semibold text-limestone-50 text-xl mb-4 w-fit hover:text-gold-400 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
            >
              <span className="text-gold-500 text-2xl">◆</span>
              Tranquilo
            </Link>
            <p className="text-limestone-200 text-sm mb-6 leading-relaxed">
              Hand-picked vacation rentals in Playa del Carmen, Mexico.
              Book direct — no fees, no middlemen.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/tranquilovr" // TODO: Replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-lg bg-limestone-900 border border-limestone-200/20 flex items-center justify-center text-limestone-200 hover:text-gold-400 hover:border-gold-400 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/tranquilovr" // TODO: Replace with actual URL
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-lg bg-limestone-900 border border-limestone-200/20 flex items-center justify-center text-limestone-200 hover:text-gold-400 hover:border-gold-400 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Stays */}
          <div>
            <h3 className="font-semibold text-limestone-50 mb-4">Stays</h3>
            <ul className="space-y-2">
              {STAYS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-limestone-200 hover:text-gold-400 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Info & Contact */}
          <div>
            <h3 className="font-semibold text-limestone-50 mb-4">Information</h3>
            <ul className="space-y-2 mb-6">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-limestone-200 hover:text-gold-400 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-limestone-200">
              <p>
                <a
                  href="mailto:hello@tranquilovacationrentals.com"
                  className="hover:text-gold-400 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
                >
                  hello@tranquilovacationrentals.com
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
                >
                  WhatsApp: {whatsappNumber}
                </a>
              </p>
              <p className="text-limestone-200/60">
                Playa del Carmen, Quintana Roo, Mexico
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-limestone-200/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-limestone-200/60">
          <p>
            © {currentYear} Tranquilo Vacation Rentals. All rights reserved.
          </p>
          <p>
            Playa del Carmen, Mexico · Direct booking · No fees
          </p>
        </div>
      </div>
    </footer>
  );
}
