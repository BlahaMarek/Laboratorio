import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChangerComponent } from './group-changer.component';

describe('GroupChangerComponent', () => {
  let component: GroupChangerComponent;
  let fixture: ComponentFixture<GroupChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
