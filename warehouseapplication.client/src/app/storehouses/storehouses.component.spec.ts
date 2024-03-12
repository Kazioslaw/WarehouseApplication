import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorehousesComponent } from './storehouses.component';

describe('StorehousesComponent', () => {
  let component: StorehousesComponent;
  let fixture: ComponentFixture<StorehousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorehousesComponent]
    });
    fixture = TestBed.createComponent(StorehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
