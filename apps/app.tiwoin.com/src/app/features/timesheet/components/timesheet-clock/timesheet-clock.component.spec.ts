import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetClockComponent } from './timesheet-clock.component';

describe('TimesheetClockComponent', () => {
  let component: TimesheetClockComponent;
  let fixture: ComponentFixture<TimesheetClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetClockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
