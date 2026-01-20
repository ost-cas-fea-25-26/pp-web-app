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

test("profile page match screenshot", async ({ page }) => {
  await page.goto("/users/351340886451342425");
  await expect(
    page.getByText("Just made a birdie on the 18th hole!"),
  ).toBeVisible();

  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("profile page has no a11y violations", async ({ page }) => {
  await page.goto("/users/351340886451342425");

  await expect(
    page.getByText("Just made a birdie on the 18th hole!"),
  ).toBeVisible();

  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();

  await expectNoA11yViolations(page);
});
