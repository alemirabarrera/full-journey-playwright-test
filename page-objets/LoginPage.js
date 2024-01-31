export class LoginPage{
    constructor(page){
        this.page = page;
        this.buttonRegister = page.locator('button[data-qa="go-to-signup-button"]');
    }
    moveToSingup= async () =>{
        await this.buttonRegister.waitFor();
        await this.buttonRegister.click();
        await this.page.waitForURL(/\/signup/, {timeout: 3000});    
    }
}
