import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { StorehousesComponent } from './storehouses/storehouses.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { DeliveryDocumentsComponent } from './delivery-documents/delivery-documents.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryDocumentsComponent,
    NavMenuComponent,
    ProductsComponent,
    SuppliersComponent,
    StorehousesComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, NgbModule, RouterModule.forRoot([
      { path: 'delivery-documents', component: DeliveryDocumentsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'storehouses', component: StorehousesComponent }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
