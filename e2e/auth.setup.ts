import { test as setup, expect } from "@playwright/test";

// Login as student and save state
setup("authenticate as student", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[type="email"]').fill("saikrishna@demo.com");
  await page.locator('input[type="password"]').fill("Student@123");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/dashboard**", { timeout: 30000 });
  await expect(page.locator("text=Welcome back")).toBeVisible();
  await page.context().storageState({ path: "e2e/.auth/student.json" });
});

// Login as admin and save state
setup("authenticate as admin", async ({ page }) => {
  await page.goto("/login");
  await page.locator('input[type="email"]').fill("yalagondanikhil@gmail.com");
  await page.locator('input[type="password"]').fill("Rajeevteam@24*");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/admin**", { timeout: 30000 });
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: "e2e/.auth/admin.json" });
});
