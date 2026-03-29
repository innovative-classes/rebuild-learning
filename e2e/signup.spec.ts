import { test, expect } from "@playwright/test";

test.describe("Signup Flow", () => {
  test("should display signup form with all required fields", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.locator("h1")).toContainText("Rebuild Learning");
    await expect(page.locator("h2")).toContainText("Create your account");
    // Check all fields exist
    await expect(page.locator('input[type="text"]').first()).toBeVisible(); // name
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("should show validation errors for empty form", async ({ page }) => {
    await page.goto("/signup");
    // Try to submit empty form — HTML5 validation should block it
    await page.click('button[type="submit"]');
    // Form should still be visible (not navigated)
    await expect(page.locator("h2")).toContainText("Create your account");
  });

  test("should show error for duplicate email", async ({ page }) => {
    await page.goto("/signup");
    await page.fill('input[name="name"], input[placeholder*="name" i]', "Test User");
    // Fill email field
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill("saikrishna@demo.com"); // existing demo user
    // Fill password
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill("StrongPass@123");

    await page.click('button[type="submit"]');
    // Should show error about existing account
    await expect(page.locator("text=already exists").or(page.locator("text=already registered")).or(page.locator(".bg-red-50"))).toBeVisible({ timeout: 10000 });
  });

  test("should show 'Check your email' after successful signup", async ({ page }) => {
    await page.goto("/signup");
    const uniqueEmail = `test-${Date.now()}@playwright-test.com`;

    // Fill Name (first text input with placeholder "Enter your full name")
    await page.locator('input[placeholder="Enter your full name"]').fill("Playwright Test User");
    // Fill Email
    await page.locator('input[type="email"]').fill(uniqueEmail);
    // Fill Password
    await page.locator('input[type="password"]').fill("TestPass@12345");
    // Fill Phone (optional)
    const phoneInput = page.locator('input[type="tel"]');
    if (await phoneInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await phoneInput.fill("9876543210");
    }

    // Submit
    await page.click('button[type="submit"]');

    // Should show success screen with "Check your email"
    await expect(page.locator("text=Check your email")).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('link', { name: 'Go to Sign in' })).toBeVisible();
  });

  test("should have link to login page", async ({ page }) => {
    await page.goto("/signup");
    const signInLink = page.locator('a[href="/login"]');
    await expect(signInLink).toBeVisible();
  });
});
