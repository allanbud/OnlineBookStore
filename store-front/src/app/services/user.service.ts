import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http : HttpClient) { }

  newUser(username: string, email:string) {
    let url = this.serverPath+'/user/newUser';
    let userInfo = {
      "username" : username,
      "email" : email
    }
    const xToken = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : xToken || '{}'
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers : Header});
  }

  retrievePassword(email:string) {
    let url = this.serverPath+'/user/forgetPassword';
    let userInfo = {
      "email" : email
    }
    const xToken = localStorage.getItem('xAuthToken');
    let Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : xToken || '{}'
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers : Header});
  }

}


