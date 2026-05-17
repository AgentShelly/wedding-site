import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/i);
  });

  test("shows contact information", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("text=WhatsApp")).toBeVisible();
    await expect(page.locator("text=Email")).toBeVisible();
  });

  test("has inquiry modal trigger", async ({ page }) => {
    await page.goto("/contact");
    const trigger = page.locator('button:has-text("inquiry")');
    await expect(trigger.first()).toBeVisible();
  });
});

test.describe("Inquiry Modal", () => {
  test("opens when trigger is clicked", async ({ page }) => {
    await page.goto("/");

    // Find and click an inquiry button
    const trigger = page.locator('button:has-text("Ask a question")').first();
    await trigger.click();

    // Modal should appear
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText("Send an Inquiry");
  });

  test("closes when X button is clicked", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator('button:has-text("Ask a question")').first();
    await trigger.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Close
    await modal.locator('button[aria-label="Close"]').click();
    await expect(modal).not.toBeVisible();
  });

  test("closes on Escape key", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator('button:has-text("Ask a question")').first();
    await trigger.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });

  test("form has required fields", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator('button:has-text("Ask a question")').first();
    await trigger.click();

    const modal = page.locator('[role="dialog"]');
    await expect(modal.locator("#inquiry-name")).toBeVisible();
    await expect(modal.locator("#inquiry-email")).toBeVisible();
    await expect(modal.locator("#inquiry-message")).toBeVisible();
  });

  test("shows validation errors for empty form submission", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.locator('button:has-text("Ask a question")').first();
    await trigger.click();

    const modal = page.locator('[role="dialog"]');
    const submitButton = modal.locator('button:has-text("Send Inquiry")');
    await submitButton.click();

    // Should show validation errors
    const errors = modal.locator('[role="alert"]');
    await expect(errors.first()).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("skip link is present on homepage", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeAttached();
  });

  test("all pages have a main landmark", async ({ page }) => {
    for (const path of ["/", "/stays", "/about", "/contact"]) {
      await page.goto(path);
      const main = page.locator("main, [role=main]");
      await expect(main).toBeAttached();
    }
  });

  test("nav has aria-label", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeAttached();
  });
});
