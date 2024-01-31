import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objets/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { userDetails } from "../data/userDetails";


test.only('My account using cokie injection and mocking network request', async({ page }) =>{
    const {username, password} =userDetails;
    let loginToken = await getLoginToken(username, password);    
    await page.route("**/api/user**", async (route, request)=>{
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    });

    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
    await page.pause();
    await page.evaluate((tokenInsideBrowserCode)=>{        
        document.cookie = "token="+tokenInsideBrowserCode;
    }, loginToken)
    await myAccount.visit();
    await myAccount.waitForPageHeading();
    await myAccount.waitForErrorMessage();        
}) 