const { test, expect } = require('@playwright/test');

let WebContext; // will hold the context created from storageState

test.beforeAll(async ({ browser }) => {
 
});




test.only("orders page", async () => {
  // create a page from the authenticated context
  const page = await WebContext.newPage();

  // navigate to dashboard (use await)
  await page.goto("https://rahulshettyacademy.com/client/dashboard/dash");

  // product you want to find and add
  const productNameToFind = "iphone 13 pro";

  const products = page.locator(".card-body");
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    const currentProduct = products.nth(i);
    const nameRaw = await currentProduct.locator("h5").textContent();
    const productName = (nameRaw || '').trim();

    // If the name matches, click Add To Cart inside the card
    if (productName === productNameToFind) {
      await currentProduct.getByRole('button', { name: 'Add To Cart' }).click();
      break; // exit loop after adding
    }
  }

  // go to cart
  const CartPage = page.locator("//button[@routerlink='/dashboard/cart']");
  await CartPage.click();
  const Checkout = page.getByRole('button',{name:"Checkout"});
  await Checkout.click();
  const selectCountry = page.getByPlaceholder("Select Country");
  selectCountry.pressSequentially("ind");
  // Store your desired country in a variable
const countryToSelect = "India";

// Use the variable inside getByText to make it dynamic
await page.getByText(countryToSelect, { exact: true }).click();
await page.getByText("Place Order").click();
const OrderConfirmation = page.locator(".hero-primary");
expect(OrderConfirmation).toHaveText("Thankyou for the order.");

});
