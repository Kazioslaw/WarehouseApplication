import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DeliveryDocument } from 'src/app/models/delivery-document';
import { DeliveryDocumentsService } from 'src/app/services/delivery-documents.service';
import { ToastService } from 'src/app/toaster/toast.service';

@Component({
  selector: 'approve-delivery-document',
  templateUrl: './approve-delivery-document.component.html',
  styleUrls: ['./approve-delivery-document.component.css'],
})
export class ApproveDeliveryDocumentComponent {
  deliveryDocumentDetails!: DeliveryDocument;
  documentID!: number;
  private subscription!: Subscription;
  constructor(
    private deliveryDocumentSerivce: DeliveryDocumentsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.documentID = parseInt(
      this.activeRoute.snapshot.paramMap.get('id') || ''
    );
    this.deliveryDocumentSerivce
      .getDeliveryDocumentByID(this.documentID)
      .subscribe((data: DeliveryDocument) => {
        this.deliveryDocumentDetails = data;
      });
  }
  openModal(): void {
    const modal = document.getElementById('approvalModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';

      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.classList.add('modal-backdrop', 'fade', 'show');
      document.body.appendChild(backdrop);
    }
  }
  closeModal(): void {
    const modal = document.getElementById('approvalModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    }
  }

  approveDocument(id: number): void {
    this.subscription = this.deliveryDocumentSerivce
      .approveDeliveryDocument(id)
      .subscribe(() => {
        this.toast.show(
          'Document successfully approved',
          'bg-success text-light'
        );
        this.router.navigate(['delivery-documents']);
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          document.body.removeChild(backdrop);
        }
      });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
