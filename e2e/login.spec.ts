import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("should display login form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h2")).toContainText("Welcome back");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show green banner when redirected from signup", async ({ page }) => {
    await page.goto("/login?registered=true");
    await expect(page.locator(".bg-green-50")).toBeVisible();
    await expect(page.locator("text=Account created")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("nonexistent@test.com");
    await page.locator('input[type="password"]').fill("WrongPassword123!");
    await page.click('button[type="submit"]');
    await expect(page.locator(".bg-red-50")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Invalid email or password")).toBeVisible();
  });

  test("should login as student and redirect to dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("saikrishna@demo.com");
    await page.locator('input[type="password"]').fill("Student@123");
    await page.click('button[type="submit"]');
    // Should redirect to student dashboard
    await page.waitForURL("**/dashboard**", { timeout: 15000 });
    await expect(page.locator("text=Welcome back")).toBeVisible();
  });

  test("should login as admin and redirect to admin panel", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("yalagondanikhil@gmail.com");
    await page.locator('input[type="password"]').fill("Rajeevteam@24*");
    await page.click('button[type="submit"]');
    // Should redirect to admin dashboard
    await page.waitForURL("**/admin**", { timeout: 15000 });
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test("should have forgot password link", async ({ page }) => {
    await page.goto("/login");
    const forgotLink = page.locator('a[href="/forgot-password"]');
    await expect(forgotLink).toBeVisible();
  });

  test("should have signup link", async ({ page }) => {
    await page.goto("/login");
    const signupLink = page.locator('a[href="/signup"]');
    await expect(signupLink).toBeVisible();
  });
});
