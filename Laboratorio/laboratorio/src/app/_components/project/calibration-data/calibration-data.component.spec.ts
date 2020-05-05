import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationDataComponent } from './calibration-data.component';

describe('CalibrationDataComponent', () => {
  let component: CalibrationDataComponent;
  let fixture: ComponentFixture<CalibrationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
