import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public selectedProduct: Product;
  public cartItemList: CartItem[] = [];
  public cartItemNumber: number;
  public shoppingCart: ShoppingCart = new ShoppingCart();
  public cartItemUpdated: boolean;
  public emptyCart: boolean;
  public notEnoughStock: boolean;


  constructor(
    public router:Router,
    public cartService: CartService
  ) { }



  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigate(['/productDetail', this.selectedProduct.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      response => {
        console.log(response);
        this.getCartItemList();
        this.getShoppingCart();
      },
      error => {
        console.log(error.error);
      }
    );
  }

  onUpdateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
      response => {
        console.log(response);
        this.cartItemUpdated=true;
        this.getShoppingCart();
      },
      error => {
        console.log(error.error);
      }
    )
  }

  getCartItemList()  {
    this.cartService.getCartItemList().subscribe(
      response => {
        this.cartItemList=JSON.parse(response);
        this.cartItemNumber = this.cartItemList.length;
      },
      error => {
        console.log(error.error);
      }
    )
  }

  getShoppingCart() {
    this.cartService.getShoppingCart().subscribe(
      response => {
        console.log(JSON.stringify(response));
        this.shoppingCart=JSON.parse(response);
      },
      error => {
        console.log(error.error);
      }
    )
  }

  onCheckout() {
    if(this.cartItemNumber==0) {
      this.emptyCart=true;
    } else {
      for (let item of this.cartItemList) {
        if (item.qty > item.product.inStockNumber) {
          console.log("not enough items in stock");
          this.notEnoughStock=true;
          return;
        }
      }

      // this.router.navigate('[/order]');
    }
  }

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }

}
