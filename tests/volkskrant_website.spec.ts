import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('https://www.volkskrant.nl', {timeout: 4000});
  const AkkoordButton = page.frameLocator('iframe[title="SP Consent Message"]').getByLabel('Akkoord');
  // to potentially handle the cookies consent modal
  if (AkkoordButton) {
    await AkkoordButton.click();
  }
});

test.afterAll(async ({ browser }) => {
  browser.close();
});

test.describe('Side Navigation', () => {
  test('Side Menu should open & close as expected', async ({page}) => {

    // Wait for the button to appear in the DOM
    const menuOpenButton = await page.waitForSelector('button.fjs-app-menu-section-trigger');
    // Click on the button                     
    await menuOpenButton.click();
    // Get the value of aria-expanded attribute when menu is open
    let ariaExpanded = await menuOpenButton.getAttribute('aria-expanded');
    // Assert the menu is visible 
    expect(ariaExpanded).toBe('true');
    // Get the locator of close button 
    const menuCloseButton = page.locator('header').filter({ hasText: 'Rubrieken' }).getByRole('img').first()
    // Click on the button                     
    menuCloseButton.click();
    await page.waitForTimeout(1500);
    // Get the value of aria-expanded attribute when menu is closed
    ariaExpanded = await menuOpenButton.getAttribute('aria-expanded');
    // Assert the menu is hidden
    expect(ariaExpanded).toBe('false');

  });

  test('Side menu should have the expected content', async ({page}) => {

    // Wait for the button to appear in the DOM
    const menuOpenButton = await page.waitForSelector('button.fjs-app-menu-section-trigger');
    // Click on the button                     
    await menuOpenButton.click();
    // Verify the menu has a title
    const menuTitle = page.locator('header').filter({ hasText: 'Rubrieken' });
    await expect(menuTitle).toBeVisible();
    // Verify the menu has 2 lists titles
    const menuLists = await page.locator('h3.menu-list-title:visible').count(); 
    expect(menuLists).toBe(2);
    // Verify the menu has 33 elements in total of list items & sub-items
    const menuListItems = await page.locator('li.menu-list__item:visible').count();
    expect(menuListItems).toBe(33); 

  })

  test('Menu items should navigate as expected', async ({page}) => {

    // Wait for the button to appear in the DOM
    const menuOpenButton = await page.waitForSelector('button.fjs-app-menu-section-trigger');
    // Click on the button                     
    await menuOpenButton.click();
    // select the last item
    const wetenschap = page.getByRole('link', {name: 'Wetenschap', exact: true } ).filter({ hasText: 'Wetenschap' });
    // Scroll to the last item of the page
    await wetenschap.scrollIntoViewIfNeeded();
    // click on last item
    await wetenschap.click();
    // Verify navigated to /wetenschap
    expect(page.url()).toBe('https://www.volkskrant.nl/wetenschap');

  })
});
