import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimesheetFormComponent } from './edit-timesheet-form.component';

describe('EditTimesheetFormComponent', () => {
  let component: EditTimesheetFormComponent;
  let fixture: ComponentFixture<EditTimesheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTimesheetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTimesheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
