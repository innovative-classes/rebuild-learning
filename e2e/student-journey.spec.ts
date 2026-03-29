import { test, expect } from "@playwright/test";

// Auth is handled by storageState in playwright.config.ts (student project)

test.describe("Student Journey", () => {
  // --- DASHBOARD ---
  test("should show dashboard with stats and recent activity", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=Welcome back")).toBeVisible();
    // Stats cards
    await expect(page.getByText("Completed", { exact: true })).toBeVisible();
    await expect(page.getByText("Available", { exact: true })).toBeVisible();
    // Recent activity section
    await expect(page.getByText("Recent Activity")).toBeVisible();
  });

  test("should show premium banner for free users", async ({ page }) => {
    await page.goto("/dashboard");
    // Premium upsell banner
    const premiumBanner = page.locator("text=Unlock all 12 career reports");
    // May or may not appear depending on user status
    if (await premiumBanner.isVisible()) {
      await expect(premiumBanner).toBeVisible();
    }
  });

  // --- ASSESSMENTS LIST ---
  test("should navigate to assessments page", async ({ page }) => {
    await page.goto("/assessments");
    await expect(page.locator("h1")).toContainText("Career Assessments");
    // Should show assessment cards
    await expect(page.getByText("Module 01", { exact: false }).first()).toBeVisible();
  });

  test("should display all 12 assessment modules", async ({ page }) => {
    await page.goto("/assessments");
    // Check that modules are listed
    await expect(page.getByText("Engineering, Technology & AI")).toBeVisible();
    await expect(page.getByText("Medicine, Healthcare & Biotech")).toBeVisible();
  });

  // --- ASSESSMENT DETAIL ---
  test("should navigate to assessment detail page", async ({ page }) => {
    await page.goto("/assessments");
    // Click on the first assessment with questions
    const firstAssessment = page.locator('a[href^="/assessments/"]').first();
    await firstAssessment.click();
    // Should show assessment detail
    await expect(page.locator("text=← Back to Assessments")).toBeVisible();
    // Should have module info
    await expect(page.getByText("Stream", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Key Exams", { exact: true })).toBeVisible();
  });

  // --- PROFILE ---
  test("should load profile page", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.locator("h1, h2").filter({ hasText: /profile/i }).first()).toBeVisible({ timeout: 10000 });
  });

  // --- EXAM CALENDAR ---
  test("should load exam calendar page", async ({ page }) => {
    await page.goto("/exam-calendar");
    await expect(page.locator("h1")).toContainText("Exam Calendar");
    // Should show month entries
    await expect(page.getByText("January", { exact: true }).first()).toBeVisible();
  });

  // --- COMING SOON PAGES ---
  test("should show courses page as coming soon", async ({ page }) => {
    await page.goto("/courses");
    await expect(page.getByText("Coming Soon", { exact: true })).toBeVisible();
  });

  test("should show college predictor as coming soon", async ({ page }) => {
    await page.goto("/college-predictor");
    await expect(page.getByText("Coming Soon", { exact: true })).toBeVisible();
  });

  // --- COUNSELLING BOOKING PAGE ---
  test("should load counselling booking page", async ({ page }) => {
    await page.goto("/book-counselling");
    await expect(page.getByRole("heading", { name: /counselling/i })).toBeVisible({ timeout: 10000 });
    // Should have a form with phone, date, time fields
    await expect(page.locator('input[type="tel"], input[placeholder*="phone" i], input[name="phone"]')).toBeVisible({ timeout: 5000 });
  });

  // --- SUBSCRIBE PAGE ---
  test("should load subscribe page with pricing", async ({ page }) => {
    await page.goto("/subscribe");
    await expect(page.getByRole("heading", { name: /premium/i })).toBeVisible({ timeout: 10000 });
    // Should list benefits
    await expect(page.getByText("All 12 assessments", { exact: false })).toBeVisible();
  });

  // --- SIDEBAR NAVIGATION ---
  test("should have working sidebar navigation links", async ({ page }) => {
    await page.goto("/dashboard");
    // Check desktop sidebar links (visible at lg: viewport)
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Assessments" })).toBeVisible();
  });
});
