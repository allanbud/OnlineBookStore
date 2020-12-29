import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {LoginService} from '../../services/login.service';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';
import {Payment} from '../../models/payment';
import {Billing} from '../../models/billing';
import {PaymentServiceService} from '../../services/payment-service.service';
import {Shipping} from '../../models/shipping';
import {ShippingService} from '../../services/shipping.service';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';



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

  public isAdmin: boolean = false;

  public selectedProfileTab: number = 0;
  public selectedBillingTab : number = 0
  public selectedShippingTab : number =0;

  public userPayment: Payment = new Payment();
  public userBilling: Billing = new Billing();
  public userPaymentList: Payment[] =[];
  public defaultPaymentSet: boolean;
  public defaultUserPaymentId: number;

  public userShipping: Shipping = new Shipping();
  public userShippingList: Shipping[] = [];

  public defaultUserShippingId: number;
  public defaultShippingSet: boolean;

  private orderList: Order[] = [];
  private order:Order = new Order();
  private displayOrderDetail:boolean;



  constructor(
    public router: Router,
    public paymentService: PaymentServiceService,
    public loginService: LoginService,
    public userService: UserService,
    public shippingService: ShippingService,
    private orderService: OrderService
  ) { }

  selectedBillingChange(val: number) {
    this.selectedBillingTab = val;
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
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList;

        for (let index in this.userPaymentList) {
          if(this.userPaymentList[index].defaultPayment) {
            this.defaultUserPaymentId=this.userPaymentList[index].id;
            break;
          }
        }

        for (let index in this.userShippingList) {
          if(this.userShippingList[index].userShippingDefault) {
            this.defaultUserShippingId=this.userShippingList[index].id;
            break;
          }
        }

        if (this.user.authorities = "ROLE_ADMIN") {this.isAdmin = true}


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

  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      response => {
        this.getCurrentUserStatus();
        this.selectedShippingTab=0;
        this.userShipping = new Shipping();
      },
      error => {
        console.log(error.error);
      }
    );
  }

  onUpdateShipping(shipping: Shipping) {
    this.userShipping = shipping;
    this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number) {
    this.shippingService.removeShipping(id).subscribe(
      response => {
        this.getCurrentUserStatus();
      },
      error => {
        console.log(error.error);
      }
    );
  }

  setDefaultShipping() {
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      response => {
        this.getCurrentUserStatus();
        this.defaultShippingSet = true;
      },
      error => {
        console.log(error.error);
      }
    );
  }

  onDisplayOrder(order: Order) {
    console.log(order);
    this.order=order;
    this.displayOrderDetail=true;
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

    this.orderService.getOrderList().subscribe(
      response => {
        this.orderList = JSON.parse(response);
      },
      error => {
        console.log(error.error);
      }
    );

    this.userPayment.type="";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet = false;

    this.defaultShippingSet=false;


  }



}
