/**
 * Tailwind CSS v4 configuration.
 *
 * In Tailwind v4, the primary configuration is done via CSS (@theme directive in globals.css).
 * This file provides additional configuration for tooling compatibility.
 *
 * The @theme tokens in globals.css define the Cenote Luxe color palette.
 */

// Tailwind v4 uses CSS-first configuration — see app/globals.css for @theme directive.
// This config file exists for plugin/tooling compatibility.

export default {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
};
