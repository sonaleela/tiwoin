import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimesheetPageComponent } from './edit-timesheet-page.component';

describe('EditTimesheetPageComponent', () => {
  let component: EditTimesheetPageComponent;
  let fixture: ComponentFixture<EditTimesheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTimesheetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTimesheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
