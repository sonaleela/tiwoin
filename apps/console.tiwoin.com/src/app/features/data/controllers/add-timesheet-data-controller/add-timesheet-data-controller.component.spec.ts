import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimesheetDataControllerComponent } from './add-timesheet-data-controller.component';

describe('AddTimesheetDataControllerComponent', () => {
  let component: AddTimesheetDataControllerComponent;
  let fixture: ComponentFixture<AddTimesheetDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTimesheetDataControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTimesheetDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
