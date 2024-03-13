import { DeliveryDocument } from './delivery-document';

export interface Supplier {
  supplierID: number;
  supplierName: string;
  supplierAddress: string;
  supplierCity: string;
  supplierZipcode: string;
  documents?: DeliveryDocument[];
}
