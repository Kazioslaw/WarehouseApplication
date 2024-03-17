import { Component, Output, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public products: Product[] = [];
  private subscription!: Subscription;
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.subscription = this.productsService
      .getProducts()
      .subscribe((data: Product[]) => (this.products = data));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
