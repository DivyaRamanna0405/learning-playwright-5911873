import { test, expect } from "@playwright/test";
import { LoginModule } from "../../interactions/LoginModule.ts";
import { ProductModule } from "../../interactions/ProductModule";

const baseURL = "https://practicesoftwaretesting.com/";
const email = "customer@practicesoftwaretesting.com";
const password = "welcome01";

/**
 * Test suite for login functionality
 * Playwright concepts used:
 * - Page Object Model
 * - Interacting with elements
 * - Expectations
 * - Navigation
 * - Data-driven testing
 * - Test hooks
 * - Test retries
 * - Test timeouts
 * - Recorder
 */

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
});

test("Login without page object", async ({ page }) => {
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();
});

test("Login with page object", async ({ page }) => {
  const loginActions = new LoginModule(page); // Fix: Define login module instance

  // Recommended: Use the login method from the Page Object Model
  await loginActions.login(email, password);

  // Verify login success
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});

test("Search Product and verify", async ({ page }) => {
  const loginActions = new LoginModule(page);
  await loginActions.login(email, password);

  const searchQuery = "Thor Hammer";
  const searchProduct = new ProductModule(page);

  // Execute search and verification
  await searchProduct.searchProductAndVerify(searchQuery);
});

test.afterEach(async ({ page }) => {
  // Reset the browser context. This will clear all cookies, permissions, and other session data,
  // ensuring a clean environment for the next test without closing the browser.
  await page.context().clearCookies();
  await page.context().clearPermissions();
});
