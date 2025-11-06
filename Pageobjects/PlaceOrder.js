class PlaceOrder {
    constructor(page) {
        // FIX: Store the page object
        this.page = page; 

        // FIX: Define ALL your locators here
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.PlaceOrder = page.locator("//a[normalize-space()='Place Order']");
        this.dropdown = page.locator(".ta-results");
    }

    async addCredentials() {
        await this.selectCountry.pressSequentially("ind");

        // FIX: Use 'this.page' to access the page object
        await this.page.getByText("India", { exact: true }).click();
        
        // FIX: Use 'this.dropdown' to access the locator
        await this.dropdown.waitFor({ state: "hidden" });
        
        // FIX: Use 'this.PlaceOrder' to click the correct button locator
        await this.PlaceOrder.click();
    }
}

module.exports = { PlaceOrder };