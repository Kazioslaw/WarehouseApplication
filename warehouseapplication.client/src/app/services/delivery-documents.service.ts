import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryDocument } from '../models/delivery-document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryDocumentsService {
  private apiUrl = 'https://localhost:7088/api/DeliveryDocuments';

  constructor(private http: HttpClient) {}

  // Create
  createDelieryDocument(
    deliveryDocuments: DeliveryDocument
  ): Observable<DeliveryDocument> {
    return this.http.post<DeliveryDocument>(this.apiUrl, deliveryDocuments);
  }

  // Get All
  getDeliveryDocuments(): Observable<DeliveryDocument[]> {
    return this.http.get<DeliveryDocument[]>(this.apiUrl);
  }

  // Get at ID
  getDeliveryDocumentByID(id: number): Observable<DeliveryDocument> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DeliveryDocument>(url);
  }

  // Update
  updateDeliveryDocument(
    deliveryDocument: DeliveryDocument
  ): Observable<DeliveryDocument> {
    const url = `${this.apiUrl}/${deliveryDocument.documentID}`;
    return this.http.put<DeliveryDocument>(url, deliveryDocument);
  }

  // Update isApproved
  approveDeliveryDocument(id: number): Observable<void> {
    const url = `${this.apiUrl}/Approve/${id}`;
    return this.http.put<void>(url, {});
  }

  // Update isCancelled
  cancelDeliveryDocument(id: number) {
    const url = `${this.apiUrl}/Cancel/${id}`;
    return this.http.put<void>(url, {});
  }
}
