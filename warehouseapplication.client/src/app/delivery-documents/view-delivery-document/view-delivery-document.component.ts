import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryDocument } from 'src/app/models/delivery-document';
import { DeliveryDocumentsService } from 'src/app/services/delivery-documents.service';

@Component({
  selector: 'app-view-delivery-document',
  templateUrl: './view-delivery-document.component.html',
  styleUrls: ['./view-delivery-document.component.css'],
})
export class ViewDeliveryDocumentComponent {
  deliveryDocumentDetails!: DeliveryDocument;
  ID!: number;
  constructor(
    private deliveryDocumentsServices: DeliveryDocumentsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    this.deliveryDocumentsServices
      .getDeliveryDocumentByID(this.ID)
      .subscribe((data: DeliveryDocument) => {
        this.deliveryDocumentDetails = data;
      });
  }
}
