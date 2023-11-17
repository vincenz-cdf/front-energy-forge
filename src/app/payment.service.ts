import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { AxiosService } from './axios.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  //pk_test_51OD65nBYeCrNLX32ORnZ8RGweEoN6IlqhxFXSP2JEWnrQuW4cpASxiUn1TE7Gh9QuZeyaNfOt8nOX8KmJprXIBYm00wHtzerlJ
  stripePromise = loadStripe('pk_test_51OD65nBYeCrNLX32ORnZ8RGweEoN6IlqhxFXSP2JEWnrQuW4cpASxiUn1TE7Gh9QuZeyaNfOt8nOX8KmJprXIBYm00wHtzerlJ');

  constructor(private axiosService: AxiosService, private errorService: ErrorService) { }

  async handleCheckout(price: number, qty: number) {
    const stripe = await this.stripePromise;
  
    // Call your backend to create a session
    this.createCheckoutSession(price, qty).then(async (sessionId) => {
      const result = await stripe!.redirectToCheckout({
        sessionId: sessionId.data
      });
  
      if (result.error) {
        this.errorService.notifyError(result.error);
      }
    }, error => {
      this.errorService.notifyError(error);
    });
  }
  

  createCheckoutSession(price: any, qty: any) {
    return this.axiosService.request("POST", "/create-checkout-session", {'price': price, 'qty': qty});
  }
  
}
