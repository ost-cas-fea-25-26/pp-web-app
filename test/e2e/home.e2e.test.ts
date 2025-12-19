import { test, expect } from "@playwright/test";
import { resetMockServer, mockGetPosts } from "./helpers/mock-server";

test.beforeEach(async () => {
  await resetMockServer();
  await mockGetPosts();
});

test("home page displays posts", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText(
      "Par 3. One on the green. Already celebrating the birdie… four-putted. Golf is a cruel sport.",
    ),
  ).toBeVisible();

  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();
});
