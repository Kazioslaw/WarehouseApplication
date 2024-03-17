import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDeliveryDocumentComponent } from './cancel-delivery-document.component';

describe('CancelDeliveryDocumentComponent', () => {
  let component: CancelDeliveryDocumentComponent;
  let fixture: ComponentFixture<CancelDeliveryDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelDeliveryDocumentComponent]
    });
    fixture = TestBed.createComponent(CancelDeliveryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
