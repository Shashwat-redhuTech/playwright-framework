// File: tests/Utils/ApiUtils.js

class ApiUtils {

    // Constructor to receive necessary data when an object is created
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
                
    async getToken() {
        // Use 'this.apiContext' and 'this.loginPayload' which were set in the constructor
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        });
        
        // It's better to just check for failure and throw an error. 
        // Assertions (expect) should ideally be in the test itself.
        if (!loginResponse.ok()) {
            throw new Error(`API login failed with status: ${loginResponse.status()}`);
        }

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log("Successfully fetched token from ApiUtils.");
        return token;
    }
}

// IMPORTANT: Export the class so other files can use it
module.exports = { ApiUtils };