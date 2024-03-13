import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DeliveryDocument } from '../models/delivery-document';
import { DeliveryDocumentsService } from '../services/delivery-documents.service';

@Component({
  selector: 'delivery-documents',
  templateUrl: './delivery-documents.component.html',
  styleUrls: ['./delivery-documents.component.css'],
})
export class DeliveryDocumentsComponent {
  public deliveryDocuments: DeliveryDocument[] = [];
  constructor(private deliveryDocumentsService: DeliveryDocumentsService) {}

  ngOnInit() {
    this.deliveryDocumentsService
      .getDeliveryDocuments()
      .subscribe((data: DeliveryDocument[]) => (this.deliveryDocuments = data));
  }
}
