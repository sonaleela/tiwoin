import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimesheetControllerComponent } from './add-timesheet-controller.component';

describe('AddTimesheetControllerComponent', () => {
  let component: AddTimesheetControllerComponent;
  let fixture: ComponentFixture<AddTimesheetControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimesheetControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimesheetControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
