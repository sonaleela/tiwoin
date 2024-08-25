import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentControllerComponent } from './advance-payment-controller.component';

describe('AdvancePaymentControllerComponent', () => {
  let component: AdvancePaymentControllerComponent;
  let fixture: ComponentFixture<AdvancePaymentControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancePaymentControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancePaymentControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
