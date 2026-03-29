import { test, expect } from "@playwright/test";

// Auth is handled by storageState in playwright.config.ts (admin project)

test.describe("Admin Journey", () => {
  // --- ADMIN DASHBOARD ---
  test("should show admin dashboard with stats", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("main").getByText("Total Students")).toBeVisible();
    await expect(page.getByRole("main").getByText("Revenue")).toBeVisible();
    await expect(page.getByRole("main").getByText("Assessments")).toBeVisible();
  });

  test("should show recent payments section", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("heading", { name: "Recent Payments" })).toBeVisible();
  });

  test("should show pending bookings section", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("heading", { name: "Pending Bookings" })).toBeVisible();
  });

  // --- ADMIN SIDEBAR NAVIGATION ---
  test("should have all admin sidebar links", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Assessments" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Payments" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Coupons" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible();
  });

  // --- USERS PAGE ---
  test("should show users management page", async ({ page }) => {
    await page.goto("/admin/users");
    await expect(page.locator("h1")).toContainText("Manage Users");
    await expect(page.locator("th").filter({ hasText: "Name" })).toBeVisible();
    await expect(page.locator("th").filter({ hasText: "Email" })).toBeVisible();
  });

  // --- ASSESSMENTS PAGE ---
  test("should show assessments management page", async ({ page }) => {
    await page.goto("/admin/assessments");
    await expect(page.locator("h1")).toContainText("Manage Assessments");
    await expect(page.locator("th").filter({ hasText: "Module" })).toBeVisible();
    await expect(page.locator("th").filter({ hasText: "Questions" })).toBeVisible();
  });

  test("should navigate to assessment edit page", async ({ page }) => {
    await page.goto("/admin/assessments");
    const editLink = page.locator("text=Edit").first();
    await editLink.click();
    await page.waitForURL("**/admin/assessments/**");
    await expect(page.getByRole("textbox").first()).toBeVisible({ timeout: 10000 });
  });

  // --- PAYMENTS PAGE ---
  test("should show payments page", async ({ page }) => {
    await page.goto("/admin/payments");
    await expect(page.locator("h1")).toContainText("Payments");
    await expect(page.locator("th").filter({ hasText: "User" })).toBeVisible();
    await expect(page.locator("th").filter({ hasText: "Status" })).toBeVisible();
  });

  // --- COUPONS PAGE ---
  test("should show coupons page", async ({ page }) => {
    await page.goto("/admin/coupons");
    await expect(page.locator("h1")).toContainText("Coupons");
    await expect(page.getByRole("button", { name: /create coupon/i })).toBeVisible();
  });

  test("should open create coupon form", async ({ page }) => {
    await page.goto("/admin/coupons");
    await page.getByRole("button", { name: /create coupon/i }).click();
    await expect(page.locator("form")).toBeVisible({ timeout: 5000 });
  });

  // --- BOOKINGS PAGE ---
  test("should show bookings page", async ({ page }) => {
    await page.goto("/admin/bookings");
    await expect(page.locator("h1")).toContainText("Bookings");
  });

  // --- EXAM CALENDAR ADMIN ---
  test("should show exam calendar admin page", async ({ page }) => {
    await page.goto("/admin/exam-calendar");
    await expect(page.locator("h1").filter({ hasText: "Exam Calendar" })).toBeVisible();
    await expect(page.getByText("Coming Soon", { exact: true })).toBeVisible();
  });
});
