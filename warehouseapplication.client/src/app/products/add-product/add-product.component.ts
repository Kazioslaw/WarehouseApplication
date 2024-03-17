import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Subscription, timeout } from 'rxjs';
import { ToastService } from 'src/app/toaster/toast.service';
@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  newProduct: Product = {
    productID: undefined!,
    productName: '',
    productBarcode: '',
  };
  @ViewChild('added') added!: TemplateRef<any>;
  private subscription!: Subscription;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private toast: ToastService
  ) {}

  saveProduct() {
    this.subscription = this.productsService
      .createProduct(this.newProduct)
      .subscribe((data) => {
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
