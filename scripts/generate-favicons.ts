/**
 * Favicon generator script.
 *
 * Usage: pnpm favicons
 *
 * Generates favicon.ico, icon.svg, apple-touch-icon.png, and
 * site.webmanifest from a source SVG file.
 *
 * TODO: Replace the placeholder SVG below with your actual logo.
 */

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

const PUBLIC_DIR = join(process.cwd(), "public");

// Placeholder SVG — replace with your actual logo
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#1B5E4B"/>
  <text x="32" y="46" font-family="Georgia, serif" font-size="40" font-weight="700" fill="#C9953A" text-anchor="middle">T</text>
</svg>`;

const WEBMANIFEST = JSON.stringify(
  {
    name: "Tranquilo Vacation Rentals",
    short_name: "Tranquilo",
    description: "Hand-picked vacation rentals in Playa del Carmen, Mexico",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5EF",
    theme_color: "#1B5E4B",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  null,
  2
);

async function main() {
  console.log("🎨 Generating favicons...\n");

  await mkdir(PUBLIC_DIR, { recursive: true });

  const svgBuffer = Buffer.from(LOGO_SVG);

  // apple-touch-icon.png — 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(PUBLIC_DIR, "apple-touch-icon.png"));
  console.log("  ✓ apple-touch-icon.png (180x180)");

  // icon-192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(join(PUBLIC_DIR, "icon-192.png"));
  console.log("  ✓ icon-192.png");

  // icon-512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(join(PUBLIC_DIR, "icon-512.png"));
  console.log("  ✓ icon-512.png");

  // icon.svg
  await writeFile(join(PUBLIC_DIR, "icon.svg"), LOGO_SVG, "utf-8");
  console.log("  ✓ icon.svg");

  // site.webmanifest
  await writeFile(join(PUBLIC_DIR, "site.webmanifest"), WEBMANIFEST, "utf-8");
  console.log("  ✓ site.webmanifest");

  // favicon.ico — 32x32 PNG (browsers handle PNG ico fine)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(join(PUBLIC_DIR, "favicon.ico"));
  console.log("  ✓ favicon.ico (32x32 PNG)");

  console.log("\n✅ Favicons generated!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
