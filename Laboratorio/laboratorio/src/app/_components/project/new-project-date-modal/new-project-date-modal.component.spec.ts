import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectDateModalComponent } from './new-project-date-modal.component';

describe('NewProjectDateModalComponent', () => {
  let component: NewProjectDateModalComponent;
  let fixture: ComponentFixture<NewProjectDateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectDateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
