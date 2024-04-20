import { Supplier } from './supplier';

export interface Address {
  street: string;
  city: string;
  zipcode: string;
  suppliers: Supplier[];
}
