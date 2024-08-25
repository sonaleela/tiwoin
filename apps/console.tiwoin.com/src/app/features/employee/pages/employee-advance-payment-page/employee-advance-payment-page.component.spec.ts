import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdvancePaymentPageComponent } from './employee-advance-payment-page.component';

describe('EmployeeAdvancePaymentPageComponent', () => {
  let component: EmployeeAdvancePaymentPageComponent;
  let fixture: ComponentFixture<EmployeeAdvancePaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeAdvancePaymentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAdvancePaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
