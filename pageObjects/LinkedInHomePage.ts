import { Page, Locator } from "@playwright/test";

export class LinkedInHomePage {
  readonly page: Page;
  readonly acceptButton: Locator;
  readonly closeButton: Locator;
  readonly usernameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptButton = page.getByRole("button", { name: "Accept" });
    this.usernameInputField = page.getByLabel("Email or phone");
    this.passwordInputField = page.getByLabel("Password", { exact: true });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async clickAcceptCookies() {
    await this.acceptButton.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async loginWithUser(username: string, password: string) {
    await this.usernameInputField.fill(username);
    await this.passwordInputField.fill(password);
  }
}
