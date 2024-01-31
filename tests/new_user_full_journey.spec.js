import {test } from "@playwright/test"
import { v4 as uuidv4 } from 'uuid';
import { ProductPage } from  "../page-objets/ProductsPage.js"
import { NavegationPage } from "../page-objets/NavegationPage.js";
import { Checkout } from "../page-objets/Checkout.js"; 
import { LoginPage } from "../page-objets/loginPage.js";
import { RegisterPage } from "../page-objets/RegisterPage.js";
import { DeliveryDetails } from "../page-objets/DeliveryDetails.js";
import { delivaryDetails as delivaryDetailsData} from "../data/delivaryDetails";
import { PaymentPage } from '../page-objets/PaymentPage.js';
import { paymentDetails } from "../data/paymentDetails.js";

test("New User full end-to-end test journey", async ({page})=>{    
    const productPage = new ProductPage(page);
    await productPage.visit();
    await productPage.sortByCheapest();
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    const navegationPage = new NavegationPage(page);
    await navegationPage.goToCheckout();        
    
    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct(); 
    await checkout.continuesToChechout();
    
    const loginPage = new LoginPage(page);
    await loginPage.moveToSingup();

    const registerPage = new RegisterPage(page);
    const emailId = uuidv4();     
    const email= `test-${emailId}@gmail.com`;
    const password= 'pasw123456789';
    await registerPage.singUpAsNewUser(email, password);

    const deliveryDetails = new DeliveryDetails(page);
    await deliveryDetails.fillDetails(delivaryDetailsData);
    await deliveryDetails.saveDetails();
    await deliveryDetails.continueToPayment();

    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillPaymentDetails(paymentDetails);
    await paymentPage.completePayment();

})