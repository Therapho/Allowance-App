import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskWeekListViewComponent } from './task-week-list-view.component';

describe('TaskWeekListViewComponent', () => {
  let component: TaskWeekListViewComponent;
  let fixture: ComponentFixture<TaskWeekListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskWeekListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskWeekListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
