import { Component } from '@angular/core';
import { DeliveryDocument } from '../models/delivery-document';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'delivery-documents',
  templateUrl: './delivery-documents.component.html',
  styleUrls: ['./delivery-documents.component.css'],
})
export class DeliveryDocumentsComponent {
  public deliveryDocuments: DeliveryDocument[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get<DeliveryDocument[]>('https://localhost:7088/api/DeliveryDocuments/')
      .subscribe(
        (result) => {
          this.deliveryDocuments = result;
          console.log(result);
        },
        (error) => console.error(error)
      );
  }
}
