import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentSidelistComponent } from './payroll-component-sidelist.component';

describe('PayrollComponentSidelistComponent', () => {
  let component: PayrollComponentSidelistComponent;
  let fixture: ComponentFixture<PayrollComponentSidelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollComponentSidelistComponent]
    });
    fixture = TestBed.createComponent(PayrollComponentSidelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
