import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


interface Product {
  productID: number,
  productName: string,
  productBarcode: string,
}

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public products: Product[] = [];

  constructor(private http: HttpClient) {
    http.get<Product[]>("https://localhost:7088/api/Products").subscribe(result => {
      this.products = result;
    }, error => console.error(error))
  }
}
