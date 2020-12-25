import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {JavaScriptEmitter} from '@angular/compiler/src/output/js_emitter';

@Injectable()
export class UserService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http : HttpClient) { }

  newUser(username: string, email:string) {
    const url = 'http://localhost:8080/user/newUser';
    var userInfo = {
      "username" : username,
      "email" : email
    }
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers : Header});
  }

  retrievePassword(email:string) {
    const url = 'http://localhost:8080/user/forgetPassword';
    var userInfo = {
      "email" : email
    }
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : JSON.stringify(Token)
    });

    var body = JSON.stringify(userInfo);

    return this.http.post(url, body, {headers : Header/*, responseType: 'text'*/});
  }

  //need CURRENT password not just user password
  updateUserInfo(user: User, newPassword: string, currentPassword: string) {
    const url = 'http://localhost:8080/user/updateUserInfo';
    var userInfo = {
      "id" : user.id,
      "firstName" : user.firstName,
      "lastName" : user.lastName,
      "username" : user.username,
      //need CURRENT password not just user password
      "currentPassword" : currentPassword, //user.password,
      "email" : user.email,
      "newPassword" : newPassword
    };
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });
    return this.http.post(url, JSON.stringify(userInfo), {headers : Header , responseType: 'text'});
  }


  getCurrentUser() {
    var url = 'http://localhost:8080/user/getCurrentUser';
    const Token = localStorage.getItem('xAuthToken');
    var Header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : Token!
    });

    return this.http.get(url, {headers : Header, responseType: 'text'});
  }

}


