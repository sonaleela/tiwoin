import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimesheetControllerComponent } from './edit-timesheet-controller.component';

describe('EditTimesheetControllerComponent', () => {
  let component: EditTimesheetControllerComponent;
  let fixture: ComponentFixture<EditTimesheetControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTimesheetControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTimesheetControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
