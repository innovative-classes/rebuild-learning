import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    // Auth setup — runs first, sequentially
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    // Public pages — no auth needed
    {
      name: "public",
      testMatch: /public-pages\.spec\.ts|signup\.spec\.ts|login\.spec\.ts/,
      use: { browserName: "chromium" },
    },
    // Student tests — depend on student auth
    {
      name: "student",
      testMatch: /student-journey\.spec\.ts|payment\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        browserName: "chromium",
        storageState: "e2e/.auth/student.json",
      },
    },
    // Admin tests — depend on admin auth
    {
      name: "admin",
      testMatch: /admin-journey\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        browserName: "chromium",
        storageState: "e2e/.auth/admin.json",
      },
    },
  ],
});
