import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {LoggedInService} from '../../services/logged-in.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: number;
  public product: Product = new Product();
  public numberList: number[] = [1,2,3,4,5,6,7,8,9];
  public qty: number;
  public loggedIn: boolean = this.globalLoggedIn.loggedIn;

  public addProductSuccess: boolean = false;
  public notEnoughStock:boolean = false;

  constructor(
    public productService:ProductService,
    public router:Router,
    public http:HttpClient,
    public route:ActivatedRoute,
    private cartService: CartService,
    private globalLoggedIn: LoggedInService
  ) { }

  onAddToCart() {
    this.cartService.addItem(this.productId, this.qty).subscribe(
      response => {
        console.log(response);
        this.addProductSuccess=true;
      },
      error => {
        console.log(error.error);
        this.notEnoughStock=true;
      }
    );
  }



  ngOnInit() {
    //this.loggedIn = this.navBarComponent.loggedIn;
    this.route.params.forEach((params: Params) => {
      this.productId = Number.parseInt(params['id']);
    });

    this.productService.getProduct(this.productId).subscribe(
      response => {
        this.product = JSON.parse(response);
      },
      error => {
        console.log(error.error);
      }
    );

    this.qty = 1;
  }

}
