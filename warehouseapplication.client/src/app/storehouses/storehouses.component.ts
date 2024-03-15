import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Storehouse } from '../models/storehouse';
import { StorehousesService } from '../services/storehouses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'storehouses',
  templateUrl: './storehouses.component.html',
  styleUrls: ['./storehouses.component.css'],
})
export class StorehousesComponent {
  public storehouses: Storehouse[] = [];
  private subscription!: Subscription;
  constructor(private storehousesService: StorehousesService) {}

  ngOnInit() {
    this.subscription = this.storehousesService
      .getStorehouses()
      .subscribe((data: Storehouse[]) => (this.storehouses = data));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
