import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  ID!: number;
  productDetails!: Product;
  editProductForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.editProductForm = this.formBuilder.group({
      productID: undefined,
      productName: [Validators.minLength(3)],
      productBarcode: [Validators.minLength(3), Validators.maxLength(48)],
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
      this.productsService.updateProduct(updatedProduct).subscribe(() => {
        console.log('product updated'), this.router.navigate(['products']);
      });
    }
  }
}
