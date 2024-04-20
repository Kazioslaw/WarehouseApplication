import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/toaster/toast.service';

@Component({
  selector: 'edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css'],
})
export class EditSupplierComponent {
  ID!: number;
  supplierDetails!: Supplier;
  editSupplierForm!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private suppliersService: SuppliersService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastService
  ) {
    this.editSupplierForm = this.formBuilder.group({
      supplierID: undefined,
      supplierName: [Validators.minLength(3)],
      address: this.formBuilder.group({
        street: [Validators.minLength(3), Validators.maxLength(60)],
        city: [Validators.minLength(3), Validators.maxLength(30)],
        zipcode: [Validators.minLength(3)]
      })
    });
  }

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    if (this.ID !== 0) {
      this.suppliersService
        .getSupplierByID(this.ID)
        .subscribe((data: Supplier) => {
          this.supplierDetails = data;
          console.log(
            JSON.stringify(this.supplierDetails)
          );
          this.editSupplierForm.patchValue(this.supplierDetails);
          console.log(this.editSupplierForm.value);
        });
    }
  }

  onSubmit() {
    if (this.editSupplierForm.valid) {
      const updatedSupplier: Supplier = this.editSupplierForm.value;
      console.log(JSON.stringify(updatedSupplier));
      this.subscription = this.suppliersService
        .updateSupplier(updatedSupplier, this.ID)
        .subscribe(() => {
          this.toast.show(
            'Supplier successfully edited.',
            'bg-success text-light animation'
          );
          this.router.navigate(['suppliers']);
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
