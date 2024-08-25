import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDateSelectorComponent } from './timesheet-date-selector.component';

describe('TimesheetDateSelectorComponent', () => {
  let component: TimesheetDateSelectorComponent;
  let fixture: ComponentFixture<TimesheetDateSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimesheetDateSelectorComponent]
    });
    fixture = TestBed.createComponent(TimesheetDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
