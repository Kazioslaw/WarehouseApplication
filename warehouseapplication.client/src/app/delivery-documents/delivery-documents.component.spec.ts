import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDocumentsComponent } from './delivery-documents.component';

describe('DeliveryDocumentsComponent', () => {
  let component: DeliveryDocumentsComponent;
  let fixture: ComponentFixture<DeliveryDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryDocumentsComponent]
    });
    fixture = TestBed.createComponent(DeliveryDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
