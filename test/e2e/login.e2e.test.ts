import "dotenv/config";

import { requireEnv } from "@/lib/utils";
import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("/");

  await page
    .getByTestId("username-text-input")
    .fill(requireEnv("PLAYWRIGHT_TEST_USER_1_EMAIL"));

  await page.getByTestId("submit-button").click();

  await page
    .getByTestId("password-text-input")
    .fill(requireEnv("PLAYWRIGHT_TEST_USER_1_PASSWORD"));

  await Promise.all([
    page.waitForURL(/localhost:3000/, { timeout: 30_000 }),
    page.getByTestId("submit-button").click(),
  ]);

  await expect(page.getByTestId("auth-guard-authenticated")).toBeVisible({
    timeout: 30_000,
  });
});
