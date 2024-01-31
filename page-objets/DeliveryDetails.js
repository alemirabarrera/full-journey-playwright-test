import { expect } from "@playwright/test"; 

export class DeliveryDetails{
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First name');
        this.lastNameInput = page.getByPlaceholder('Last name');
        this.streetInput = page.getByPlaceholder('Street');
        this.postCodeInput = page.getByPlaceholder('Post code');
        this.cityInput = page.getByPlaceholder('City');
        this.countryDropdown = page.getByRole('combobox');
        this.textAreaSavedData = page.locator('div[data-qa="saved-address-container"]'); 
        this.saveAdressButton = page.locator('button[data-qa="save-address-button"]');
        this.continuePaymentButton = page.locator('button[data-qa="continue-to-payment-button"]');
        
        //Text saved on the textArea
        this.saveAdressFirstName = page.locator('p[data-qa="saved-address-firstName"]');
        this.saveAdressLastName = page.locator('p[data-qa="saved-address-lastName"]');
        this.saveAdressStreet = page.locator('p[data-qa="saved-address-street"]');
        this.saveAdressPostCode = page.locator('p[data-qa="saved-address-postcode"]');
        this.saveAdressCity = page.locator('p[data-qa="saved-address-city"]');
        this.saveAdressCountry = page.locator('p[data-qa="saved-address-country"]');
    }

    fillDetails =async(delivaryDetails) =>{
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(delivaryDetails.firstName);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(delivaryDetails.lastName);
        await this.streetInput.waitFor();
        await this.streetInput.fill(delivaryDetails.street);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(delivaryDetails.postCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(delivaryDetails.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption(delivaryDetails.countryDropdown);                
    }

    saveDetails = async ()=>{
        const addressCountBeforeSaving = await this.textAreaSavedData.count();
        await this.saveAdressButton.waitFor();
        await this.saveAdressButton.click();
        await this.textAreaSavedData.waitFor();        
        await expect(this.textAreaSavedData).toHaveCount(addressCountBeforeSaving+1);
        await this.saveAdressFirstName.first().waitFor();
        expect(await this.saveAdressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
        await this.saveAdressLastName.first().waitFor();
        expect(await this.saveAdressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());
        await this.saveAdressStreet.first().waitFor();
        expect(await this.saveAdressStreet.first().innerText()).toBe(await this.streetInput.inputValue());
        await this.saveAdressPostCode.first().waitFor();
        expect(await this.saveAdressPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue());
        await this.saveAdressCity.first().waitFor();
        expect(await this.saveAdressCity.first().innerText()).toBe(await this.cityInput.inputValue());
        await this.saveAdressCountry.first().waitFor();   
        expect(await this.saveAdressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());

        /* await this.continuePaymentButton.waitFor();
        await this.continuePaymentButton.click();  */        
    }

    continueToPayment = async () =>{
        await this.continuePaymentButton.waitFor();
        await this.continuePaymentButton.click();
        await this.page.waitForURL(/\/payment/, {timeout: 3000});              
    }
}