import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/toaster/toast.service';

@Component({
  selector: 'delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  productDetails!: Product;
  ID!: number;
  private subscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');
    this.productsService.getProductByID(this.ID).subscribe((data: Product) => {
      this.productDetails = data;
    });
  }

  onDelete() {
    console.log(this.ID);
    this.subscription = this.productsService
      .deleteProduct(this.ID)
      .subscribe(() => {
        this.toast.show('Product succesfully deleted', 'bg-danger text-light');
        this.router.navigate(['products']);
      });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
