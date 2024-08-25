import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollComponentControllerComponent } from './add-payroll-component-controller.component';

describe('AddPayrollComponentControllerComponent', () => {
  let component: AddPayrollComponentControllerComponent;
  let fixture: ComponentFixture<AddPayrollComponentControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayrollComponentControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPayrollComponentControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
