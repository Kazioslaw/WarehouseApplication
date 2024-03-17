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
import { ProductList } from 'src/app/models/product-list';
import { LabelDocument } from 'src/app/models/label-document';
import { LabelsService } from 'src/app/services/labels.service';

@Component({
  selector: 'add-delivery-document',
  templateUrl: './add-delivery-document.component.html',
  styleUrls: ['./add-delivery-document.component.css'],
})
export class AddDeliveryDocumentComponent {
  newDocument: DeliveryDocument = {
    storehouseID: 0,
    supplierID: 0,
    labels: [],
    products: [],
  };
  newProduct: ProductList = {
    productID: 0,
    price: 0,
    quantity: 1,
    documentID: 0,
    productName: '',
    productBarcode: '',
  };
  suppliersList: Supplier[] = [];
  storehousesList: Storehouse[] = [];
  productsList: Product[] = [];

  documentProducts: ProductList[] = [];
  labelsList: Label[] = [];
  newLabelDocument: LabelDocument = {
    labelID: 0,
    labelName: '',
  };
  subscription!: Subscription;
  constructor(
    private suppliersService: SuppliersService,
    private storehousesService: StorehousesService,
    private productsService: ProductsService,
    private labelsService: LabelsService,
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

  onAddLabel() {
    if (
      !this.labelsList.find(
        (ll) => ll.labelName == this.newLabelDocument.labelName
      )
    ) {
      this.subscription = this.labelsService
        .createLabel(this.newLabelDocument)
        .subscribe(() => console.log('Created'));
    }
    this.labelsList.push({...this.newLabelDocument})
    this.newLabelDocument = {
      labelID: 0,
      labelName: '',
    };

  }
  onDeleteLabel(id: number) {
    this.documentProducts.splice(id, 1);
  }

  onAddProduct() {
    var selectedProduct = this.productsList.find(
      (p) => p.productID === this.newProduct.productID
    );
    if (selectedProduct) {
      (this.newProduct.productName = selectedProduct.productName),
        (this.newProduct.productBarcode = selectedProduct.productBarcode);
    }
    this.documentProducts.push({ ...this.newProduct });
    this.newProduct = {
      productID: 0,
      price: 0,
      quantity: 0,
      productName: '',
      productBarcode: '',
    };
    console.log('product added');
  }

  onDeleteProduct(id: number) {
    this.documentProducts.splice(id, 1);
    console.log('product deleted');
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
