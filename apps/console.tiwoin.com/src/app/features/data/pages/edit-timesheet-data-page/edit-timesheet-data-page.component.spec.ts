import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimesheetDataPageComponent } from './edit-timesheet-data-page.component';

describe('EditTimesheetDataPageComponent', () => {
  let component: EditTimesheetDataPageComponent;
  let fixture: ComponentFixture<EditTimesheetDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTimesheetDataPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTimesheetDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
