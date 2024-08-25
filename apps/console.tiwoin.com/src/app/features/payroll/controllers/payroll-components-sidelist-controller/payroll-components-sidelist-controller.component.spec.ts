import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentsSidelistControllerComponent } from './payroll-components-sidelist-controller.component';

describe('PayrollComponentsSidelistControllerComponent', () => {
  let component: PayrollComponentsSidelistControllerComponent;
  let fixture: ComponentFixture<PayrollComponentsSidelistControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollComponentsSidelistControllerComponent]
    });
    fixture = TestBed.createComponent(PayrollComponentsSidelistControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
