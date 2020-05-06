import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentChartComponent } from './experiment-chart.component';

describe('ExperimentChartComponent', () => {
  let component: ExperimentChartComponent;
  let fixture: ComponentFixture<ExperimentChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
