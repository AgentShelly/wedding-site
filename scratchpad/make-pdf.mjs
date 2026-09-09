import { chromium } from "playwright-core";

const exe = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// usage: node make-pdf.mjs <basename> [size]
//   size: "letter-landscape" (default) | "a4"
const name = process.argv[2] || "photo-handout";
const size = process.argv[3] || "letter-landscape";
const dir = "/Users/rudolph/alice-rudolph-wedding";

const dims =
  size === "a4"
    ? { width: "210mm", height: "297mm" }
    : { width: "279.4mm", height: "215.9mm" };

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage();
await page.goto(`file://${dir}/public/${name}.html`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.pdf({
  path: `${dir}/scratchpad/${name}.pdf`,
  ...dims,
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();
console.log(`wrote ${name}.pdf (${size})`);
