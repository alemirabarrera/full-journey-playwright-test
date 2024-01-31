import { expect } from "@playwright/test";

export class PaymentPage{
    constructor(page){
        this.page = page;
        this.iframeDiscount = page.frameLocator('iframe[data-qa="active-discount-container"]');
        this.discountCodeLabel = this.iframeDiscount.locator('p[data-qa="discount-code"]');
        this.discountCodeInput = page.locator('input[data-qa="discount-code-input"]');
        this.activateDiscountButton = page.locator('button[data-qa="submit-discount-button"]');
        this.discountMessageActivated = page.locator('p[data-qa="discount-active-message"]');
        this.totalValueLabel = page.locator('[data-qa="total-value"]');
        this.totalWithDiscountLabel = page.locator('[data-qa="total-with-discount-value"]');

        this.creditCarOwner =page.locator('[data-qa="credit-card-owner"]');
        this.creditCarNumber =page.locator('[data-qa="credit-card-number"]');
        this.validUntil =page.locator('[data-qa="valid-until"]');
        this.creditCarCvc =page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('button[data-qa="pay-button"]');
    }

    activateDiscount= async()=>{        
        await this.discountCodeLabel.waitFor();
        const discountCode = await this.discountCodeLabel.innerText();
        //option 1 for laggy inputs: using fill() with await expect
        await this.discountCodeInput.waitFor();
        await expect(this.discountCodeInput).toHaveValue('');
        await this.discountCodeInput.fill(discountCode);        
        await expect(this.discountCodeInput).toHaveValue(discountCode);        

    /*  //option 2 for laggy inputs: Slow typing
        await this.discountCodeInput.focus();
        await this.page.keyboard.type(discountCode, {delay: 1000});
        expect(await this.discountCodeInput.inputValue()).toBe(discountCode);
        await this.page.pause(); */       

        //expect(await this.discountMessageActivated.isVisible()).toBe(false); //isVisible return true or false you can make a expect with that.
        await expect(this.discountMessageActivated).toBeHidden();
        await expect(this.totalWithDiscountLabel).toBeHidden();

        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();

        await this.discountMessageActivated.waitFor(); //if the element doesn't exist that code break
        //await expect(this.discountMessageActivated).toBeVisible();
        await expect(this.discountMessageActivated).toContainText("Discount activated!");

        await this.totalWithDiscountLabel.waitFor(); //if the element doesn't exist that code break
        //await expect(this.totalWithDiscountLabel).toBeVisible(); 

        await this.totalValueLabel.waitFor();       
        let total = await this.totalValueLabel.innerText();
        total = parseInt(total.replace('$','').trim());
        let totalWithDiscount = await this.totalWithDiscountLabel.innerText();
        totalWithDiscount = parseInt(totalWithDiscount.replace('$','').trim());
        expect(totalWithDiscount).toBeLessThan(total);
        //expect(this.totalValueLabel).toBeGreaterThan();
        //check that it displays "Discount activeted"
        //check that there is now a discounted prices total showing.
        //check that the discounted price total is smaller than the regular one

    }


    fillPaymentDetails = async(paymentDetails) =>{
        await this.creditCarOwner.waitFor();
        await this.creditCarOwner.fill(paymentDetails.creditCarOwner);
        await this.creditCarNumber.waitFor();
        await this.creditCarNumber.fill(paymentDetails.creditCarNumber);
        await this.validUntil.waitFor();
        await this.validUntil.fill(paymentDetails.validUntil);
        await this.creditCarCvc.waitFor();
        await this.creditCarCvc.fill(paymentDetails.creditCarCvc);

    }

    completePayment = async()=>{
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000});
    }
}