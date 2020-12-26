import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {LoginService} from '../../services/login.service';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';
import {Payment} from '../../models/payment';
import {Billing} from '../../models/billing';
import {PaymentServiceService} from '../../services/payment-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

  export class MyProfileComponent implements OnInit {

  panelOpenState = false;

  public dataFetched = false;
  public loginError:boolean;
  public loggedIn:boolean;
  public credential = {'username':'', 'password':''};

  public user: User = new User();
  public updateSuccess: boolean;
  public newPassword: string;
  public currentPassword: string;
  public incorrectPassword: boolean;

  public selectedProfileTab: number = 0;
  public selectedBillingTab : number = 0
  public userPayment: Payment = new Payment();
  public userBilling: Billing = new Billing();
  public userPaymentList: Payment[] =[];
  public defaultPaymentSet: boolean;
  public defaultUserPaymentId: number;


  constructor(
    private router: Router,
    private paymentService: PaymentServiceService,
    private loginService: LoginService,
    public userService: UserService
  ) { }

  selectedBillingChange(value: number) {
    this.selectedBillingTab = value;
  }


  onUpdateUserInfo () {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      response => {
        console.log(response);
        this.updateSuccess=true;
      },
      error => {
        console.log(error.error);
        var errorMessage = error.error;
        if(errorMessage==="Incorrect current password!") this.incorrectPassword=true;
      }
    );
  }

  getCurrentUserStatus() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.user = JSON.parse(response);
        this.dataFetched = true;
      },
      error => {
        console.log(error.error);
      }
    );
  }



  //Billing and Payments

  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      response => {
        this.getCurrentUserStatus();
        this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.error);
      }
    );
  }
  onUpdatePayment (payment: Payment) {
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  onRemovePayment(id:number) {
    this.paymentService.removePayment(id).subscribe(
      response => {
        this.getCurrentUserStatus();
      },
      error => {
        console.log(error.error);
      }
    );
  }

  setDefaultPayment() {
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      response => {
        this.getCurrentUserStatus();
        this.defaultPaymentSet = true;
      },
      error => {
        console.log(error.error);
      }
    );
  }

  //initializing
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

    this.getCurrentUserStatus();

    this.userPayment.type="";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet = false;

  }



}
