import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {


  loggedIn = false;

  constructor(private loginService : LoginService) { }

  toggleDisplay() {
	  this.loggedIn= !this.loggedIn;
  }

 logout() {
    this.loginService.logout().subscribe(
      response => {
        //TODO delete
        localStorage.clear();
        location.reload();
        console.log("Navigation Bar localStorage: " + localStorage.getItem('xAuthToken'));
        console.log("Navigation Bar Login State: " + this.loggedIn);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      response => {
        this.loggedIn=true;
        console.log("Navigation Bar OnInit: " + this.loggedIn);
      },
      error => {
        this.loggedIn=false;
      }
    );
  }

}
