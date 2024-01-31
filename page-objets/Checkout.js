import { expect} from "@playwright/test"

export class Checkout {
    constructor(page){
        this.page = page  
        this.basketCards = page.locator('div[data-qa="basket-card"]');  //cards
        this.basketPrices = page.locator('div[data-qa="basket-item-price"]');  //prices
        this.buttonRemoveItem = page.locator('button[data-qa="basket-card-remove-item"]');  //button to remove      
        this.continueToCheckoutButton = page.locator('button[data-qa="continue-to-checkout"]');  //button to continue
    }     

    
    removeCheapestProduct = async() =>{                                        
        await this.basketCards.first().waitFor();
        const itemsBeforeRemove = await this.basketCards.count();
        await this.basketPrices.first().waitFor();
        const all_pricesText = await this.basketPrices.allInnerTexts();        
        const all_princes_numbers =all_pricesText.map(elem =>{
            elem = elem.replace("$","");
            elem =parseInt(elem)
            return elem;            
        })
        //console.log(all_princes_numbers);
        //const smallestPrinces = Math.min.apply(Math, all_princes_numbers);
        const smallestPrinces = Math.min(...all_princes_numbers);
        const smallIndex =all_princes_numbers.indexOf(smallestPrinces);                 
        await this.buttonRemoveItem.nth(smallIndex).waitFor();
        await this.buttonRemoveItem.nth(smallIndex).click();        
        await expect(this.basketCards).toHaveCount(itemsBeforeRemove-1);    
    }     

    continuesToChechout = async ()=>{
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 3000});
    }

    
}