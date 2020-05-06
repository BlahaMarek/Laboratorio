import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationDetailModalComponent } from './calibration-detail-modal.component';

describe('CalibrationDetailModalComponent', () => {
  let component: CalibrationDetailModalComponent;
  let fixture: ComponentFixture<CalibrationDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
