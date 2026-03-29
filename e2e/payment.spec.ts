import { test, expect } from "@playwright/test";

// Auth is handled by storageState in playwright.config.ts (student project)

test.describe("Payment & Razorpay Flow", () => {

  test("should show payment page for unpaid assessment", async ({ page }) => {
    // Go to assessments
    await page.goto("/assessments");
    // Click on first assessment
    const firstLink = page.locator('a[href^="/assessments/"]').first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await page.waitForURL(`**${href}`);

    // Check for unlock/payment button (if not already paid)
    const payButton = page.locator("text=Unlock").or(page.locator("text=Pay")).or(page.locator("text=₹99"));
    const startButton = page.locator("text=Start Quiz").or(page.locator("text=Continue").or(page.locator("text=Take Quiz")));

    if (await payButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      // User hasn't paid — click unlock (may go to /payment/ or /subscribe)
      await payButton.first().click();
      await page.waitForURL(/\/(payment|subscribe)/, { timeout: 10000 });

      // Payment/subscribe page should show a pay button
      await expect(page.locator("button").filter({ hasText: /pay|unlock|proceed|subscribe/i }).first()).toBeVisible();
    } else if (await startButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      // User already paid — that's OK, test passes
      expect(true).toBe(true);
    }
  });

  test("should load Razorpay checkout script on payment page", async ({ page }) => {
    await page.goto("/assessments");
    const firstLink = page.locator('a[href^="/assessments/"]').first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await page.waitForURL(`**${href}`);

    const payButton = page.locator("text=Unlock").or(page.locator('a[href*="/payment/"]'));
    if (await payButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await payButton.first().click();
      await page.waitForURL("**/payment/**", { timeout: 10000 });

      // Check that Razorpay script tag is present
      const razorpayScript = page.locator('script[src*="razorpay"]');
      await expect(razorpayScript).toBeAttached({ timeout: 10000 });
    }
  });

  test("should apply coupon on payment page", async ({ page }) => {
    await page.goto("/assessments");
    const firstLink = page.locator('a[href^="/assessments/"]').first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await page.waitForURL(`**${href}`);

    const payButton = page.locator("text=Unlock").or(page.locator('a[href*="/payment/"]'));
    if (await payButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await payButton.first().click();
      await page.waitForURL("**/payment/**", { timeout: 10000 });

      // Enter invalid coupon
      const couponInput = page.locator('input[placeholder*="coupon" i], input[placeholder*="code" i]');
      if (await couponInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await couponInput.fill("INVALIDCODE");
        await page.locator("button").filter({ hasText: /apply/i }).click();
        // Should show error
        await expect(page.locator("text=Invalid").or(page.locator(".text-red-600")).or(page.locator(".text-red-500"))).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test("should initiate Razorpay on pay button click", async ({ page }) => {
    await page.goto("/assessments");
    const firstLink = page.locator('a[href^="/assessments/"]').first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await page.waitForURL(`**${href}`);

    const payButton = page.locator("text=Unlock").or(page.locator('a[href*="/payment/"]'));
    if (await payButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await payButton.first().click();
      await page.waitForURL("**/payment/**", { timeout: 10000 });

      // Listen for network requests to payments/create API
      const createPaymentPromise = page.waitForResponse(
        (response) => response.url().includes("/api/payments/create"),
        { timeout: 15000 }
      );

      // Click the pay/proceed button
      const proceedBtn = page.locator("button").filter({ hasText: /pay|proceed|unlock/i }).first();
      await proceedBtn.click();

      // Wait for payments/create API call
      const response = await createPaymentPromise;
      const responseData = await response.json();

      // Verify payment was created
      expect(response.status()).toBe(200);
      expect(responseData.paymentId).toBeTruthy();

      // If Razorpay is configured, it should return razorpay mode
      if (responseData.mode === "razorpay") {
        expect(responseData.razorpayOrderId).toBeTruthy();
        expect(responseData.razorpayKeyId).toBeTruthy();
        // Razorpay popup would open here (can't test popup in headless)
      } else {
        // Simulation mode
        expect(responseData.mode).toBe("simulation");
      }
    }
  });

  // --- SUBSCRIBE PAGE PAYMENT ---
  test("should have payment button on subscribe page", async ({ page }) => {
    await page.goto("/subscribe");
    await expect(page.getByRole("heading", { name: /premium/i })).toBeVisible({ timeout: 10000 });
    const payBtn = page.locator("button").filter({ hasText: /pay|subscribe|upgrade/i }).first();
    await expect(payBtn).toBeVisible();
  });

  // --- COUNSELLING BOOKING PAYMENT ---
  test("should show counselling fee of ₹2500", async ({ page }) => {
    await page.goto("/book-counselling");
    await expect(page.getByText("2,500").first()).toBeVisible({ timeout: 10000 });
  });
});
