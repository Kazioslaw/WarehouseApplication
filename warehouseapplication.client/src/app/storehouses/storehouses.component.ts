import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Storehouse } from '../models/storehouse';
import { StorehousesService } from '../services/storehouses.service';

@Component({
  selector: 'storehouses',
  templateUrl: './storehouses.component.html',
  styleUrls: ['./storehouses.component.css'],
})
export class StorehousesComponent {
  public storehouses: Storehouse[] = [];
  constructor(private storehousesService: StorehousesService) {}

  ngOnInit() {
    this.storehousesService
      .getStorehouses()
      .subscribe((data: Storehouse[]) => (this.storehouses = data));
  }
}
