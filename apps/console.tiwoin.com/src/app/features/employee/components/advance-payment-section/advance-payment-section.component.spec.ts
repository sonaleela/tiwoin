import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentSectionComponent } from './advance-payment-section.component';

describe('AdvancePaymentSectionComponent', () => {
  let component: AdvancePaymentSectionComponent;
  let fixture: ComponentFixture<AdvancePaymentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancePaymentSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancePaymentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
