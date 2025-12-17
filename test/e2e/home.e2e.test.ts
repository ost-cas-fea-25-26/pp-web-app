import { test, expect } from "@playwright/test";
import {
  resetMockServer,
  mockGetUser,
  mockGetFollowees,
  mockGetPosts,
  mockCreatePost,
} from "./helpers/mock-server";

test.beforeEach(async () => {
  await resetMockServer();

  await mockGetUser();
  await mockGetFollowees();
  await mockGetPosts();
  await mockCreatePost();
});

test("create post works", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("button", { name: "Create Post (Rory McIlroy 💚)" })
    .click();

  await expect(
    page.getByText("Just made a birdie on the 18th hole!")
  ).toBeVisible();
});
