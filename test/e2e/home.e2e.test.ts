import { test, expect } from "@playwright/test";
import {
  resetMockServer,
  mockGetPosts,
  mockGetFollowees,
  mockPostLikes,
  mockGetUserById,
} from "./helpers/mock-server";
import { expectNoA11yViolations } from "./helpers/a11y";

test.beforeEach(async () => {
  await resetMockServer();
  await mockGetUserById();
  await mockGetFollowees();
  await mockGetPosts();
  await mockPostLikes();
});

test("home page displays posts", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText("Just made a birdie on the 18th hole!")
  ).toBeVisible();

  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();
});

test("home page has no a11y violations", async ({ page }) => {
  await page.goto("/");

  await expectNoA11yViolations(page);
});
