import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css'],
})
export class DeleteSupplierComponent {
  ID: any;
  supplierDetails!: Supplier;
  constructor(
    private suppliersService: SuppliersService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    this.suppliersService
      .getSupplierByID(this.ID)
      .subscribe((data: Supplier) => {
        this.supplierDetails = data;
      });
  }
}
