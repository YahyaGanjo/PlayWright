import { Page, Locator, expect, FrameLocator } from "@playwright/test";

export class LoginPupUpPage {
  readonly page: Page;
  readonly errorMessageEmail: Locator;
  readonly errorMessagePassword: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorMessageEmail = page.getByText(
      "Please enter a valid email address."
    );
    this.errorMessagePassword = page.getByText(
      "Wrong email or password. Try again or create an account ."
    );
    this.signInBtn = page.getByRole("button", { name: "Sign in" });
  }

  async clickSignIn() {
    await this.signInBtn.click();
  }

  async verifyUserLandedOnPage() {
    await expect(this.page).toHaveURL("uas/login-submit");
  }

  async verifyErrorMessageEmail() {
    await expect(this.errorMessageEmail).toBeVisible();
  }

  async verifyErrorMessagePassword() {
    await expect(this.errorMessagePassword).toBeVisible();
  }
}
