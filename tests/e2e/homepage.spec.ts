import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Tranquilo Vacation Rentals/i);
  });

  test("has a skip to main content link", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeAttached();
  });

  test("displays the hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("h1").first();
    await expect(hero).toBeVisible();
    await expect(hero).toContainText("tranquil escape");
  });

  test("displays featured properties", async ({ page }) => {
    await page.goto("/");
    // Should have property cards
    const cards = page.locator("article");
    await expect(cards.first()).toBeVisible();
  });

  test("has working navigation links", async ({ page }) => {
    await page.goto("/");
    const staysLink = page.locator('nav a[href="/stays"]').first();
    await expect(staysLink).toBeVisible();
    await staysLink.click();
    await expect(page).toHaveURL(/\/stays/);
  });

  test("has accessible header", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("has footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Tranquilo");
  });

  test("WhatsApp button is present", async ({ page }) => {
    await page.goto("/");
    const whatsapp = page.locator('a[href*="wa.me"]');
    await expect(whatsapp).toBeAttached();
  });

  test("has Open Graph meta tags", async ({ page }) => {
    await page.goto("/");
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);
  });

  test("testimonials section is visible", async ({ page }) => {
    await page.goto("/");
    const testimonials = page.locator('[aria-label="Guest testimonials"]');
    await expect(testimonials).toBeVisible();
  });
});
