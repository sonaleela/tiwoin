import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetBarComponent } from './timesheet-bar.component';

describe('TimesheetBarComponent', () => {
  let component: TimesheetBarComponent;
  let fixture: ComponentFixture<TimesheetBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
