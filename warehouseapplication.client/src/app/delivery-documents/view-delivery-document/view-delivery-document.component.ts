import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DeliveryDocument } from 'src/app/models/delivery-document';

@Component({
  selector: 'app-view-delivery-document',
  templateUrl: './view-delivery-document.component.html',
  styleUrls: ['./view-delivery-document.component.css'],
})
export class ViewDeliveryDocumentComponent {
  deliveryDocuments: DeliveryDocument[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<DeliveryDocument[]>(
        'https://localhost:7088/api/DeliveryDocuments/:id'
      )
      .subscribe(
        (result) => {
          this.deliveryDocuments = result;
          console.log(result);
        },
        (error) => console.error(error)
      );
  }
}
