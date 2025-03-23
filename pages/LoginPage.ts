import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly signInbutton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly invalidCredentialsErrMsg: Locator;
  readonly accountBlockedErrMsg: Locator;
  readonly loginButton: Locator;
  readonly myAccountTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInbutton = page.locator('[data-test="nav-sign-in"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.invalidCredentialsErrMsg = page.getByText("Invalid email or password");
    this.accountBlockedErrMsg = page.getByText("Account locked, too many");
    this.loginButton = page.getByTestId("login-submit");
    this.myAccountTitle = page.getByTestId("page-title");
  }
}
