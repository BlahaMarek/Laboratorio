import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentModalComponent } from './experiment-modal.component';

describe('ExperimentModalComponent', () => {
  let component: ExperimentModalComponent;
  let fixture: ComponentFixture<ExperimentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
