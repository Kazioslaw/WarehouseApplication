import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryDocument } from '../models/delivery-document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryDocumentsService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  // Create
  createDelieryDocument(
    deliveryDocuments: DeliveryDocument
  ): Observable<DeliveryDocument> {
    return this.http.post<DeliveryDocument>(this.apiUrl, deliveryDocuments);
  }

  // Get All
  getDeliveryDocument(): Observable<DeliveryDocument[]> {
    return this.http.get<DeliveryDocument[]>(this.apiUrl);
  }

  // Get at ID
  getDeliveryDocumentByID(id: number): Observable<DeliveryDocument> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DeliveryDocument>(url);
  }

  // Update full
  updateDeliveryDocument(
    deliveryDocument: DeliveryDocument
  ): Observable<DeliveryDocument> {
    const url = `${this.apiUrl}/${deliveryDocument.documentID}`;
    return this.http.put<DeliveryDocument>(url, deliveryDocument);
  }

  approveDeliveryDocument(deliveryDocument: DeliveryDocument) {
    const url = `${this.apiUrl}/Approve/${deliveryDocument.documentID}`;
    return this.http.put<DeliveryDocument>(url, deliveryDocument);
  }
  cancelDeliveryDocument(deliveryDocument: DeliveryDocument) {
    const url = `${this.apiUrl}/Cancel/${deliveryDocument.documentID}`;
    return this.http.put<DeliveryDocument>(url, deliveryDocument);
  }
}
