import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDataControllerComponent } from './timesheet-data-controller.component';

describe('TimesheetDataControllerComponent', () => {
  let component: TimesheetDataControllerComponent;
  let fixture: ComponentFixture<TimesheetDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetDataControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
