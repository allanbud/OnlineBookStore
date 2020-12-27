import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductList() {
    const url = 'http://localhost:8080/product/productList';
    const Token = localStorage.getItem('xAuthToken');
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': Token!
    });
    return this.http.get(url, {headers: tokenHeader, responseType: 'text'});
  }

  getProduct(id: number) {
    const url = 'http://localhost:8080/product/' + id;
    const Token = localStorage.getItem('xAuthToken');
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': Token!
    });
    return this.http.get(url, {headers: tokenHeader, responseType: 'text'});
  }

  searchProduct(keyword: string) {
    const url = 'http://localhost:8080/product/searchProduct';
    const Token = localStorage.getItem('xAuthToken');
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': Token!
    });
    return this.http.post(url, keyword, {headers: tokenHeader, responseType: 'text'});
  }

}
