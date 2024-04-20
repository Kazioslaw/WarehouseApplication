import { DeliveryDocument } from './delivery-document';

export interface Supplier {
  supplierID: number;
  supplierName: string;
  address: {
    street: string;
    city: string;
    country: string;
    zipcode: string;
  };
  /*documents?: DeliveryDocument[];*/
}
