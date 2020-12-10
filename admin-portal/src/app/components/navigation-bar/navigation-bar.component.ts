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
//TODO
 logout() {
    this.loginService.logout().subscribe(
      response => {
        location.reload();
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
      },
      error => {
        this.loggedIn=false;
      }
    );
  }

}
