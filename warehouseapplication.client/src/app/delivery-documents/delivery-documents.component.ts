import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DeliveryDocument } from '../models/delivery-document';
import { DeliveryDocumentsService } from '../services/delivery-documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'delivery-documents',
  templateUrl: './delivery-documents.component.html',
  styleUrls: ['./delivery-documents.component.css'],
})
export class DeliveryDocumentsComponent {
  public deliveryDocuments: DeliveryDocument[] = [];
  private subscription!: Subscription;
  public indexID: number = 0;
  public index: number[] = [];
  constructor(private deliveryDocumentsService: DeliveryDocumentsService) {
  }
  ngOnInit() {
    this.subscription = this.deliveryDocumentsService
      .getDeliveryDocuments()
      .subscribe((data: DeliveryDocument[]) => {
        this.deliveryDocuments = data;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  countCancelled(documents: any[]): number {
    return documents.filter(doc => doc.isCancelled).length;
  }

}
