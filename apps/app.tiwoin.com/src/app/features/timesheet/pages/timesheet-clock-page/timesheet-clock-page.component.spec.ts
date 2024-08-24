import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetClockPageComponent } from './timesheet-clock-page.component';

describe('TimesheetClockPageComponent', () => {
  let component: TimesheetClockPageComponent;
  let fixture: ComponentFixture<TimesheetClockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetClockPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetClockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
