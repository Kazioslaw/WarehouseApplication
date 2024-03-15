import { Component } from '@angular/core';
import { DeliveryDocument } from 'src/app/models/delivery-document';
import { Supplier } from 'src/app/models/supplier';
import { Storehouse } from 'src/app/models/storehouse';
import { Product } from 'src/app/models/product';
import { Label } from 'src/app/models/label';

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

  constructor() {}
}
