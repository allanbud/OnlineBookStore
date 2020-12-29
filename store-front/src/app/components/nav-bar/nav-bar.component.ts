import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn = false;
  public isAdmin = false;
  public user: User = new User();

  constructor(private router : Router,
              private loginService : LoginService,
              public userService: UserService) { }

  logout() {
    this.loginService.logout().subscribe(
      response => {
        //TODO delete check localStorage.clear();
        localStorage.clear();
        location.reload();
        console.log("Navigation Bar localStorage: " + localStorage.getItem('xAuthToken'));
        console.log("Navigation Bar Login State: " + this.loggedIn);
      },
      error => {
        console.log(error);
      }
    );
    //after logout
    this.router.navigate(['/']);
  }

  getCurrentUserStatus() {
    this.userService.getCurrentUser().subscribe(
      response => {
        if (response.includes("ROLE_ADMIN"))
        {this.isAdmin = true}
      },
      error => {
        console.log(error.error);
      }
    );
  }


  ngOnInit(): void {
    this.loginService.checkSession().subscribe(
      response => {
        this.getCurrentUserStatus();
        this.loggedIn = true;},
      error => {this.loggedIn = false}
    )
  }




}
