import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDataHeaderComponent } from './timesheet-data-header.component';

describe('TimesheetDataHeaderComponent', () => {
  let component: TimesheetDataHeaderComponent;
  let fixture: ComponentFixture<TimesheetDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetDataHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
