import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryDocumentComponent } from './edit-delivery-document.component';

describe('EditDeliveryDocumentComponent', () => {
  let component: EditDeliveryDocumentComponent;
  let fixture: ComponentFixture<EditDeliveryDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeliveryDocumentComponent],
    });
    fixture = TestBed.createComponent(EditDeliveryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
