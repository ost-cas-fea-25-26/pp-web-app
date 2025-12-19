import { test, expect } from "@playwright/test";
import { resetMockServer, mockGetPosts } from "./helpers/mock-server";

test.beforeEach(async () => {
  await resetMockServer();
  await mockGetPosts();
});

test("home page displays posts", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText("Just made a birdie on the 18th hole!"),
  ).toBeVisible();

  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();
});
