import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http : HttpClient, private router : Router) { }

  sendCredential(username: string, password: string) {
    const url = 'http://localhost:8080/token';
    var encodedCredentials = btoa(username + ':' + password);
    var basicHeader = 'Basic ' + encodedCredentials;
    var headers = new HttpHeaders  ({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
    });
    return this.http.get(url, {headers: headers});
  }


  checkSession() {
    var url = 'http://localhost:8080/checkSession';
    var Token = localStorage.getItem('xAuthToken');
    var basicHeader = 'Basic ' + localStorage.getItem('credentials');
    var headers = new HttpHeaders({
      'x-auth-token' : JSON.parse(JSON.stringify(Token)),
      'Authorization' : basicHeader
    });
    console.log(headers);
    return this.http.get(url, {headers: headers});
  }

  logout() {
    var url = 'http://localhost:8080/user/logout';
    var Token = localStorage.getItem('xAuthToken');
    var headers = new HttpHeaders  ({
      'x-auth-token' : JSON.parse(JSON.stringify(Token)),
    });
    return this.http.post(url, '', {headers: headers});
  }

}
