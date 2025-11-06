import {expect, test} from '@playwright/test';


test('Page Playwright test', async ({page})=>
{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("//input[@id='username']").fill("test user");
    await page.locator("//input[@id='password']").fill("mkc");
    await page.locator("#signInBtn").click();
    let errormessage =  page.locator("//div[@class='alert alert-danger col-md-12']");
    await expect(errormessage).toContainText("Incorrect");
    console.log(errormessage);

});

test.only('Ui controls', async({page})=>{
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const userName = page.locator("//input[@id='username']");
      const password = page.locator("//input[@id='password']");
      const userCheckBox = page.locator("//label[2]//span[2]");
      const oKBtn = page.locator("//button[@id='okayBtn']");
      const dropDown = page.locator("//select[@class='form-control']");
      const loginBtn = page.locator("#signInBtn");
      const signInCheckBox = page.locator("#terms");
      await userName.fill("test user");
      await password.fill("ras");
      await userCheckBox.check();
      await expect(userCheckBox).toBeChecked();
      await oKBtn.click();
      await dropDown.selectOption("consult");
      await signInCheckBox.check();
      await expect(signInCheckBox).toBeChecked();
      await loginBtn.click();
});




  


