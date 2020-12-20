import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';

@Injectable()
export class RemoveProductService {

  constructor(private http : HttpClient) { }

  sendProduct(productId : number) {
    let url = "http://localhost:8080/product/remove";
    const xToken = localStorage.getItem('xAuthToken');
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : xToken || '{}'
    });


    return this.http.post(url, productId, {headers: headers});
  }

}
