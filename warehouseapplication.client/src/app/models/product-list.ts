import { DeliveryDocument } from './delivery-document';
import { Product } from './product';

export interface ProductList {
  listID?: number;
  documentID?: number;
  document?: DeliveryDocument;
  productID: number;
  product?: Product;
  productName: string;
  productBarcode: string;
  quantity: number;
  price: number;
  isEdit?: boolean;
}
