import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayrollControllerComponent } from './edit-payroll-controller.component';

describe('EditPayrollControllerComponent', () => {
  let component: EditPayrollControllerComponent;
  let fixture: ComponentFixture<EditPayrollControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayrollControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPayrollControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
