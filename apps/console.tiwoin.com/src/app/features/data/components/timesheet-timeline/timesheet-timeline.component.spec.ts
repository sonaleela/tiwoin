import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetTimelineComponent } from './timesheet-timeline.component';

describe('TimesheetTimelineComponent', () => {
  let component: TimesheetTimelineComponent;
  let fixture: ComponentFixture<TimesheetTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetTimelineComponent]
    });
    fixture = TestBed.createComponent(TimesheetTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
