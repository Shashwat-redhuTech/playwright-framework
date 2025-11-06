class DashBoard {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartButton = page.locator("button[routerlink*='cart']"); // Changed to CSS selector for consistency
    }
   
   
    async addItemsToCart(wishList) {
        // FIX: Use 'this.products' to access the class property
        const count = await this.products.count();
        
        for (let i = 0; i < count; ++i) {
            // FIX: Use 'this.products' here as well
            const currentProduct = this.products.nth(i);
            // Using a more specific locator for the product name
            const productName = await currentProduct.locator("b").textContent();

            if (wishList.includes(productName)) {
                // Using a more robust locator for the "Add To Cart" button
                await currentProduct.locator("button:last-of-type").click();
                // We can add a log here for better tracking
                console.log(`Added to cart: ${productName}`);
            }
        }
    }

    async goToCart() {
        await this.cartButton.click();
    }
}

// FIX: Export the class so it can be used in other files
module.exports = { DashBoard };