import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/toaster/toast.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  private ID!: number;
  productDetails!: Product;
  editProductForm!: FormGroup;
  private subscription!: Subscription;
  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastService
  ) {
    this.editProductForm = this.formBuilder.group({
      productID: undefined,
      productName: [Validators.minLength(3), Validators.required],
      productBarcode: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(48),
      ],
    });
  }

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    if (this.ID !== 0) {
      this.productsService
        .getProductByID(this.ID)
        .subscribe((data: Product) => {
          this.productDetails = data;
          this.editProductForm.patchValue(this.productDetails);
        });
    }
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      const updatedProduct: Product = this.editProductForm.value;
      this.subscription = this.productsService
        .updateProduct(updatedProduct, this.ID)
        .subscribe(() => {
          this.toast.show(
            'Product succesfully deleted',
            'bg-success text-light'
          ),
            this.router.navigate(['products']);
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
