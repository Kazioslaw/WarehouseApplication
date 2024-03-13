import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryDocumentComponent } from './view-delivery-document.component';

describe('ViewDeliveryDocumentComponent', () => {
  let component: ViewDeliveryDocumentComponent;
  let fixture: ComponentFixture<ViewDeliveryDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDeliveryDocumentComponent]
    });
    fixture = TestBed.createComponent(ViewDeliveryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
