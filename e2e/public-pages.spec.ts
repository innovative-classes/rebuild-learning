import { test, expect } from "@playwright/test";

test.describe("Public Pages", () => {
  test("should load homepage with hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1", { hasText: "Career Path" })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Start Your Assessment' })).toBeVisible();
  });

  test("should show 12 career modules on homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Engineering, Technology & AI")).toBeVisible();
    await expect(page.locator("text=Medicine, Healthcare & Biotech")).toBeVisible();
  });

  test("should show how it works section", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=How It Works")).toBeVisible();
  });

  test("should load terms page", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("h1")).toContainText("Terms of Service");
  });

  test("should load privacy page", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1")).toContainText("Privacy Policy");
  });

  test("should load refund policy page", async ({ page }) => {
    await page.goto("/refund-policy");
    await expect(page.locator("h1")).toContainText("Refund");
  });

  test("should load forgot password page", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.locator("text=Forgot your password")).toBeVisible();
  });

  test("should load verify email page (no token)", async ({ page }) => {
    await page.goto("/verify-email");
    // Without token, should show error/invalid state
    await expect(page.getByRole('heading', { name: 'Verification Failed' })).toBeVisible({ timeout: 15000 });
  });

  test("should load reset password page (no token)", async ({ page }) => {
    await page.goto("/reset-password");
    await expect(page.getByRole('heading', { name: 'Invalid Link' })).toBeVisible({ timeout: 15000 });
  });

  // --- NAVIGATION ---
  test("homepage Sign in link should go to login", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Sign in");
    await page.waitForURL("**/login");
    await expect(page.locator("h2")).toContainText("Welcome back");
  });

  test("homepage Get Started button should go to signup", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").locator("text=Get Started").click();
    await page.waitForURL("**/signup");
    await expect(page.locator("h2")).toContainText("Create your account");
  });
});
