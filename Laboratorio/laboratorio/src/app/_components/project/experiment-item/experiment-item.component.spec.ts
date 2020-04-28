import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentItemComponent } from './experiment-item.component';

describe('ExperimentItemComponent', () => {
  let component: ExperimentItemComponent;
  let fixture: ComponentFixture<ExperimentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
