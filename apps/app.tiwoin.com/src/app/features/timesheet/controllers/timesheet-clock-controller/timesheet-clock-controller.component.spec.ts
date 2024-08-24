import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetClockControllerComponent } from './timesheet-clock-controller.component';

describe('TimesheetClockControllerComponent', () => {
  let component: TimesheetClockControllerComponent;
  let fixture: ComponentFixture<TimesheetClockControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetClockControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetClockControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
