import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private apiUrl = 'https://localhost:7088/api/Suppliers';

  constructor(private http: HttpClient) {}

  // Create
  createSupplier(suppliers: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, suppliers);
  }

  // Read
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  // Read/ID
  getSupplierByID(id: number): Observable<Supplier> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Supplier>(url);
  }

  // Update
  updateSupplier(supplier: Supplier, id: number): Observable<Supplier> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Supplier>(url, supplier);
  }

  // Delete
  deleteSupplier(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
