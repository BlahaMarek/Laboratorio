import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationChartComponent } from './calibration-chart.component';

describe('CalibrationChartComponent', () => {
  let component: CalibrationChartComponent;
  let fixture: ComponentFixture<CalibrationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibrationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
