import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentListControllerComponent } from './payroll-component-list-controller.component';

describe('PayrollComponentListControllerComponent', () => {
  let component: PayrollComponentListControllerComponent;
  let fixture: ComponentFixture<PayrollComponentListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollComponentListControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollComponentListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
