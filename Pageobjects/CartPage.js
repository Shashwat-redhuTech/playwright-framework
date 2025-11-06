import { expect } from "@playwright/test";
class CartPage{
    constructor(page){
        this.page = page;
        this.checkoutBtn = page.getByRole("button",{name:"Checkout"});
        this.priceList = page.locator("//li[contains(@class, 'items')]//div[contains(@class, 'prodTotal')]/p");
        this.totalPrice = page.locator("//li[2]//span[2]");
        }
        async verifyItems(){
              const allItemPricesText = await this.priceList.allTextContents();
               const displayedTotalText = await this.totalPrice.textContent();
               let sumOfItems = 0;
        
        for (const priceText of allItemPricesText) {
            // Clean the string: remove '$', ',', and spaces, then convert to a number
            const priceValue = Number(priceText.replace(/,|\$/g, "").trim());
            sumOfItems += priceValue;
        }
        const displayedTotalValue = Number(displayedTotalText.replace(/,|\$/g, "").trim());
        expect(sumOfItems).toEqual(displayedTotalValue);
        
        }

        async clickCheckOut(){
            await this.checkoutBtn.click();
        }
        
}
module.exports = {CartPage};