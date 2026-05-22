import { test, expect } from "@playwright/test";

test.describe("Stays listing page", () => {
  test("loads all stays", async ({ page }) => {
    await page.goto("/stays");
    await expect(page).toHaveTitle(/All Stays/i);
  });

  test("shows breadcrumb navigation", async ({ page }) => {
    await page.goto("/stays");
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText("Stays");
  });

  test("displays property count", async ({ page }) => {
    await page.goto("/stays");
    const count = page.locator("text=/propert/i").first();
    await expect(count).toBeVisible();
  });

  test("displays property cards", async ({ page }) => {
    await page.goto("/stays");
    const cards = page.locator("article");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("each property card links to detail page", async ({ page }) => {
    await page.goto("/stays");
    const firstCard = page.locator("article").first();
    const link = firstCard.locator('a[href*="/stays/"]').first();
    await expect(link).toBeAttached();
  });

  test("filters sidebar is visible", async ({ page }) => {
    await page.goto("/stays");
    const filters = page.locator("aside");
    await expect(filters).toBeVisible();
  });

  test("can filter by type", async ({ page }) => {
    await page.goto("/stays");
    await page.goto("/stays?type=villa");
    const heading = page.locator("h1");
    await expect(heading).toContainText("All Stays");
  });

  test("shows no results message when filters yield nothing", async ({
    page,
  }) => {
    // Set impossible filters
    await page.goto("/stays?type=villa&area=zazil-ha&bedrooms=10");
    const noResults = page.locator("text=/No properties found/i");
    await expect(noResults).toBeVisible();
  });
});

test.describe("Property detail page", () => {
  test("loads a property detail page", async ({ page }) => {
    await page.goto("/stays/villa-maya-azul");
    await expect(page).toHaveTitle(/Villa Maya Azul/i);
  });

  test("shows property name in heading", async ({ page }) => {
    await page.goto("/stays/villa-maya-azul");
    const h1 = page.locator("h1");
    await expect(h1).toContainText("Villa Maya Azul");
  });

  test("shows booking widget", async ({ page }) => {
    await page.goto("/stays/villa-maya-azul");
    const widget = page.locator('button:has-text("Book Now")');
    await expect(widget).toBeVisible();
  });

  test("shows breadcrumb navigation", async ({ page }) => {
    await page.goto("/stays/villa-maya-azul");
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText("Stays");
  });

  test("shows amenities section", async ({ page }) => {
    await page.goto("/stays/villa-maya-azul");
    const amenities = page.locator("text=Amenities");
    await expect(amenities.first()).toBeVisible();
  });

  test("404s for unknown slugs", async ({ page }) => {
    const response = await page.goto("/stays/nonexistent-property-xyz");
    expect(response?.status()).toBe(404);
  });
});
