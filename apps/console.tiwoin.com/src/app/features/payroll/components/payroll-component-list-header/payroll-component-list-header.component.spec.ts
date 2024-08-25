import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentListHeaderComponent } from './payroll-component-list-header.component';

describe('PayrollComponentListHeaderComponent', () => {
  let component: PayrollComponentListHeaderComponent;
  let fixture: ComponentFixture<PayrollComponentListHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollComponentListHeaderComponent]
    });
    fixture = TestBed.createComponent(PayrollComponentListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
