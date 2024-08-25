import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimesheetDataPageComponent } from './add-timesheet-data-page.component';

describe('AddTimesheetDataPageComponent', () => {
  let component: AddTimesheetDataPageComponent;
  let fixture: ComponentFixture<AddTimesheetDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTimesheetDataPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTimesheetDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
