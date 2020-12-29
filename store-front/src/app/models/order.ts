import {CartItem} from './cart-items';

export class Order {

  public id: number;
  public orderDate: string;
  public shippingDate: string;
  public shippingMethod: string;
  public orderStatus: string;
  public orderTotal: number;
  public cartItemList: CartItem[];
}
