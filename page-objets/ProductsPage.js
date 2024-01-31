import { expect } from "@playwright/test";
import { NavegationPage } from "./NavegationPage.js";
import { isDesktopViewport } from "../utils/desktopViewportIdentifier";

export class ProductPage {
    constructor(page){
        this.page = page
        this.addButtons = page.locator('button[data-qa="product-button"]');
        this.sortDropdown = page.locator('select[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('div[data-qa="product-title"]'); 
        //this.visit();        
    }

    visit = async () =>{
        await this.page.goto("/");
    } 

    addProductToBasket = async(index) =>{        
        let current_btn =await this.addButtons.nth(index);
        await current_btn.waitFor()
        await expect(current_btn).toHaveText("Add to Basket")
        const navegationPage =new NavegationPage(this.page);
        //Only desktop viewport
        let beforeCounterBasket = 0 ;
        if(isDesktopViewport(this.page)){
            beforeCounterBasket =await navegationPage.getBasketCount();
        }
        await current_btn.click();
        //Only desktop viewport
        await expect(current_btn).toHaveText("Remove from Basket")
        if(isDesktopViewport(this.page)){
            const afterCounterBasket =await navegationPage.getBasketCount();
            expect(afterCounterBasket).toBeGreaterThan(beforeCounterBasket); // item value > other item value
        }
    }

    sortByCheapest = async() =>{
        await this.sortDropdown.waitFor();
        //get order of products
        await this.productTitle.first().waitFor();
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts();        
        await this.sortDropdown.selectOption("price-asc");
        const productTitleAfterSorting = await this.productTitle.allInnerTexts();
        //console.log(productTitleBeforeSorting)
        //console.log(productTitleAfterSorting)
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting);        
        //get order of products
        //expect that these lists are diferent
    

        
     }
        
}