import {Order} from './order';

export class ShippingAddress {
	public id: number;
	public shippingAddressName: string;
	public shippingAddressStreet: string;
	public shippingAddressCity: string;
	public shippingAddressCountry: string;
	public shippingAddressZipcode: string;
	public shippingAddressDefault: boolean;
	public order: Order;
}
