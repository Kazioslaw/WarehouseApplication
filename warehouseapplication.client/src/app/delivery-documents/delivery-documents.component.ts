import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface DeliveryDocuments {
  documentID: number,
  supplierID: number,
  isApproved: boolean,
  isCancelled: boolean,
  supplierName: string,
}

interface Supplier {
  supplierID: number;
  supplierName: string
}

@Component({
  selector: 'delivery-documents',
  templateUrl: './delivery-documents.component.html',
  styleUrls: ['./delivery-documents.component.css']
})
export class DeliveryDocumentsComponent {
  public deliveryDocuments: DeliveryDocuments[] = [];

  constructor(private http: HttpClient) {
    http.get<DeliveryDocuments[]>("https://localhost:7088/api/DeliveryDocuments").subscribe(result => {
      this.deliveryDocuments = result;
      this.getSuppliers();
    }, error => console.error(error))
  }

  private getSuppliers(): void {
    this.http.get<Supplier[]>("https://localhost:7088/api/Suppliers").subscribe(
      suppliers => {
        this.deliveryDocuments = this.deliveryDocuments.map(doc => ({
          documentID: doc.documentID,
          supplierID: doc.supplierID,
          supplierName: suppliers.find(supplier => supplier.supplierID === doc.supplierID)?.supplierName || '',
          isApproved: doc.isApproved,
          isCancelled: doc.isCancelled,
        }));
      }, error => console.error(error)
    );
  }
}

