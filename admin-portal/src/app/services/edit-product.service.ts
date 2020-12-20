import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';

@Injectable()
  export class EditProductService {

    constructor(private http : HttpClient) { }

    sendProduct(product : Product) {
      let url = "http://localhost:8080/product/update";
      const xToken = localStorage.getItem('xAuthToken');
      const headers = new HttpHeaders ({
        'Content-Type': 'application/json',
        'x-auth-token' : xToken || '{}'
      });


      return this.http.post(url, JSON.stringify(product), {headers: headers});
    }

  }
