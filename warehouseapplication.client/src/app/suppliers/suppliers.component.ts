import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Supplier } from '../models/supplier';
import { SuppliersService } from '../services/suppliers.service';

@Component({
  selector: 'suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent {
  public suppliers: Supplier[] = [];
  constructor(private suppliersService: SuppliersService) {}

  ngOnInit() {
    this.suppliersService
      .getSuppliers()
      .subscribe((data: Supplier[]) => (this.suppliers = data));
  }
}
