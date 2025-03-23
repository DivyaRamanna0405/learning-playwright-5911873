import { test as setup, expect } from "@playwright/test";
import { TIMEOUT } from "dns";

setup("Create customer 01 auth", async ({ page, context }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = ".auth/customer01.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  // await page.getByPlaceholder("Your email").fill(email);
  // await page.getByPlaceholder("Your password").fill(password);
  // await page.locator('[data-test="login-submit"]').click();
  await page.getByLabel("Login").click;
  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-submit").click();

  await page.waitForTimeout(3000);
  //await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await expect(page.locator('[data-test="page-title"]')).toContainText("My account");
  await context.storageState({ path: customer01AuthFile });
});
