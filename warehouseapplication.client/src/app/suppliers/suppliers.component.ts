import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


interface Supplier {
  supplierID: number,
  supplierName: string,
  supplierAddress: string,
  supplierCity: string,
  supplierZipcode: string,
}

@Component({
  selector: 'suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})

export class SuppliersComponent {
  public suppliers: Supplier[] = [];
  constructor(private http: HttpClient) {
    http.get<Supplier[]>("https://localhost:7088/api/Storehouses").subscribe(result => { this.suppliers = result },
      error => console.error(error)
    );
  }

}
