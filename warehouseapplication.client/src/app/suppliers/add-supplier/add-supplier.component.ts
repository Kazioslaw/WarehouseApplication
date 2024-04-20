import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  addSupplierForm!: FormGroup;
  newSupplier: Supplier = {
    supplierID: undefined!,
    supplierName: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      country: '',
    },
  };
  private subscription!: Subscription;
  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private toast: ToastService
  ) {
    this.addSupplierForm = new FormGroup({
      supplierName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      address: new FormGroup({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        zipcode: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        country: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
      }),
    });
  }

  onSubmit() {
    this.newSupplier = this.addSupplierForm.value;
    console.log(JSON.stringify(this.newSupplier));
    /*this.subscription = this.suppliersService
      .createSupplier(this.newSupplier)
      .subscribe((data) => {
        this.toast.show('Supplier successfully added', 'bg-success text-light');
        this.router.navigate(['suppliers']);
      });*/
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
