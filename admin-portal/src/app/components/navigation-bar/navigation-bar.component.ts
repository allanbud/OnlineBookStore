import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

	
  loggedIn = false;
	
  constructor() { }
	
  toggleDisplay() {
	  this.loggedIn= !this.loggedIn;
  }	

  ngOnInit(): void {
  }

}
