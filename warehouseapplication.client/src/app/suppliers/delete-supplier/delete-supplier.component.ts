import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    this.suppliersService
      .getSupplierByID(this.ID)
      .subscribe((data: Supplier) => {
        this.supplierDetails = data;
      });
  }

  delete(id: number): void {
    this.suppliersService.deleteSupplier(id).subscribe(() => {
      console.log('Supplier Deleted');
      alert('Supplier deleted');
      this.router.navigate(['suppliers']);
    });
  }
}
