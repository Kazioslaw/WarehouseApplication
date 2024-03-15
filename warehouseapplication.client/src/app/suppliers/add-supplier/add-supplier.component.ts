import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Supplier } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { ToastService } from 'src/app/toaster/toast.service';

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
  private subscription!: Subscription;
  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private toast: ToastService
  ) {}

  saveSupplier() {
    this.subscription = this.suppliersService
      .createSupplier(this.newSupplier)
      .subscribe((data) => {
        this.toast.show('Supplier successfully added', 'bg-success text-light');
        this.router.navigate(['suppliers']);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
