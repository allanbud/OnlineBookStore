import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Payment} from '../models/payment';
//import {ShippingAddress} from '../models/shipping-address';
//import {BillingAddress} from '../models/billing-address';

@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkout(
//    shippingAddress: ShippingAddress,
//    billingAddress: BillingAddress,
    payment: Payment,
    shippingMethod: string
  ){
    let url = 'localhost:8080/checkout/checkout';
    let order ={
//      "shippingAddress" : shippingAddress,
//      "billingAddress" : billingAddress,
      "payment" : payment,
      "shippingMethod" : shippingMethod
    }
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, order, {headers: Header, responseType: 'text'});
  }

  getUserOrder() {
    let url = 'localhost:8080/checkout/getUserOrder';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.get(url, {headers: Header, responseType: 'text'});

  }

}
