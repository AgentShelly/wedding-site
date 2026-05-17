/**
 * i18n configuration for next-intl.
 *
 * Supported locales: en (default), es
 * Default locale: en (served at root, no prefix)
 * Spanish: /es/...
 */

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the display name of a locale.
 */
export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: "English",
    es: "Español",
  };
  return names[locale];
}

/**
 * Build a localised path from a base path.
 * English stays at root, Spanish gets /es prefix.
 */
export function buildLocalePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path}`;
}

/**
 * Strip locale prefix from a path.
 */
export function stripLocalePath(path: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (path.startsWith(`/${locale}/`)) {
      return path.slice(`/${locale}`.length);
    }
    if (path === `/${locale}`) {
      return "/";
    }
  }
  return path;
}
