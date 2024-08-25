import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvancePaymentFormComponent } from './add-advance-payment-form.component';

describe('AddAdvancePaymentFormComponent', () => {
  let component: AddAdvancePaymentFormComponent;
  let fixture: ComponentFixture<AddAdvancePaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAdvancePaymentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAdvancePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
