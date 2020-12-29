import {Order} from './order';

export class BillingAddress {
	public id: number;
	public billingAddressName: string;
	public billingAddressStreet: string;
	public billingAddressCity: string;
	public billingAddressCountry: string;
	public billingAddressZipcode: string;
	public order: Order;
}
