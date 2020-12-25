

import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {LoginService} from '../../services/login.service';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

  export class MyProfileComponent implements OnInit {


  public dataFetched = false;
  public loginError:boolean;
  public loggedIn:boolean;
  public credential = {'username':'', 'password':''};

  public user: User = new User();
  public updateSuccess: boolean;
  public newPassword: string;
  public currentPassword: string;
  public incorrectPassword: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  onUpdateUserInfo () {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      response => {
        console.log(response);
        this.updateSuccess=true;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage==="Incorrect current password!") this.incorrectPassword=true;
      }
    );
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.user = JSON.parse(JSON.stringify(response));
        this.dataFetched = true;
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit() {
    this.loginService.checkSession().subscribe(
      response => {
        this.loggedIn = true;
        console.log("My Profile Session is Active!");
      },
      error => {
        this.loggedIn = false;
        console.log("My Profile Session is inactive");
        this.router.navigate(['/myAccount']);
      }
    );
    this.getCurrentUser();
  }

}