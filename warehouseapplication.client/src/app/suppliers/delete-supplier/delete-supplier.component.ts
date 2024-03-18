import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Supplier } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ToastService } from 'src/app/toaster/toast.service';

@Component({
  selector: 'delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css'],
})
export class DeleteSupplierComponent {
  ID: any;
  supplierDetails!: Supplier;
  private subscription!: Subscription;
  constructor(
    private suppliersService: SuppliersService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    this.suppliersService
      .getSupplierByID(this.ID)
      .subscribe((data: Supplier) => {
        this.supplierDetails = data;
      });
    console.log(JSON.stringify(this.supplierDetails));
  }

  onDelete(id: number): void {
    console.log(JSON.stringify(this.supplierDetails));
    this.subscription = this.suppliersService
      .deleteSupplier(id)
      .subscribe(() => {
        console.log('Supplier Deleted');
        this.toast.show(
          'Supplier successfully deleted.',
          'bg-danger text-light'
        );
        this.router.navigate(['suppliers']);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
