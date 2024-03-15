import { Component } from '@angular/core';
import { DeliveryDocument } from 'src/app/models/delivery-document';
import { Supplier } from 'src/app/models/supplier';
import { Storehouse } from 'src/app/models/storehouse';
import { Product } from 'src/app/models/product';
import { Label } from 'src/app/models/label';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { StorehousesService } from 'src/app/services/storehouses.service';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/toaster/toast.service';

@Component({
  selector: 'add-delivery-document',
  templateUrl: './add-delivery-document.component.html',
  styleUrls: ['./add-delivery-document.component.css'],
})
export class AddDeliveryDocumentComponent {
  newDocument: DeliveryDocument = {
    documentID: undefined,
    supplierID: undefined,
    storehouseID: undefined,
    products: undefined,
    labelDocuments: undefined,
    isApproved: false,
    isCancelled: false,
  };
  suppliersList: Supplier[] = [];
  storehousesList: Storehouse[] = [];
  productsList: Product[] = [];
  labelsList: Label[] = [];
  subscription!: Subscription;
  constructor(
    private suppliersService: SuppliersService,
    private storehousesService: StorehousesService,
    private productsService: ProductsService,
    private toast: ToastService
  ) {
    this.subscription = this.suppliersService
      .getSuppliers()
      .subscribe((data: Supplier[]) => {
        this.suppliersList = data;
      });
    this.subscription = this.storehousesService
      .getStorehouses()
      .subscribe((data: Storehouse[]) => {
        this.storehousesList = data;
      });
    this.subscription = this.productsService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.productsList = data;
      });
  }

  onAdd() {
    this.toast.show('Document successfully added', 'bg-success text-light');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
