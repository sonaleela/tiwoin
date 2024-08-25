import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimesheetDataComponent } from './edit-timesheet-data.component';

describe('EditTimesheetDataComponent', () => {
  let component: EditTimesheetDataComponent;
  let fixture: ComponentFixture<EditTimesheetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTimesheetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTimesheetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
