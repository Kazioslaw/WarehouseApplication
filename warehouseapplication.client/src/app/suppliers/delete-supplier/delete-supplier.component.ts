import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css'],
})
export class DeleteSupplierComponent implements OnInit {
  id: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  getOne(id: number): void {}
}
