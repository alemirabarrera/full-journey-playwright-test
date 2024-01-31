export class MyAccountPage{
    constructor(page){
        this.page = page;
        //this.pageHeading = page.locator('h1[class="mb-6 font-bold text-xl"]');
        this.pageHeading = page.getByRole('heading', { name: 'My Account' })
        this.errorMesagge = page.locator('p[data-qa="error-message"]');

    }
    visit = async ()=>{
        await this.page.goto('/my-account');        
    }

    waitForPageHeading = async()=>{
        await this.pageHeading.first().waitFor();
    }

    waitForErrorMessage = async()=>{
        await this.errorMesagge.first().waitFor();
    }

}