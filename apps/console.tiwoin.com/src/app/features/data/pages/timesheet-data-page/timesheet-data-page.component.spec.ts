import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDataPageComponent } from './timesheet-data-page.component';

describe('TimesheetDataPageComponent', () => {
  let component: TimesheetDataPageComponent;
  let fixture: ComponentFixture<TimesheetDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetDataPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
