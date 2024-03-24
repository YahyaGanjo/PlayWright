import { test, expect } from "@playwright/test";
import { BurgerMenuPage } from "../pageObjects/burgermenuPageObject";

test.describe("Burger menu tests", () => {
  let burgerMenuPage: BurgerMenuPage;

  test.beforeEach(async ({ page }) => {
    burgerMenuPage = new BurgerMenuPage(page);
    await page.goto("");
    await expect(page).toHaveURL(/\.nl\//);
    await burgerMenuPage.getNotice();
    await burgerMenuPage.clickOnBurgerMenu();
    await burgerMenuPage.menuShouldBeVisible();
  });

  test("Verify BurgerMenu can be open and close", async () => {
    await burgerMenuPage.clickOnCloseButton();
    await burgerMenuPage.menuShouldNotBeVisible();
  });

  test("Verify BurgerMenu content", async () => {
    await burgerMenuPage.validateMenuOptions(0);
    await burgerMenuPage.validateMenuOptions(1);
  });

  test("Verify BurgerMenu items navigation", async () => {
    await burgerMenuPage.validateListItemNavigation(0, 0);
    await burgerMenuPage.clickOnBurgerMenu();
    await burgerMenuPage.validateListItemNavigation(0, 3);
    await burgerMenuPage.clickOnBurgerMenu();
    await burgerMenuPage.validateListItemNavigation(1, 28);
  });
});
