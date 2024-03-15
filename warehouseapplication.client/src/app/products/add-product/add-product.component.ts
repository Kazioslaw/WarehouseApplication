import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) {}

  saveProduct() {
    console.log('Form subbmited');
    this.productsService.createProduct(this.newProduct).subscribe((data) => {
      alert('Product created');
      this.router.navigate(['products']);
    });
  }
}
