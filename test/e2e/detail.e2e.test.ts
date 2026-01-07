import { test, expect } from "@playwright/test";
import {
  resetMockServer,
  mockGetPostById,
  mockGetUserById,
} from "./helpers/mock-server";
import { expectNoA11yViolations } from "./helpers/a11y";

const POST_ID = "01GDMMR85BEHP8AKV8ZGGM259L";

test.beforeEach(async () => {
  await resetMockServer();
  await mockGetUserById();
  await mockGetPostById(POST_ID);
});

const DETAIL_PAGE_URL = `/mumble/${POST_ID}`;

test("detail page displays post", async ({ page }) => {
  await page.goto(DETAIL_PAGE_URL);

  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();
});

test("detail page match screenshot", async ({ page }) => {
  await page.goto(DETAIL_PAGE_URL);
  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("detail page has no a11y violations", async ({ page }) => {
  await page.goto(DETAIL_PAGE_URL);
  await expect(page.getByText("Loving this new putter I got!")).toBeVisible();

  await expectNoA11yViolations(page);
});
