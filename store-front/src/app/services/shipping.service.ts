import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Shipping} from '../models/shipping';

@Injectable()
export class ShippingService {


  constructor(private http : HttpClient) { }

  newShipping(shipping: Shipping) {
    const url = 'http://localhost:8080/shipping/add';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, JSON.stringify(shipping), {headers: Header, responseType: 'text'});
  }

  getUserShippingList() {
    const url = 'http://localhost:8080/shipping/getUserShippingList';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.get(url, {headers: Header, responseType: 'text'});
  }

  removeShipping(id:number){
    const url = 'http://localhost:8080/shipping/remove';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, id, {headers: Header, responseType: 'text'});
  }

  setDefaultShipping(id:number){
    const url = 'http://localhost:8080/shipping/setDefault';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, id, {headers: Header, responseType: 'text'});
  }
}
