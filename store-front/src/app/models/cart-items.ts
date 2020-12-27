import {Product} from './product';
import {ShoppingCart} from './shopping-cart';

export class CartItem {
  public id: number;
  public subtotal: number;
  public product: Product;
  public shoppingCart: ShoppingCart
  public toUpdate:boolean;
  public qty: number;
}
