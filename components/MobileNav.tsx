"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import InquiryModal from "./InquiryModal";

interface NavLink {
  href: string;
  label: string;
}

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="p-2 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/20 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`fixed top-16 right-0 bottom-0 z-50 w-72 bg-limestone-50 border-l border-line flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-1 p-4">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
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
        </div>

        <div className="p-4 mt-auto border-t border-line">
          <InquiryModal
            trigger={
              <button className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                Send an Inquiry
              </button>
            }
          />
        </div>
      </nav>
    </div>
  );
}
