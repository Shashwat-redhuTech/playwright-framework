import {expect, test} from '@playwright/test';


// test.only('popUp validations',async ({page})=>{
//   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

// // await page.goto("http://google.com");
// // await page.goBack();
// // await page.goForward();

// await expect(page.locator("displayed-text")).toBeVisible();
// await page.locator("hide-textbox").click();
// await expect(page.locator("displayed-text")).toBeHidden();
// })

test.only('popUp validation', async({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const confirm = page.locator("//input[@id='confirmbtn']");
  await confirm.click();
  // how to handle popUps

  page.on('dialog',dialog=> dialog.accept());
  // to hover your cursor
  

});

 