import { TestBed } from '@angular/core/testing';

import { StorehousesService } from './storehouses.service';

describe('StorehousesService', () => {
  let service: StorehousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorehousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
