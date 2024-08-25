import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetListControllerComponent } from './timesheet-list-controller.component';

describe('TimesheetListControllerComponent', () => {
  let component: TimesheetListControllerComponent;
  let fixture: ComponentFixture<TimesheetListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetListControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
