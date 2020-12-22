import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn = false;

  constructor(private loginService : LoginService) { }

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
    //this.router.navigate(['/']);
  }



  ngOnInit(): void {
    this.loginService.checkSession().subscribe(
      response => {this.loggedIn = true;},
      error => {this.loggedIn = false}
    )
  }




}
