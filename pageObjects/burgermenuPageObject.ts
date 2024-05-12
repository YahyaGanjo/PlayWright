import { Page, Locator, expect, FrameLocator } from "@playwright/test";
import { testdata } from "../fixtures/testData";

export class BurgerMenuPage {
  readonly page: Page;
  readonly notice: FrameLocator;
  readonly agreeButtonLabel: Locator;
  readonly burgermenuIcon: Locator;
  readonly menu: Locator;
  readonly closeButton: Locator;
  readonly appMenu: Locator;
  readonly backToHomeIcon: Locator;
  readonly appHeaderIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notice = page.frameLocator('iframe[title="SP Consent Message"]');
    this.agreeButtonLabel = this.notice.getByRole("button", {
      name: "Akkoord",
      exact: true,
    });
    this.burgermenuIcon = page.locator("[data-menu-trigger=sections]").first();
    this.menu = page.locator("[data-menu=sections]");
    this.closeButton = page
      .locator("header")
      .filter({ hasText: "Rubrieken" })
      .getByRole("img")
      .first();
    this.appMenu = page.locator('[data-menu="sections"]');
    this.backToHomeIcon = page.getByRole("banner").getByRole("img").nth(1);
    this.appHeaderIcon = page.locator("div.app-header-home__brand");
  }

  async getNotice() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const currentUrl = this.page.url();

    if (currentUrl !== testdata.baseURL) {
      this.agreeButtonLabel.click();
    }

    this.page.on("pageerror", (error: Error) => {
      if (error.message.includes("Things went bad")) {
        // Handle the specific error
        console.error("Caught exception:", error);
      }
    });
  }

  async clickOnBurgerMenu() {
    await this.burgermenuIcon.click();
  }

  async menuShouldBeVisible() {
    await expect(this.menu).toBeVisible();
  }

  async menuShouldNotBeVisible() {
    await expect(this.menu).not.toBeVisible();
  }

  async clickOnCloseButton() {
    await this.closeButton.click();
  }

  async validateMenuOptions(listIndex: number) {
    const list = this.appMenu.locator("ul").nth(listIndex).locator("li");
    const count = await list.count();
    for (let index = 0; index < count; index++) {
      const listItem = list.nth(index);
      await expect(listItem).toContainText(
        testdata.menuOptions[listIndex][index]
      );
    }
  }

  async validateListItemNavigation(listIndex: number, itemIndex: number) {
    const listItem = this.appMenu
      .locator("ul")
      .nth(listIndex)
      .locator("li")
      .nth(itemIndex);
    await listItem.scrollIntoViewIfNeeded();
    await listItem.click();
    await expect(this.page).toHaveURL(testdata.url[listIndex][itemIndex]);
    await this.backToHomeIcon.click();
    await expect(this.appHeaderIcon).toBeVisible();
  }
}
