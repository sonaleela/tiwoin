import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetListHeaderComponent } from './timesheet-list-header.component';

describe('TimesheetListHeaderComponent', () => {
  let component: TimesheetListHeaderComponent;
  let fixture: ComponentFixture<TimesheetListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
