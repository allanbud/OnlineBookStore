import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Payment} from '../models/payment';

@Injectable()
export class PaymentServiceService {

  constructor(private http : HttpClient) { }

  newPayment(payment: Payment) {
    const url = 'http://localhost:8080/payment/add';
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : JSON.stringify(Token)
    });
    return this.http.post(url, JSON.stringify(payment), {headers: Header, responseType: 'text'});
  }

  getUserPaymentList() {
    const url = 'http://localhost:8080/payment/getUserPaymentList';
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : JSON.stringify(Token)
    });
    return this.http.get(url,  {headers: Header, responseType: 'text'});
  }

  removePayment(id: number) {
    const url = 'http://localhost:8080/payment/remove';
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : JSON.stringify(Token)
    });
    return this.http.post(url, id, {headers: Header, responseType: 'text'});
  }

  setDefaultPayment (id: number) {
    const url = 'http://localhost:8080/payment/setDefault';
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : JSON.stringify(Token)
    });
    return this.http.post(url, id, {headers: Header, responseType: 'text'});
  }
}
