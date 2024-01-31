import { test, expect } from "@playwright/test";


test.skip("Product page add to basket - waitFor URL", async ({ page })=>{
   await page.goto("/")
   let buton_first =await page.locator('div:nth-child(1) > div.w-full.text-center > div.mx-6 > button')
   await buton_first.click()
   let btn_chechout =await page.locator('p.desktop-nav-link a[href="/basket"]')
   await btn_chechout.waitFor()
   await btn_chechout.click()
   //page.setDefaultTimeout(15000);  you change all the options timeOut for the all methods
   await page.waitForURL("/basket") //waitFor the URL have that path.     --30 S default
   //await page.waitForURL("/basket",{timeout: 10000}) //waitFor the URL have that path. --10 S
   //await expect(buton_first).toHaveText("Remove from Basket");
});





test.skip("Product basket- practices",async ({ page })=>{
   await page.goto("http://localhost:2221")   
   //click the fist selectors
   await page.locator('div:nth-child(1) > div.w-full.text-center > div.mx-6 > button').click();
   //click the second selectors with other method
   let btn =await page.$('div:nth-child(2) > div.w-full.text-center > div.mx-6 > button');
   await btn.click();

   //click all selectors
    let arra_btns = await page.locator('div.w-full.text-center > div.mx-6 > button').all();
   for(let elem of arra_btns){
      await elem.click();
   }    
   //click all selectors with other method
   let arra_btns_items = await page.$$('div.w-full.text-center > div.mx-6 > button');   
   for(let elem of arra_btns_items){      
      await elem.click();      
   }   
   let text = await page.locator('div[data-qa="header-basket-count"]');
   //await expect(text).toHaveText("5");    //validate the counter

   //click and wait
   let button =await page.locator('div:nth-child(1) > div.w-full.text-center > div.mx-6 > button')
   await button.waitFor()
   let enabled =await button.isEnabled();
   console.log(enabled);
   await button.click()
});