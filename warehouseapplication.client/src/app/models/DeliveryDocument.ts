import { ProductList } from './product-list';
import { Storehouse } from './storehouse';
import { Supplier } from './supplier';

export interface DeliveryDocument {
  documentID: number;
  isApproved: boolean;
  isCancelled: boolean;
  supplierID: number;
  supplier?: Supplier;
  labelDocuments?: LabelDocuments[];
  products?: ProductList;
  storehouseID: number;
  storehouse?: Storehouse;
}
