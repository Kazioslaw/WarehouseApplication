import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';

@Component({
  selector: 'toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  imports: [NgbToastModule, NgFor],
  standalone: true,
})
export class Toaster {
  constructor(public toastService: ToastService) {}
}
