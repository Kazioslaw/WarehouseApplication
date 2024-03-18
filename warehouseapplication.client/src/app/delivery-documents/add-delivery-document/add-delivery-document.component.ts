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
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryDocumentsService } from 'src/app/services/delivery-documents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-delivery-document',
  templateUrl: './add-delivery-document.component.html',
  styleUrls: ['./add-delivery-document.component.css'],
})
export class AddDeliveryDocumentComponent {
  newDocument: DeliveryDocument = {
    storehouseID: 0,
    supplierID: 0,
    labelDocuments: [],
    productLists: [],
  };
  addDocumentForm!: FormGroup;
  newProduct: ProductList = {
    productID: 0,
    price: 0,
    quantity: 1,
    productName: '',
    productBarcode: '',
  };
  suppliersList: Supplier[] = [];
  storehousesList: Storehouse[] = [];
  productsList: Product[] = [];
  newLabel: LabelDocument = {
    labelID: 0,
    labelName: '',
  };
  documentProducts: ProductList[] = [];
  labelsList: Label[] = [];
  documentLabels: LabelDocument[] = [];
  subscription!: Subscription;
  constructor(
    private suppliersService: SuppliersService,
    private storehousesService: StorehousesService,
    private productsService: ProductsService,
    private deliveryDocumentsService: DeliveryDocumentsService,
    private labelsService: LabelsService,
    private toast: ToastService,
    private router: Router
  ) {
    this.subscription = this.suppliersService
      .getSuppliers()
      .subscribe((data: Supplier[]) => {
        this.suppliersList = data;
      });
    this.subscription = this.labelsService
      .getLabels()
      .subscribe((data: Label[]) => (this.labelsList = data));
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
  ngOnInit() {
    this.addDocumentForm = new FormGroup({
      supplierID: new FormControl(null, Validators.required),
      storehouseID: new FormControl(null, Validators.required),
      labelDocuments: new FormGroup({
        labelID: new FormControl('', [Validators.required]),
      }),
      productLists: new FormGroup({
        productID: new FormControl([Validators.required]),
        quantity: new FormControl([
          Validators.required,
          Validators.min(1),
          Validators.max(20000000),
        ]),
        price: new FormControl([
          Validators.required,
          Validators.min(0.01),
          Validators.max(20000000),
        ]),
      }),
    });
  }

  onAddLabel() {
    this.newLabel = {
      labelName: this.addDocumentForm.get('labelDocuments.labelID')?.value,
      labelID: 0,
    };
    const selectedLabel = this.labelsList.find(
      (l) => l.labelName === this.newLabel.labelName
    );
    if (selectedLabel?.labelID == null) {
      this.subscription = this.labelsService
        .createLabel(this.newLabel)
        .subscribe(() => {
          this.labelsService
            .getLabels()
            .subscribe((data: Label[]) => (this.labelsList = data));
        });
      this.newLabel.labelID = this.labelsList.find(
        (l) => l.labelName === this.newLabel.labelName
      )?.labelID!;
      this.documentLabels.push({ ...this.newLabel });
      this.newLabel = {
        labelID: 0,
        labelName: '',
      };
    } else {
      console.log('not new');
      this.newLabel.labelID = selectedLabel?.labelID;
      this.documentLabels.push({ ...this.newLabel });
      this.newLabel = {
        labelID: 0,
        labelName: '',
      };
    }
    this.addDocumentForm.get('labelDocuments')?.reset();
  }
  onDeleteLabel(id: number) {
    this.documentProducts.splice(id, 1);
  }

  onAddProduct() {
    var selectedProduct = this.productsList.find(
      (p) =>
        p.productID ===
        parseInt(this.addDocumentForm.get('productLists.productID')?.value)
    );
    if (selectedProduct) {
      this.newProduct.productID = selectedProduct.productID
        this.newProduct.productName = selectedProduct.productName
        this.newProduct.productBarcode = selectedProduct.productBarcode
      this.newProduct.quantity = this.addDocumentForm.get(
        'productLists.quantity'
      )?.value;
      this.newProduct.price =
        this.addDocumentForm.get('productLists.price')?.value;
    }
    this.documentProducts.push({ ...this.newProduct });
    this.newProduct = {
      productID: 0,
      price: 0,
      quantity: 0,
      productName: '',
      productBarcode: '',
    };
    this.addDocumentForm.get('productLists')?.reset();
  }
  onDeleteProduct(id: number) {
    this.documentProducts.splice(id, 1);
    console.log('product deleted');
  }

  onAdd() {
    alert('Nowy dokument dodany');
    this.newDocument = this.addDocumentForm.value;
    this.newDocument.productLists = this.documentProducts;
    this.newDocument.labelDocuments = this.documentLabels;
    const sortedDocument: DeliveryDocument = {
      supplierID: this.newDocument.supplierID,
      storehouseID: this.newDocument.storehouseID,
      labelDocuments: this.documentLabels,
      productLists: this.documentProducts,
    };
    this.deliveryDocumentsService
      .createDelieryDocument(sortedDocument)
      .subscribe(() => {
        this.toast.show('Document successfully added', 'bg-success text-light');
        this.router.navigate(['delivery-documents']);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
