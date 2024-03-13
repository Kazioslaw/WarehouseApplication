import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryDocument } from 'src/app/models/delivery-document';
import { DeliveryDocumentsService } from 'src/app/services/delivery-documents.service';

@Component({
  selector: 'approve-delivery-document',
  templateUrl: './approve-delivery-document.component.html',
  styleUrls: ['./approve-delivery-document.component.css'],
})
export class ApproveDeliveryDocumentComponent {
  deliveryDocumentDetails!: DeliveryDocument;
  documentID!: number;

  constructor(
    private deliveryDocumentSerivce: DeliveryDocumentsService,
    private activeRoute: ActivatedRoute,
    private router: Router
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

  approveDocument(id: number): void {
    this.deliveryDocumentSerivce.approveDeliveryDocument(id).subscribe(() => {
      console.log('Document approved');
      // Po zatwierdzeniu dokumentu, nawiguj z powrotem do poprzedniego widoku
      this.router.navigate(['../..'], { relativeTo: this.activeRoute });
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

      // Usuń efekt rozmycia i zmniejszenia opacności tła
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    }
  }
}
