import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'edit-delivery-document',
  templateUrl: './edit-delivery-document.component.html',
  styleUrls: ['./edit-delivery-document.component.css'],
})
export class EditDeliveryDocumentComponent {
  deliveryDocument!: DeliveryDocument;
  labels: Label[] = [];
  products: Product[] = [];
  productsLists: ProductList[] = [];
  storehouses: Storehouse[] = [];
  suppliers: Supplier[] = [];
  ID!: number;
  newProductList!: ProductList;

  constructor(
    private activeRoute: ActivatedRoute,
    private deliveryDocumentsService: DeliveryDocumentsService,
    private productsService: ProductsService,
    private storehousesService: StorehousesService,
    private suppliersService: SuppliersService
  ) {}
  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');
    this.productsService
      .getProducts()
      .subscribe((data: Product[]) => (this.products = data));

    this.deliveryDocumentsService
      .getDeliveryDocumentByID(this.ID)
      .subscribe((data: DeliveryDocument) => {
        this.deliveryDocument = data;
        this.productsLists = data.products!;
      });

    this.suppliersService.getSuppliers().subscribe((data: Supplier[]) => {
      this.suppliers = data;
    });

    this.storehousesService.getStorehouses().subscribe((data: Storehouse[]) => {
      this.storehouses = data;
    });
  }

  addLabel() {}

  deleteLabel(id: number) {
    console.log('Deleted ' + id);
    // Usuwanie elementu z tabeli na podstawie ID
    // this.items = this.items.filter((item) => item.id !== id);
  }

  addProduct() {
    console.log('Added');
    this.newProductList.listID = this.productsLists.length + 1;
    this.productsLists.push({ ...this.newProductList });
    this.newProductList = {
      productID: 0,
      price: 0,
      quantity: 0,
      listID: 0,
      documentID: 0,
      product: { productName: '', productBarcode: '', productID: 0 },
    };
  }

  deleteProduct(id: number) {
    console.log('Deleted ' + id);
  }
}
