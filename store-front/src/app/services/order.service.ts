import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrderList() {
    let url = 'http://localhost:8080/order/getOrderList';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.get(url, {headers: Header, responseType: 'text'});
  }
}
