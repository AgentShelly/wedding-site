import { chromium } from "playwright-core";

const exe =
  process.env.HOME +
  "/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage();
await page.goto("file:///Users/rudolph/alice-rudolph-wedding/public/photo-handout.html", {
  waitUntil: "networkidle",
});
// let webfonts settle
await page.waitForTimeout(1200);
await page.pdf({
  path: "/Users/rudolph/alice-rudolph-wedding/scratchpad/photo-handout.pdf",
  width: "279.4mm",
  height: "215.9mm",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();
console.log("wrote photo-handout.pdf");
