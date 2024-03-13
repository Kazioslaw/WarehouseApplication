import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeliveryDocumentComponent } from './approve-delivery-document.component';

describe('ApproveDeliveryDocumentComponent', () => {
  let component: ApproveDeliveryDocumentComponent;
  let fixture: ComponentFixture<ApproveDeliveryDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveDeliveryDocumentComponent]
    });
    fixture = TestBed.createComponent(ApproveDeliveryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
