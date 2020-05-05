import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationModalComponent } from './calibration-modal.component';

describe('CalibrationModalComponent', () => {
  let component: CalibrationModalComponent;
  let fixture: ComponentFixture<CalibrationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
