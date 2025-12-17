import { test, expect } from "@playwright/test";

test("home page renders create post button", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Create Post (Rory McIlroy 💚)" }),
  ).toBeVisible();
});
