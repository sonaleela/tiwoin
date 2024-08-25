import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDataComponent } from './timesheet-data.component';

describe('TimesheetDataComponent', () => {
  let component: TimesheetDataComponent;
  let fixture: ComponentFixture<TimesheetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
