import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductList() {
    const url = 'http://localhost:8080/product/productList';
    let Header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, {headers: Header, responseType: 'text'});
  }



  getProduct(id: number) {
    const url = 'http://localhost:8080/product/' + id;
    let Header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, {headers:Header, responseType: 'text'});
  }

  searchProduct(keyword: string) {
    const url = 'http://localhost:8080/product/searchProduct';
    const Token = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, keyword, {headers: Header, responseType: 'text'});
  }

}
