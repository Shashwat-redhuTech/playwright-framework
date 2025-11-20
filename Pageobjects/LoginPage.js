
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginbtn = page.locator("#login");
        // Base URL ko constructor mein store karna accha rehta hai
        this.baseURL = process.env.BASE_URL;
    }

    async goto() {
        await this.page.goto(this.baseURL);
    }

    async validLogin(userEmail, password) {
        await this.userName.fill(userEmail);
        await this.password.fill(password);
        await this.loginbtn.click();
        // UI login ke baad page navigate hone ka wait karein
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Yeh function UI ko bypass karta hai aur 
     * seedhe browser ke Local Storage mein token inject karta hai.
     */
    async apiLogin(token) {
        // Hum 'addInitScript' ka use kar rahe hain.
        // Yeh script page ke load hone se *pehle* chalti hai.
        // Isse yeh ensure hota hai ki jab website ki JS load ho,
        // usey token pehle se hi localStorage mein mil jaaye.
        await this.page.addInitScript(tokenValue => {
            window.localStorage.setItem('token', tokenValue);
        }, token); // 'token' variable ko script ke andar pass kar rahe hain

        // Ab seedhe main URL (dashboard) par jaao
        await this.page.goto(this.baseURL);
        
        // Network ke stable hone ka wait karo taaki sab kuch load ho jaaye
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };