import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimesheetPageComponent } from './add-timesheet-page.component';

describe('AddTimesheetPageComponent', () => {
  let component: AddTimesheetPageComponent;
  let fixture: ComponentFixture<AddTimesheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimesheetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimesheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
