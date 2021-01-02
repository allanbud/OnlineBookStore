import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {WidgetService} from '../../services/widget.service';
import {LocationService} from '../../services/location.service';
import {LoggedInService} from '../../services/logged-in.service';


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
              public widgetService: WidgetService,
              public locationService: LocationService,
              private loginService : LoginService,
              public globalLoggedIn: LoggedInService,
              public userService: UserService) { }

  logout() {
    this.loginService.logout().subscribe(
      response => {
        //TODO delete check localStorage.clear();
        localStorage.clear();
        location.reload();
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
        this.loggedIn = true;
        this.globalLoggedIn.loggedIn = this.loggedIn},
      error => {
        this.loggedIn = false;
        this.globalLoggedIn.loggedIn = false;
      }
    );
    this.locationService.getCityName();
  }




}
