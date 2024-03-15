import { Component } from '@angular/core';
import { Supplier } from '../models/supplier';
import { SuppliersService } from '../services/suppliers.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../toaster/toast.service';
@Component({
  selector: 'suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent {
  public suppliers: Supplier[] = [];
  private subscription!: Subscription;

  constructor(
    private suppliersService: SuppliersService,
    private toaster: ToastService
  ) {}

  ngOnInit() {
    this.subscription = this.suppliersService
      .getSuppliers()
      .subscribe((data: Supplier[]) => (this.suppliers = data));
      
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
