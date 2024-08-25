import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimesheetDataControllerComponent } from './edit-timesheet-data-controller.component';

describe('EditTimesheetDataControllerComponent', () => {
  let component: EditTimesheetDataControllerComponent;
  let fixture: ComponentFixture<EditTimesheetDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTimesheetDataControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTimesheetDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
