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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'edit-delivery-document',
  templateUrl: './edit-delivery-document.component.html',
  styleUrls: ['./edit-delivery-document.component.css'],
})
export class EditDeliveryDocumentComponent {
  deliveryDocument: DeliveryDocument = {
    supplierID: 0,
    storehouseID: 0,
    documentID: 0,
  };
  editDocumentForm!: FormGroup;
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
  newLabel: LabelDocument = {
    labelID: 0,
    labelName: '',
  };
  documentProducts: ProductList[] = [];
  oldProductList: ProductList[] = [];
  labelsList: Label[] = [];
  documentLabels: LabelDocument[] = [];
  oldLabelList: LabelDocument[] = [];
  subscription!: Subscription;
  ID!: number;
  isEdit: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private deliveryDocumentsService: DeliveryDocumentsService,
    private productsService: ProductsService,
    private storehousesService: StorehousesService,
    private suppliersService: SuppliersService,
    private toast: ToastService,
    private labelsService: LabelsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');
    this.subscription = this.productsService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.productsList = data;
      });

    this.subscription = this.deliveryDocumentsService
      .getDeliveryDocumentByID(this.ID)
      .subscribe((data: DeliveryDocument) => {
        this.deliveryDocument = data;
        this.documentProducts = data.productLists!;
        this.oldProductList = data.productLists!;
        this.documentLabels = data.labelDocuments!;
        this.oldLabelList = data.labelDocuments!;
        console.log(JSON.stringify(data.productLists));
      });

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

    this.subscription = this.labelsService
      .getLabels()
      .subscribe((data: Label[]) => {
        this.labelsList = data;
      });
  }

  ngOnInit() {
    this.editDocumentForm = new FormGroup({
      supplierID: new FormControl(Validators.required),
      storehouseID: new FormControl(Validators.required),
      labelDocuments: new FormGroup({
        labelID: new FormControl('', [Validators.required]),
      }),
      productLists: new FormGroup({
        productID: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(20000000),
        ]),
        price: new FormControl('', [
          Validators.required,
          Validators.min(0.01),
          Validators.max(20000000),
        ]),
        editQuantity: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(20000000),
        ]),
        editPrice: new FormControl('', [
          Validators.required,
          Validators.min(0.01),
          Validators.max(20000000),
        ]),
      }),
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.editDocumentForm.patchValue({
      supplierID: this.deliveryDocument.supplierInfo?.supplierID,
      storehouseID: this.deliveryDocument.storehouseInfo?.storehouseID,
    });
  }

  onAddLabel() {
    this.newLabel = {
      labelName: this.editDocumentForm.get('labelDocuments.labelID')?.value,
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
      this.deliveryDocument.labelDocuments?.push({ ...this.newLabel });
      this.newLabel = {
        labelID: 0,
        labelName: '',
      };
    } else {
      this.newLabel.labelID = selectedLabel?.labelID;
      this.deliveryDocument.labelDocuments?.push({ ...this.newLabel });
      this.newLabel = {
        labelID: 0,
        labelName: '',
      };
    }
    this.editDocumentForm.get('labelDocuments')?.reset();
  }
  onDeleteLabel(id: number) {
    this.deliveryDocument.labelDocuments?.splice(id, 1);
    console.log('label deleted');
  }

  onAddProduct() {
    var selectedProduct = this.productsList.find(
      (p) =>
        p.productID ===
        parseInt(this.editDocumentForm.get('productLists.productID')?.value)
    );
    if (selectedProduct) {
      this.newProduct.productID = selectedProduct.productID;
      this.newProduct.productName = selectedProduct.productName;
      this.newProduct.productBarcode = selectedProduct.productBarcode;
      this.newProduct.quantity = this.editDocumentForm.get(
        'productLists.quantity'
      )?.value;
      this.newProduct.price =
        this.editDocumentForm.get('productLists.price')?.value;
    }
    this.documentProducts.push({ ...this.newProduct });
    this.newProduct = {
      productID: 0,
      price: 0,
      quantity: 0,
      productName: '',
      productBarcode: '',
    };
    this.editDocumentForm.get('productLists')?.reset();
  }

  onDeleteProduct(id: number) {
    this.documentProducts.splice(id, 1);
    console.log('product deleted');
  }

  onEdit(productList: ProductList, id: number) {
    this.deliveryDocument.productLists?.forEach((element) => {
      element.isEdit = false;
    });
    productList.isEdit = true;
    const productListsFormGroup = this.editDocumentForm.get(
      'productLists'
    ) as FormGroup;
    productListsFormGroup.patchValue({
      editQuantity: productList.quantity,
      editPrice: productList.price,
    });
  }

  onCancel(productList: ProductList) {
    productList.isEdit = false;
  }

  onUpdate(productList: ProductList, id: number) {
    productList.isEdit = false;
    const productListsFormGroup = this.editDocumentForm.get(
      'productLists'
    ) as FormGroup;

    const updatedQuantity = productListsFormGroup.get('editQuantity')?.value;
    const updatedPrice = productListsFormGroup.get('editPrice')?.value;
    this.deliveryDocument.productLists![id].quantity = updatedQuantity;
    this.deliveryDocument.productLists![id].price = updatedPrice;
  }

  onSubmit() {
    const sortedDocument: DeliveryDocument = {
      documentID: this.deliveryDocument.documentID,
      storehouseID:
        this.editDocumentForm.get('storehouseID')?.value ||
        this.deliveryDocument.storehouseID,
      supplierID:
        this.editDocumentForm.get('supplierID')?.value ||
        this.deliveryDocument.supplierID,
      labelDocuments: this.documentLabels,
      productLists: this.documentProducts,
    };
    console.log(JSON.stringify(sortedDocument));
    this.deliveryDocumentsService
      .updateDeliveryDocument(sortedDocument, this.ID)
      .subscribe(() => {
        this.toast.show(
          'Document successfully updated',
          'bg-success text-light'
        );
        this.router.navigate(['delivery-documents']);
      });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
