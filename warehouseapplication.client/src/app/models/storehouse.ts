import { DeliveryDocument } from './delivery-document';

export interface Storehouse {
  storehouseID: number;
  storehouseName: string;
  storehouseSymbol: string;
  documents?: DeliveryDocument[];
}
