import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
  export class GetProductListService {

    constructor(private http:HttpClient) { }

    getProductList() {
      const url = "http://localhost:8080/product/productList";
      const xToken = localStorage.getItem('xAuthToken');
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'x-auth-token' : xToken || '{}'
      });

      return this.http.get(url, {headers: headers});
    }
  }
