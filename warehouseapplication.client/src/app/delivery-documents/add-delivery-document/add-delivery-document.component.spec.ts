import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryDocumentComponent } from './add-delivery-document.component';

describe('AddDeliveryDocumentComponent', () => {
  let component: AddDeliveryDocumentComponent;
  let fixture: ComponentFixture<AddDeliveryDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeliveryDocumentComponent]
    });
    fixture = TestBed.createComponent(AddDeliveryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
