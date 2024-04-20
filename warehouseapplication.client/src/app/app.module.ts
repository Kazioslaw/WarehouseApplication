import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { StorehousesComponent } from './storehouses/storehouses.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { DeliveryDocumentsComponent } from './delivery-documents/delivery-documents.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';
import { DeleteSupplierComponent } from './suppliers/delete-supplier/delete-supplier.component';
import { AddDeliveryDocumentComponent } from './delivery-documents/add-delivery-document/add-delivery-document.component';
import { ViewDeliveryDocumentComponent } from './delivery-documents/view-delivery-document/view-delivery-document.component';
import { EditDeliveryDocumentComponent } from './delivery-documents/edit-delivery-document/edit-delivery-document.component';
import { CancelDeliveryDocumentComponent } from './delivery-documents/cancel-delivery-document/cancel-delivery-document.component';
import { ApproveDeliveryDocumentComponent } from './delivery-documents/approve-delivery-document/approve-delivery-document.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from './toaster/toaster.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryDocumentsComponent,
    NavMenuComponent,
    ProductsComponent,
    SuppliersComponent,
    StorehousesComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    AddDeliveryDocumentComponent,
    EditDeliveryDocumentComponent,
    ApproveDeliveryDocumentComponent,
    CancelDeliveryDocumentComponent,
    HomeComponent,
    ViewDeliveryDocumentComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    NgbNavModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbToastModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'delivery-documents', component: DeliveryDocumentsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'storehouses', component: StorehousesComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/edit/:id', component: EditProductComponent },
      { path: 'products/delete/:id', component: DeleteProductComponent },
      { path: 'suppliers/add', component: AddSupplierComponent },
      { path: 'suppliers/edit/:id', component: EditSupplierComponent },
      { path: 'suppliers/delete/:id', component: DeleteSupplierComponent },
      {
        path: 'delivery-documents/add',
        component: AddDeliveryDocumentComponent,
      },
      {
        path: 'delivery-documents/view/:id',
        component: ViewDeliveryDocumentComponent,
      },
      {
        path: 'delivery-documents/edit/:id',
        component: EditDeliveryDocumentComponent,
      },
      {
        path: 'delivery-documents/approve/:id',
        component: ApproveDeliveryDocumentComponent,
      },
      {
        path: 'delivery-documents/cancel/:id',
        component: CancelDeliveryDocumentComponent,
      },
    ]),
    Toaster,
    FormsModule
  ],
})
export class AppModule { }
