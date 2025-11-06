import {expect, test} from '@playwright/test';




const loginPayload = { userEmail: "codexgigas90@gmail.com", userPassword: "Rasx4@fetlife" };

test.beforeAll(async ({ request }) => {
  const apiContext = await request.newContext();
 const loginResponse =   await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginPayload
  });
  expect(loginResponse.ok()).toBeTruthy();
const loginResponseJson = await loginResponse.json();
const token = loginResponseJson.token;
});

// eccommerce end to end flow
test.only('Page eccommerce test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
     const loginbtn = page.locator("#login");
    const wishList = ["ZARA COAT 3", "ADIDAS ORIGINAL"];
    const products = page.locator(".card-body");
    const cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
    // const checkOut = page.locator("//button[normalize-space()='Checkout']");
    const checkOut = page.getByRole("button",{name:"Checkout"});
    const selectCountry = page.locator("//input[@placeholder='Select Country']");
    await userName.fill("codexgigas90@gmail.com");
    await password.fill("Rasx4@fetlife");
    await loginbtn.click();
 
    // Wait for products to be visible after login
    await page.waitForLoadState('networkidle');

    // --- Logic to Add Wishlist Items to Cart ---

    // 1. Get all the product card elements
    // !! REPLACE ".card-body" with your main product container locator !!
   
    const count = await products.count();
    // 2. Loop through all the products
    for (let i = 0; i < count; ++i) {
        const currentProduct = products.nth(i);
        // Get the product name text from within the current product card
        const productName = await currentProduct.locator("h5").textContent();

        // 3. Check if the product name is in your wishlist
        if (wishList.includes(productName)) {
            // 4. If it matches, click the "Add To Cart" button within that same product card
            // !! REPLACE "text=Add To Cart" with your button locator !!
            await currentProduct.locator("text=Add To Cart").click();
        }
    }
    
   await  cartButton.click();
   
    await  checkOut.click();
    await  selectCountry.pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    const placeOrder = page.locator("//a[normalize-space()='Place Order']");
    await dropdown.waitFor();
  

// This will find the element with the EXACT text "India" and click it.
   await page.getByText("India", { exact: true }).click();



     await dropdown.waitFor({ state: "hidden" });
     await placeOrder.click();

const thankYouYourorder = page.locator("//h1[normalize-space()='Thankyou for the order.']");
// exact match
await expect(thankYouYourorder).toHaveText('Thankyou for the order.');


});






// test.only('test', async ({ page }) => {
//   await page.goto('https://rahulshettyacademy.com/');
//   await page.getByRole('link', { name: 'Courses', exact: true }).click();
//   await page.locator('#heap_product-card-cta_890613').click();
//   await page.goto('https://courses.rahulshettyacademy.com/p/mentorship-rahul-shetty');
//   await page.getByText('Select Mentorship Package').click();
//   await page.getByRole('button', { name: 'Enroll and Get Connected with' }).click();
// })



// test('hover utils', async({page})=>{
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

// // await page.goto("http://google.com");
// // await page.goBack();
// // await page.goForward();

// await expect(page.locator("#displayed-text")).toBeVisible();
// await page.locator("#hide-textbox").click();
// await expect(page.locator("#displayed-text")).toBeHidden();
// await page.pause();
// page.on('dialog',dialog => dialog.accept());
// await page.locator("#confirmbtn").click();
// await page.locator("#mousehover").hover();
// })


