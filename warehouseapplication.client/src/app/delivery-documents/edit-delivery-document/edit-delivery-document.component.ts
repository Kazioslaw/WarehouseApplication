import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductList } from 'src/app/models/product-list';
import { DeliveryDocumentsService } from 'src/app/services/delivery-documents.service';
import { ProductsService } from 'src/app/services/products.service';
import { DeliveryDocument } from 'src/app/models/delivery-document';
import { Supplier } from 'src/app/models/supplier';
import { Storehouse } from 'src/app/models/storehouse';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { StorehousesService } from 'src/app/services/storehouses.service';
import { Label } from 'src/app/models/label';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/toaster/toast.service';
import { LabelDocument } from 'src/app/models/label-document';
import { LabelsService } from 'src/app/services/labels.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'edit-delivery-document',
  templateUrl: './edit-delivery-document.component.html',
  styleUrls: ['./edit-delivery-document.component.css'],
})
export class EditDeliveryDocumentComponent {
  deliveryDocument!: DeliveryDocument;
  labelDocument!: LabelDocument[];
  newLabelDocument!: LabelDocument;
  editDocumentForm!: FormGroup;
  labelList!: Label[];
  newLabel!: Label;
  products!: Product[];
  productLists!: ProductList[];
  storehouses!: Storehouse[];
  suppliers!: Supplier[];
  ID!: number;
  newProduct: ProductList = {
    productID: 0,
    price: 0,
    quantity: 1,
    documentID: 0,
    productName: '',
    productBarcode: '',
  };
  isEdit!: boolean;
  private subscription!: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private deliveryDocumentsService: DeliveryDocumentsService,
    private productsService: ProductsService,
    private storehousesService: StorehousesService,
    private suppliersService: SuppliersService,
    private toast: ToastService,
    private labelsService: LabelsService,
    private router: Router
  ) {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');
    this.subscription = this.productsService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });

    this.subscription = this.deliveryDocumentsService
      .getDeliveryDocumentByID(this.ID)
      .subscribe((data: DeliveryDocument) => {
        this.deliveryDocument = data;
        this.productLists = data.products!;
        console.log(JSON.stringify(this.deliveryDocument));
      });

    this.subscription = this.suppliersService
      .getSuppliers()
      .subscribe((data: Supplier[]) => {
        this.suppliers = data;
      });

    this.subscription = this.storehousesService
      .getStorehouses()
      .subscribe((data: Storehouse[]) => {
        this.storehouses = data;
      });

    this.subscription = this.labelsService
      .getLabels()
      .subscribe((data: Label[]) => {
        this.labelList = data;
      });
  }

  ngOnInit() {}

  onAddLabel() {
    
  }

  onDeleteLabel(id: number) {
    this.labelDocument.splice(id, 1);
  }

  onAddProduct() {
    console.log('Product added');
    var selectedProduct = this.products.find(
      (p) => p.productID === this.newProduct.productID
    );
    if (selectedProduct) {
      this.newProduct.productName = selectedProduct.productName;
      this.newProduct.productBarcode = selectedProduct.productBarcode;
    }
    this.newProduct.documentID = this.ID;
    this.productLists.push({ ...this.newProduct });
    this.newProduct = {
      productID: 0,
      price: 0,
      quantity: 0,
      documentID: 0,
      productName: '',
      productBarcode: '',
      product: {
        productID: 0,
        productName: '',
        productBarcode: '',
      },
    };
    console.log(this.productLists);
  }

  onDeleteProduct(id: number) {
    this.productLists.splice(id, 1);
  }

  onEdit(productList: ProductList) {
    this.productLists.forEach((element) => {
      element.isEdit = false;
    });
    productList.isEdit = true;
  }

  onCancel(productList: ProductList) {
    this.productLists.forEach((element) => {
      element.isEdit = false;
    });
  }

  onUpdate(productList: ProductList) {
    productList.isEdit = false;
  }

  onSubmit() {
    this.deliveryDocument.products = this.productLists;
    console.log(JSON.stringify(this.deliveryDocument));
    this.subscription = this.deliveryDocumentsService
      .updateDeliveryDocument(this.deliveryDocument, this.ID)
      .subscribe(() => {
        this.toast.show('Product succesfully edited', 'bg-success text-light'),
          this.router.navigate(['delivery-documents']);
      });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  labelExist(labelList: Label[], newLabel: Label) {
    return (
      labelList.find((l) => l.labelName === newLabel.labelName) !== undefined
    );
  }
}
