import { chromium } from "playwright-core";

const exe =
  process.env.HOME +
  "/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

// pass the basename (without extension) as arg, defaults to the teal card
const name = process.argv[2] || "photo-handout";
const dir = "/Users/rudolph/alice-rudolph-wedding";

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage();
await page.goto(`file://${dir}/public/${name}.html`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.pdf({
  path: `${dir}/scratchpad/${name}.pdf`,
  width: "279.4mm",
  height: "215.9mm",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();
console.log(`wrote ${name}.pdf`);
