import { test, expect } from "@playwright/test";
import { LinkedInHomePage } from "../pageObjects/LinkedInHomePage";
import { testdata } from "../fixtures/testData";
import { LoginPupUpPage } from "../pageObjects/LoginPupUpPage";
import { UserHomePage } from "../pageObjects/UserHomePage";
import { verify } from "crypto";

test.describe("Companies tests", () => {
  let linkedinHomePage: LinkedInHomePage;
  let loginPupUpPage: LoginPupUpPage;
  let userHomePage: UserHomePage;

  test.beforeEach(async ({ page }) => {
    linkedinHomePage = new LinkedInHomePage(page);
    loginPupUpPage = new LoginPupUpPage(page);
    userHomePage = new UserHomePage(page);
    const validUser = testdata.users.validUser;
    await page.goto("");
    await linkedinHomePage.loginWithUser(validUser.email, validUser.password);
    await linkedinHomePage.clickSignIn();
  });

  test("Search company and verify followers count", async () => {
    const companies = testdata.companies;
    for (const company of companies) {
      await userHomePage.searchCompany(company.name);
      await userHomePage.verifyFollowersCount();
    }
  });
});
