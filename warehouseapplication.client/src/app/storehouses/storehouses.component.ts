import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Storehouse } from '../models/storehouse';

@Component({
  selector: 'storehouses',
  templateUrl: './storehouses.component.html',
  styleUrls: ['./storehouses.component.css']
})
export class StorehousesComponent {
  public storehouses: Storehouse[] = [];
  constructor(private http: HttpClient) {
    http.get<Storehouse[]>("https://localhost:7088/api/Storehouses").subscribe(result => { this.storehouses = result },
      error => console.error(error)
    );
  }
}
