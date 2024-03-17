import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Label } from '../models/label';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabelsService {
  private apiUrl = 'https://localhost:7088/api/Labels';

  constructor(private http: HttpClient) {}

  // Create
  createLabel(label: Label): Observable<Label> {
    return this.http.post<Label>(this.apiUrl, label);
  }

  // Read
  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.apiUrl);
  }
}
