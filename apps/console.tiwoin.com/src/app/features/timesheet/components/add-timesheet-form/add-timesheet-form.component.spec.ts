import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimesheetFormComponent } from './add-timesheet-form.component';

describe('AddTimesheetFormComponent', () => {
  let component: AddTimesheetFormComponent;
  let fixture: ComponentFixture<AddTimesheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimesheetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimesheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
