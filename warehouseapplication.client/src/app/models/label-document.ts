import { DeliveryDocument } from './delivery-document';
import { Label } from './label';

export interface LabelDocument {
  labelID: number;
  label?: Label;
  documentID: number;
  document?: DeliveryDocument;
}
