const {LoginPage} = require('./LoginPage');
const {DashBoard} = require('./DashBoard');
const {CartPage} = require('./CartPage');
const {PlaceOrder} = require('./PlaceOrder'); 

class POManager{
   constructor(page){
     this.page = page;
     this.loginPage  =   new LoginPage(this.page);
     this.dashBoard  =   new DashBoard(this.page);
     this.cartPage   =   new  CartPage(this.page);
     this.placeorder =  new PlaceOrder(this.page);
   }
   getLoginPage(){
    return this.loginPage;
   }
   getDashBoardPage(){
    return this.dashBoard;
   }
   getCartPage(){
     return this.cartPage;
   }
   getPlaceOrderPage(){
     return this.placeorder;
   }
    
}
module.exports = {POManager};