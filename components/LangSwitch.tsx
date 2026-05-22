"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { stripLocalePath, buildLocalePath } from "@/lib/i18n";

const LANGS = [
  { code: "en" as const, label: "English", flag: "🇺🇸" },
  { code: "es" as const, label: "Español", flag: "🇲🇽" },
];

export default function LangSwitch() {
  const pathname = usePathname();

  // Determine current locale
  const currentLocale = pathname.startsWith("/es") ? "es" : "en";

  // Get the base path without locale
  const basePath = stripLocalePath(pathname);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label={`Language: ${currentLocale === "en" ? "English" : "Español"}`}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 text-sm"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:block font-medium uppercase">
            {currentLocale}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[140px] rounded-xl bg-white border border-line shadow-lg py-1 animate-fade-in"
          align="end"
          sideOffset={8}
        >
          {LANGS.map((lang) => (
            <DropdownMenu.Item key={lang.code} asChild>
              <Link
                href={buildLocalePath(basePath, lang.code)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer outline-none transition-colors ${
                  currentLocale === lang.code
                    ? "text-emerald-500 bg-emerald-50 font-semibold"
                    : "text-ink-600 hover:bg-limestone-100 hover:text-ink-900"
                }`}
                aria-current={currentLocale === lang.code ? "true" : undefined}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
