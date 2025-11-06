// Import the manager at the top
import { test } from '@playwright/test';
const { POManager } = require('../Pageobjects/POManager');
const testData = require('./Utils/testdata.json');

// The test is no longer inside a loop
test('End to End Flow', async ({ page }) => {
   
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashBoardPage();
    const cartPage = poManager.getCartPage();
    const placeorder = poManager.getPlaceOrderPage();
    //...etc
    
    
   const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGRjYzQ0MWY2NjlkNmNiMGFmNTc5ODAiLCJ1c2VyRW1haWwiOiJjb2RleGdpZ2FzOTBAZ21haWwuY29tIiwidXNlck1vYmlsZSI6ODE3ODU1ODU4NCwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc2MjE0OTY1OCwiZXhwIjoxNzkzNzA3MjU4fQ.UQQ6sk9GySca8RLkGB1Zr8ejF4QufPzXo6CBXSdn0ZM";
    // Use the data directly from the testData object
    await loginPage.goto();
    await loginPage.apiLogin(userToken);
    await dashboardPage.addItemsToCart(testData.wishList);
    await dashboardPage.goToCart();
    await cartPage.verifyItems();
    await cartPage.clickCheckOut();
    await  placeorder.addCredentials(); 
    
    // ... continue with the rest of your test steps
});
