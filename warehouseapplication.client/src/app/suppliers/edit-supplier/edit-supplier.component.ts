import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css'],
})
export class EditSupplierComponent {
  ID!: number;
  supplierDetails!: Supplier;
  editSupplierForm!: FormGroup;

  constructor(
    private suppliersService: SuppliersService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.editSupplierForm = this.formBuilder.group({
      supplierID: undefined,
      supplierName: [Validators.minLength(3)],
      supplierAddress: [Validators.minLength(3), Validators.maxLength(60)],
      supplierCity: [Validators.minLength(3), Validators.maxLength(30)],
      supplierZipcode: [Validators.minLength(3)],
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
            this.supplierDetails.supplierName,
            this.supplierDetails.supplierZipcode,
            this.supplierDetails.supplierCity,
            this.supplierDetails.supplierAddress
          );
          this.editSupplierForm.patchValue(this.supplierDetails);
          console.log(this.editSupplierForm.value);
        });
    }
  }

  onSubmit() {
    if (this.editSupplierForm.valid) {
      const updatedSupplier: Supplier = this.editSupplierForm.value;
      this.suppliersService.updateSupplier(updatedSupplier).subscribe(() => {
        console.log('Supplier Updated'),
          this.router.navigate(['suppliers']);
      });
    }
  }
}
