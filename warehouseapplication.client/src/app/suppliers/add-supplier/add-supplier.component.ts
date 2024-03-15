import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent {
  newSupplier: Supplier = {
    supplierID: undefined!,
    supplierName: '',
    supplierAddress: '',
    supplierCity: '',
    supplierZipcode: '',
  };

  constructor(
    private suppliersService: SuppliersService,
    private router: Router
  ) {}

  saveSupplier() {
    this.suppliersService.createSupplier(this.newSupplier).subscribe((data) => {
      alert('Supplier created');
      this.router.navigate(['suppliers']);
    });
  }
}
