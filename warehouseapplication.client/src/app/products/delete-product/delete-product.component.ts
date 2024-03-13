import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  productDetails!: Product;
  ID!: number;
  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    this.productsService.getProductByID(this.ID).subscribe((data: Product) => {
      this.productDetails = data;
    });
  }
}
