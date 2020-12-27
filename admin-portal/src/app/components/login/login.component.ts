import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = {'username':'', 'password' : ''};
  public loggedIn = false;

  constructor(private loginService: LoginService) { }

  onSubmit() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      response => {
        var Token = JSON.parse(JSON.stringify(response)).token;
        localStorage.setItem("xAuthToken", Token);
        this.loggedIn = true;
        location.reload();
        //const encodedCredentials = btoa(this.credential.username + ':' + this.credential.password);
        //localStorage.setItem('credentials', encodedCredentials);
      },
      error => {
        console.log("onSubmit error:" + error.error);
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      response => {
        this.loggedIn=true;
        console.log("Life cicle OKEY");
      },
      error => {
        this.loggedIn=false;
        console.log("Life cicle error: " + error.error);
      }
    );
  }

}
