import Link from "next/link";
import { headers } from "next/headers";
import MobileNav from "./MobileNav";
import LangSwitch from "./LangSwitch";
import InquiryModal from "./InquiryModal";

const NAV_LINKS = [
  { href: "/stays", label: "Stays" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";

  return (
    <header className="sticky top-0 z-40 bg-limestone-50/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-semibold text-emerald-500 text-xl hover:text-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
          aria-label="Tranquilo Vacation Rentals — Home"
        >
          <span aria-hidden="true" className="text-gold-500 text-2xl">◆</span>
          Tranquilo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? "text-emerald-500 bg-emerald-50"
                    : "text-ink-600 hover:text-ink-900 hover:bg-limestone-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <LangSwitch />

          <InquiryModal
            trigger={
              <button className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                Inquire
              </button>
            }
          />

          {/* Mobile hamburger */}
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
