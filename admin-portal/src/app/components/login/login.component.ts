import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

// once html typed in values will be binded to username and paasword variables
private credential = {'username':'', 'password' : ''};
private loggedIn = false;
	
	
constructor(private loginService: LoginService) { }
	
//when username and pasword has been subbmitted	match this method up with submitt function in html code
  onSubmit() {
//call subscribe to http to be commited	  
  	this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
//response 1 for successful result gonna send 	xAuthToken
  		res => {
  			console.log(res);
  			localStorage.setItem("xAuthToken", res.json().token);
			//flag login state true
  			this.loggedIn = true;
  			location.reload();
  		},
//response 2 for error			
  		error => {
  			console.log(error);
  		}
  	);
  }

	
	
	
	
	
	

  ngOnInit(): void {
  }

}
