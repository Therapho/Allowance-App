import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayListViewComponent } from './day-list-view.component';

describe('DayListViewComponent', () => {
  let component: DayListViewComponent;
  let fixture: ComponentFixture<DayListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
