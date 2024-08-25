import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimesheetDataComponent } from './add-timesheet-data.component';

describe('AddTimesheetDataComponent', () => {
  let component: AddTimesheetDataComponent;
  let fixture: ComponentFixture<AddTimesheetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTimesheetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTimesheetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
