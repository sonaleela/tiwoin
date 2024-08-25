import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayrollFormComponent } from './edit-payroll-form.component';

describe('EditPayrollFormComponent', () => {
  let component: EditPayrollFormComponent;
  let fixture: ComponentFixture<EditPayrollFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayrollFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPayrollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
