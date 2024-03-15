import { LabelDocument } from './label-document';
import { ProductList } from './product-list';
import { Storehouse } from './storehouse';
import { Supplier } from './supplier';

export interface DeliveryDocument {
  documentID: number | undefined;
  isApproved: boolean;
  isCancelled: boolean;
  supplierID: number | undefined;
  supplier?: Supplier;
  labelDocuments?: LabelDocument[];
  products?: ProductList[];
  storehouseID: number | undefined;
  storehouse?: Storehouse;
}
