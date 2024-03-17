import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeliveryDocument } from 'src/app/models/delivery-document';
import { LabelDocument } from 'src/app/models/label-document';
import { ProductList } from 'src/app/models/product-list';
import { DeliveryDocumentsService } from 'src/app/services/delivery-documents.service';

@Component({
  selector: 'app-view-delivery-document',
  templateUrl: './view-delivery-document.component.html',
  styleUrls: ['./view-delivery-document.component.css'],
})
export class ViewDeliveryDocumentComponent {
  deliveryDocumentDetails!: DeliveryDocument;
  ID!: number;
  private subscription!: Subscription;
  constructor(
    private deliveryDocumentsServices: DeliveryDocumentsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ID = parseInt(this.activeRoute.snapshot.paramMap.get('id') || '');

    this.subscription = this.deliveryDocumentsServices
      .getDeliveryDocumentByID(this.ID)
      .subscribe((data: DeliveryDocument) => {
        this.deliveryDocumentDetails = data;
      });

      console.log(JSON.stringify(this.deliveryDocumentDetails.labels))
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
