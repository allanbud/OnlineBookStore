import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AddProductService {

  constructor(private http : HttpClient) { }

  sendProduct(product : Product) {
    const url = "http://localhost:8080/product/add";
    const xToken = localStorage.getItem('xAuthToken');
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : xToken || '{}'
    });

    return this.http.post(url, JSON.stringify(product), {headers: headers});
  }

}
