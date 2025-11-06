import { expect, test, request as apiRequest } from '@playwright/test';

// STEP 1: Import the ApiUtils class from your utility file
const { ApiUtils } = require('./Utils/ApiUtils.js');

// Global variables
let token;
const wishList = ["ZARA COAT 3", "ADIDAS ORIGINAL"];
const loginPayload = { userEmail: "codexgigas90@gmail.com", userPassword: "Rasx4@fetlife" };

test.beforeAll(async () => {
    // Create the apiContext once
    const apiContext = await apiRequest.newContext();
    
    // STEP 2: Create an INSTANCE of your ApiUtils class
    const apiUtils = new ApiUtils(apiContext, loginPayload);

    // STEP 3: Call the method to get the token  
    token = await apiUtils.getToken();
});

test.beforeEach(async ({ page }) => {
    // Inject the token before each test
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
});



test('E-commerce End-to-End Flow: Place and Verify Order', async ({ page }) => {
      // --- PART 1: ADD ITEMS AND PLACE ORDER ---
    await page.goto("https://rahulshettyacademy.com/client/dashboard/dash");
     
    const products = page.locator(".card-body");
    const cartButton = page.locator("[routerlink*='cart']");
    const ordersButton = page.getByRole('button', { name: 'ORDERS' });

    await products.first().waitFor();

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        const currentProduct = products.nth(i);
        const productName = await currentProduct.locator("h5").textContent();
        if (wishList.includes(productName)) {
            await currentProduct.getByRole('button', { name: 'Add To Cart' }).click();
        }
    }

    await cartButton.click();
    
    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
    await page.getByRole("button", { name: "Checkout" }).click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    await page.getByText("India", { exact: true }).click();
    
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText('Thankyou for the order.');

    // --- PART 2: VERIFY ORDER IN "MY ORDERS" PAGE ---
    await ordersButton.click();

    const orderRows = page.locator("tbody tr");
    await expect(orderRows.first()).toBeVisible();

    const productNamesInOrders = await page.locator("tbody tr td:nth-child(3)").allTextContents();
    
    for (const item of wishList) {
      expect(productNamesInOrders.some(name => name.trim() === item)).toBeTruthy();
    }
});

