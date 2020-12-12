import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  sendCredential(username: string, password: string) {
    const url = 'http://localhost:8080/token';
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders  ({
      'Content-Type' : 'application/x-www-form-urlencoded',
      Authorization : basicHeader
    });
    console.log("sendCredential Authorization: " + basicHeader);
    return this.http.get(url, {headers: headers});

  }

  checkSession() {
    const url = 'http://localhost:8080/checkSession';
    const xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'x-auth-token' : xToken || '{}',
      'Authorization' : basicHeader
    });
    //TODO delete
    console.log("checkSession Token: " + xToken);
    console.log("checkSession Authorization: " + basicHeader);
    return this.http.get(url, {headers: headers});
  }

  logout() {
    const url = 'http://localhost:8080/user/logout';
    const xToken = localStorage.getItem('xAuthToken');
    const headers = new HttpHeaders  ({
      'x-auth-token' : xToken || '{}'
    });

    return this.http.post(url, '', {headers: headers});
  }
}
