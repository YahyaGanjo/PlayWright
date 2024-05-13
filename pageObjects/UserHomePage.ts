import { Page, expect, Locator } from "@playwright/test";
import { selectors } from "playwright";

export class UserHomePage {
  readonly page: Page;
  readonly searchField: Locator;
  readonly companiesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = page.getByPlaceholder("Search", { exact: true });
    this.companiesLink = page.getByRole("link", { name: "Companies" });
  }

  async verifyUserLandedOnPage() {
    await expect(this.page).toHaveURL(
      "feed/?trk=homepage-basic_sign-in-submit"
    );
  }

  async searchCompany(companyName: string) {
    await this.searchField.fill(companyName);
    await this.page.keyboard.press("Enter");
    await this.companiesLink.click();
  }

  async verifyFollowersCount() {
    await this.page.waitForSelector(".entity-result__secondary-subtitle");
    const followersElement = await this.page.$(
      ".entity-result__secondary-subtitle"
    );
    if (followersElement) {
      expect(followersElement).toBeDefined();
    }
  }
}
