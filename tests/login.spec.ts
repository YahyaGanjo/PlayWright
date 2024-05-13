import { test, expect } from "@playwright/test";
import { LinkedInHomePage } from "../pageObjects/LinkedInHomePage";
import { testdata } from "../fixtures/testData";
import { LoginPupUpPage } from "../pageObjects/LoginPupUpPage";
import { UserHomePage } from "../pageObjects/UserHomePage";

test.describe("Login tests", () => {
  let linkedinHomePage: LinkedInHomePage;
  let loginPupUpPage: LoginPupUpPage;
  let userHomePage: UserHomePage;

  test.beforeEach(async ({ page }) => {
    linkedinHomePage = new LinkedInHomePage(page);
    loginPupUpPage = new LoginPupUpPage(page);
    userHomePage = new UserHomePage(page);
    await page.goto("");
    await expect(page).toHaveURL("");
    await linkedinHomePage.clickAcceptCookies();
  });

  test("Login with valid user test", async () => {
    const validUser = testdata.users.validUser;
    await linkedinHomePage.loginWithUser(validUser.email, validUser.password);
    await linkedinHomePage.clickSignIn();
    await userHomePage.verifyUserLandedOnPage();
  });

  test("Login with Invalid email test", async () => {
    const invalidUser = testdata.users.invalidEmail;
    await linkedinHomePage.loginWithUser(
      invalidUser.email,
      invalidUser.password
    );
    await linkedinHomePage.clickSignIn();
    await loginPupUpPage.verifyUserLandedOnPage();
    await loginPupUpPage.verifyErrorMessageEmail();
  });

  test("Login with Invalid password test", async () => {
    const invalidUser = testdata.users.invalidPassword;
    await linkedinHomePage.loginWithUser(
      invalidUser.email,
      invalidUser.password
    );
    await linkedinHomePage.clickSignIn();
    await loginPupUpPage.verifyUserLandedOnPage();
    await loginPupUpPage.verifyErrorMessagePassword();
  });

  // TODO Add Login with google test
});
