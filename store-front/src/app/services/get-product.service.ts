import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(private http : HttpClient) { }

  getProduct(id:number) {
    const url = "http://localhost:8080/product/"+id;
    const xToken = localStorage.getItem('xAuthToken');
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : xToken || '{}'
    });

    return this.http.get(url, {headers: headers});
  }
}
