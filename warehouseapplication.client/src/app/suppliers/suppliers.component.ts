import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Supplier } from '../models/supplier';
import { DeliveryDocument } from '../models/delivery-document';

const TABLE_DATA: Supplier[] = [
  {
    supplierID: 1,
    supplierName: 'Hurtownia Janusza',
    supplierAddress: 'Ul. Błoga',
    supplierCity: 'Henrykowo',
    supplierZipcode: '44800',
  },
  {
    supplierID: 2,
    supplierName: 'Hurtownia Ery',
    supplierAddress: 'Ul. Era',
    supplierCity: 'Erykowo',
    supplierZipcode: '44832',
  },
  {
    supplierID: 3,
    supplierName: 'Hurtownia Orak',
    supplierAddress: 'Ul. Horak',
    supplierCity: 'Anywhere City',
    supplierZipcode: '40034',
  },
];

@Component({
  selector: 'suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent {
  public suppliers: Supplier[] = [];
  constructor(private http: HttpClient) {
    http.get<Supplier[]>('https://localhost:7088/api/Suppliers').subscribe(
      (result) => {
        (this.suppliers = result), console.log('Pobrano');
      },
      (error) => console.error(error)
    );
  }

  public tempSuppliers: Supplier[] = TABLE_DATA;
}
