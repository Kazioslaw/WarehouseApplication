import { Injectable } from '@angular/core';
import { Storehouse } from '../models/storehouse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StorehousesService {
  private apiUrl = 'https://localhost:7088/api/Storehouses';

  constructor(private http: HttpClient) {}

  getStorehouses(): Observable<Storehouse[]> {
    return this.http.get<Storehouse[]>(this.apiUrl);
  }
}
