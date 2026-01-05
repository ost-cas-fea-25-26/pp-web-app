import { AxeBuilder } from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";

export const expectNoA11yViolations = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations).toEqual([]);
};
