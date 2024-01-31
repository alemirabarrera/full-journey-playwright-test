import { isDesktopViewport } from "../utils/desktopViewportIdentifier";

export class NavegationPage {
    constructor(page){
        this.page = page        
        this.basketCounter = page.locator('div[data-qa="header-basket-count"]');
        this.checkOutLink = page.locator('p.desktop-nav-link a[href="/basket"]');
        this.checkOutLinkMobile = page.locator('div[data-qa="mobile-nav-drawer"] a[href="/basket"]');
        this.mobileBurgerMenuButton = page.locator('div[data-qa="burger-button"]');
    }    
    
    getBasketCount = async () =>{
        await this.basketCounter.waitFor();
        let counter = parseInt(await this.basketCounter.innerText());
        return counter;
    }
    goToCheckout = async() =>{                       
        if(isDesktopViewport(this.page)){
            await this.checkOutLink.waitFor();
            await this.checkOutLink.click();
        }else{
            //if  mobile viewport, first open the burger menu.
            await this.mobileBurgerMenuButton.waitFor();
            await this.mobileBurgerMenuButton.click();
            await this.checkOutLinkMobile.waitFor();
            await this.checkOutLinkMobile.click();
        }    
        await this.page.waitForURL("/basket")
    }    
    
}