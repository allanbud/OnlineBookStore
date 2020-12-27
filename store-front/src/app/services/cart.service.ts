import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CartService {

  constructor(private http:HttpClient) { }

  addItem(id:number, qty: number) {
    let url = 'http://localhost:8080/cart/add';
    let cartItemInfo = {
      "productId" : id,
      "qty" : qty
    }
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, cartItemInfo, {headers: Header, responseType: 'text'});
  }

  getCartItemList() {
    const url = 'http://localhost:8080/cart/getCartItemList';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.get(url, {headers: Header, responseType: 'text'});
  }

  getShoppingCart() {
    const url = 'http://localhost:8080/cart/getShoppingCart';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.get(url, {headers: Header, responseType: 'text'});
  }

  updateCartItem(cartItemId: number, qty: number) {
    const url = 'http://localhost:8080/cart/updateCartItem';
    let cartItemInfo = {
      "cartItemId" : cartItemId,
      "qty" : qty
    }
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, cartItemInfo, {headers: Header, responseType: 'text'});
  }

  removeCartItem(id: number) {
    const url = 'http://localhost:8080/cart/removeItem';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, id, {headers: Header, responseType: 'text'});
  }

}
