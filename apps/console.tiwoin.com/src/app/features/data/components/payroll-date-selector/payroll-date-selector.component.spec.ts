import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDateSelectorComponent } from './payroll-date-selector.component';

describe('PayrollDateSelectorComponent', () => {
  let component: PayrollDateSelectorComponent;
  let fixture: ComponentFixture<PayrollDateSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollDateSelectorComponent]
    });
    fixture = TestBed.createComponent(PayrollDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
