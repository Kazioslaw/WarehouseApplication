import { LabelDocument } from './label-document';
import { ProductList } from './product-list';
import { Storehouse } from './storehouse';
import { Supplier } from './supplier';

export interface DeliveryDocument {
  documentID?: number;
  isApproved?: boolean;
  isCancelled?: boolean;
  supplierID: number;
  supplierInfo?: Supplier;
  labelDocuments?: LabelDocument[];
  productList?: ProductList[];
  storehouseID: number;
  storehouseInfo?: Storehouse;
}
