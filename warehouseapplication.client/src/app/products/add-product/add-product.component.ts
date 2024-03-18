import { Component, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/toaster/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addProductForm!: FormGroup;
  newProduct: Product = {
    productID: undefined!,
    productName: '',
    productBarcode: '',
  };
  private subscription!: Subscription;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      productBarcode: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(48),
      ]),
    });
  }

  onSubmit() {
    this.newProduct = this.addProductForm.value;
    this.subscription = this.productsService
      .createProduct(this.newProduct)
      .subscribe(() => {
        this.toast.show('Product successfully added', 'bg-success text-light');
        this.router.navigate(['products']);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
