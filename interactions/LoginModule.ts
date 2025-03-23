import { expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export class LoginModule {
  private loginPage: LoginPage;

  // Constructor to initialize the LoginPage with the Page object
  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  // Method to perform the login action
  public async login(email: string, password: string) {
    await this.loginPage.signInbutton.click();
    await this.loginPage.emailInput.fill(email);
    await this.loginPage.passwordInput.fill(password);
    await this.loginPage.loginButton.click();

    await this.checkForErrors();
    await this.loginPage.myAccountTitle.waitFor({ state: "visible" });

    const accountTitleText = await this.loginPage.myAccountTitle.textContent();
    expect(accountTitleText).toContain("My account");
    console.log("Login successful");
  }

  // Method to check for error messages during login
  private async checkForErrors() {
    if (await this.loginPage.accountBlockedErrMsg.isVisible()) {
      throw new Error("Account is blocked");
    }

    if (await this.loginPage.invalidCredentialsErrMsg.isVisible()) {
      throw new Error("Invalid credentials");
    }
  }
}
