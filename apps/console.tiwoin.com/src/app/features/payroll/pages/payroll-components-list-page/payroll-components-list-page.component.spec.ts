import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentsListPageComponent } from './payroll-components-list-page.component';

describe('PayrollComponentsListPageComponent', () => {
  let component: PayrollComponentsListPageComponent;
  let fixture: ComponentFixture<PayrollComponentsListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollComponentsListPageComponent]
    });
    fixture = TestBed.createComponent(PayrollComponentsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
