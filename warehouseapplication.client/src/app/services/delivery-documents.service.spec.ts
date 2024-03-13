import { TestBed } from '@angular/core/testing';

import { DeliveryDocumentsService } from './delivery-documents.service';

describe('DeliveryDocumentsService', () => {
  let service: DeliveryDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
