/**
 * Image processing pipeline using Sharp.
 *
 * Usage: pnpm images
 *
 * Processes all images in public/img/raw/ and outputs optimised
 * AVIF and WebP versions to public/img/.
 *
 * TODO: Run this script after adding raw property photos.
 */

import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, parse } from "path";

const INPUT_DIR = join(process.cwd(), "public", "img", "raw");
const OUTPUT_DIR = join(process.cwd(), "public", "img");

const SIZES = [
  { suffix: "-320", width: 320 },
  { suffix: "-640", width: 640 },
  { suffix: "-960", width: 960 },
  { suffix: "-1280", width: 1280 },
  { suffix: "-1920", width: 1920 },
];

const AVIF_OPTIONS: sharp.AvifOptions = {
  quality: 80,
  effort: 4,
};

const WEBP_OPTIONS: sharp.WebpOptions = {
  quality: 85,
  effort: 4,
};

async function processImage(inputPath: string, name: string): Promise<void> {
  const base = parse(name).name;
  console.log(`  Processing: ${name}`);

  for (const size of SIZES) {
    const pipeline = sharp(inputPath).resize(size.width, undefined, {
      withoutEnlargement: true,
      fit: "inside",
    });

    // AVIF
    await pipeline
      .clone()
      .avif(AVIF_OPTIONS)
      .toFile(join(OUTPUT_DIR, `${base}${size.suffix}.avif`));

    // WebP
    await pipeline
      .clone()
      .webp(WEBP_OPTIONS)
      .toFile(join(OUTPUT_DIR, `${base}${size.suffix}.webp`));
  }

  // Full-size JPEG fallback
  await sharp(inputPath)
    .jpeg({ quality: 85, progressive: true })
    .toFile(join(OUTPUT_DIR, `${base}.jpg`));
}

async function main() {
  console.log("🖼️  Tranquilo Image Pipeline\n");

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Check if input directory exists
  let files: string[];
  try {
    files = await readdir(INPUT_DIR);
  } catch {
    console.log(`Input directory not found: ${INPUT_DIR}`);
    console.log("Create public/img/raw/ and add your raw property photos there.");
    process.exit(0);
  }

  const imageFiles = files.filter((f) =>
    /\.(jpg|jpeg|png|webp|tiff)$/i.test(f)
  );

  if (imageFiles.length === 0) {
    console.log(`No images found in ${INPUT_DIR}`);
    process.exit(0);
  }

  console.log(`Found ${imageFiles.length} image(s) to process...\n`);

  for (const file of imageFiles) {
    try {
      await processImage(join(INPUT_DIR, file), file);
    } catch (err) {
      console.error(`  Error processing ${file}:`, err);
    }
  }

  console.log("\n✅ Image processing complete!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
