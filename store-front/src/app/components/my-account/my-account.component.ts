import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public loginError:boolean = false;
  public loggedIn = false;
  public credential = {'username':'', 'password':''};

  public emailSent: boolean =false;
  public usernameExists:boolean;
  public emailExists:boolean;
  public username:string;
  public email:string;

  public emailNotExists: boolean =false;
  public forgetPasswordEmailSent: boolean;
  public recoverEmail:string;

  constructor(
    public loginService: LoginService,
    public userService: UserService,
    public router: Router
  ) { }

  onLogin() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      response => {
        console.log(response);
        localStorage.setItem("xAuthToken", JSON.stringify(response));
        this.loggedIn = true;
        location.reload();
        this.router.navigate(['/home']);
      },
      error => {
        this.loggedIn = false;
        this.loginError = true;
      }
    );
  }


  onSubmit() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      response => {
        localStorage.setItem("xAuthToken", JSON.stringify(response));
        this.loggedIn = true;
        location.reload();
        const encodedCredentials = btoa(this.credential.username + ':' + this.credential.password);
        localStorage.setItem('credentials', encodedCredentials);
        //TODO delete
        console.log("onSubmit setItem " + localStorage.getItem('xAuthToken'));
        console.log("onSubmit JSON " + JSON.stringify(response));
      },
      error => {
        console.log("onSubmit error:" + error);
      }
    );
  }


  onNewAccount() {
    this.usernameExists = false;
    this.emailExists = false;
    this.emailSent = false;

    this.userService.newUser(this.username, this.email).subscribe(
      response => {
        console.log("OnNewAccount: " + response);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage==="usernameExists") this.usernameExists=true;
        if(errorMessage==="emailExists") this.emailExists=true;
      }
    );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;

    this.userService.retrievePassword(this.recoverEmail).subscribe(
      response => {
        console.log("onForgetPassword: " + response);
        this.forgetPasswordEmailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage==="Email not found") this.emailNotExists=true;
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
        console.log("Life cicle error: " + error);
      }
    );
  }

}
