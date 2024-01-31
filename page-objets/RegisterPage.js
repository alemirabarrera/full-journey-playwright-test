export class RegisterPage{
    constructor(page){
        this.page = page;
        this.emailInput =  page.locator('input[placeholder="E-Mail"]');
        this.passwordInput = page.locator('input[placeholder="Password"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    singUpAsNewUser = async(email, password) =>{
        await this.emailInput.waitFor();   
        await this.emailInput.fill(email); 
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
        await this.registerButton.waitFor();
        await this.registerButton.click();        
    }
}