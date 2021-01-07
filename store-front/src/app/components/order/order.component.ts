import { Component, OnInit } from '@angular/core';
import {ShoppingCart} from '../../models/shopping-cart';
import {CartItem} from '../../models/cart-item';
import {Product} from '../../models/product';
import {ShippingAddress} from '../../models/shipping-address';
import {BillingAddress} from '../../models/billing-address';
import {Payment} from '../../models/payment';
import {Order} from '../../models/order';
import {CartService} from '../../services/cart.service';
import {ShippingService} from '../../services/shipping.service';
import {CheckoutService} from '../../services/checkout.service';
import {NavigationExtras, Router} from '@angular/router';
import {UserPayment} from '../../models/user-payment';
import {UserShipping} from '../../models/user-shipping';
import {UserBilling} from '../../models/user-billing';
import {PaymentServiceService} from '../../services/payment-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public selectedProduct: Product;
  public cartItemList: CartItem[] = [];
  public cartItemNumber: number;
  public shoppingCart: ShoppingCart = new ShoppingCart();
  public cartItemUpdated:boolean;
  public shippingAddress:ShippingAddress=new ShippingAddress();
  public billingAddress:BillingAddress = new BillingAddress();
  public userPayment:UserPayment = new UserPayment();
  public userShipping:UserShipping = new UserShipping();
  public userBilling: UserBilling = new UserBilling();
  public userShippingList: UserShipping[] = [];
  public userPaymentList: UserPayment[] = [];
  public payment: Payment = new Payment();
  public selectedTab: number;
  public emptyShippingList: boolean = true;
  public emptyPaymentList: boolean = true;
  public stateList: string[] = [];
  public shippingMethod:string;
  public order:Order = new Order();

  constructor(
    public router:Router,
    public cartService: CartService,
    public shippingService: ShippingService,
    public paymentService: PaymentServiceService,
    public checkoutService: CheckoutService
  ) { }

  onSelect(product:Product) {
    this.selectedProduct = product;
    this.router.navigate(['/productDetail', this.selectedProduct.id]);
  }

  selectedChange(val :number ){
    this.selectedTab=val;
  }

  goToPayment() {
    this.selectedTab=1;
  }

  goToReview() {
    this.selectedTab=2;
  }

  getCartItemList(){
    this.cartService.getCartItemList().subscribe(
      response=>{
        this.cartItemList = JSON.parse(response);
        this.cartItemNumber = this.cartItemList.length;
      },
      error=>{
        console.log(error.text());
      }
    );
  }

  setShippingAddress(userShipping: UserShipping) {
    this.shippingAddress.shippingAddressName = userShipping.userShippingName;
    this.shippingAddress.shippingAddressStreet = userShipping.userShippingStreet;
    this.shippingAddress.shippingAddressCity = userShipping.userShippingCity;
    this.shippingAddress.shippingAddressCountry = userShipping.userShippingCountry;
    this.shippingAddress.shippingAddressZipcode = userShipping.userShippingZipcode;
  }

  setPaymentMethod(userPayment: UserPayment) {
    this.payment.type = userPayment.type;
    this.payment.cardNumber = userPayment.cardNumber;
    this.payment.expiryMonth = userPayment.expiryMonth;
    this.payment.expiryYear = userPayment.expiryYear;
    this.payment.cvc = userPayment.cvc;
    this.payment.holderName = userPayment.holderName;
    this.payment.defaultPayment = userPayment.defaultPayment;
    this.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
    this.billingAddress.billingAddressStreet = userPayment.userBilling.userBillingStreet;
    this.billingAddress.billingAddressCity = userPayment.userBilling.userBillingCity;
    this.billingAddress.billingAddressCountry = userPayment.userBilling.userBillingCountry;
    this.billingAddress.billingAddressZipcode = userPayment.userBilling.userBillingZipcode;
  }

  setBillingAsShipping(checked:boolean){
    console.log("same as shipping")

    if(checked) {
      this.billingAddress.billingAddressName = this.shippingAddress.shippingAddressName;
      this.billingAddress.billingAddressStreet = this.shippingAddress.shippingAddressStreet;
      this.billingAddress.billingAddressCity = this.shippingAddress.shippingAddressCity;
      this.billingAddress.billingAddressCountry = this.shippingAddress.shippingAddressCountry;
      this.billingAddress.billingAddressZipcode = this.shippingAddress.shippingAddressZipcode;
    } else {
      this.billingAddress.billingAddressName = "";
      this.billingAddress.billingAddressStreet = "";
      this.billingAddress.billingAddressCity = "";
      this.billingAddress.billingAddressCountry = "";
      this.billingAddress.billingAddressZipcode = "";
    }
  }

  onSubmit(){
    this.checkoutService.checkout(
      this.shippingAddress,
      this.billingAddress,
      this.payment,
      this.shippingMethod
    ).subscribe(
      response=>{
        this.order=JSON.parse(response);
        console.log(this.order);
//interface NavigationExtras extends UrlCreationOptions, NavigationBehaviorOptions
//replaceUrl?: boolean


        let navigationExtras: NavigationExtras = {
          queryParams: {
            "order": JSON.stringify(this.order)
          }
        };

        this.router.navigate(['/orderSummary'], navigationExtras);
      },
      error=>{
        console.log(error.error);
      }
    );
  }

  ngOnInit() {
    this.getCartItemList();


    this.cartService.getShoppingCart().subscribe(
      response=>{
        console.log(JSON.stringify(response));
        this.shoppingCart=JSON.parse(response);
      },
      error=>{
        console.log(error.error);
      }
    );

    this.shippingService.getUserShippingList().subscribe(
      response=>{
        console.log(JSON.stringify(response));
        this.userShippingList=JSON.parse(response);
        if(this.userShippingList.length) {
          this.emptyShippingList = false;

          for (let userShipping of this.userShippingList) {
            if(userShipping.userShippingDefault) {
              this.setShippingAddress(userShipping);
              return;
            }
          }
        }
      },
      error=>{
        console.log(error.error);
      }
    );

    this.paymentService.getUserPaymentList().subscribe(
      response=>{
        console.log(JSON.stringify(response));
        this.userPaymentList=JSON.parse(response);
        this.emptyPaymentList = false;

        if(this.userPaymentList.length) {
          this.emptyPaymentList = false;

          for (let userPayment of this.userPaymentList) {
            if(userPayment.defaultPayment) {
              this.setPaymentMethod(userPayment);
              return;
            }
          }
        }
      },
      error=>{
        console.log(error.error);
      }
    );


    this.payment.type="";
    this.payment.expiryMonth="";
    this.payment.expiryYear="";
    this.shippingMethod="TeslaTransport";

  }



}
