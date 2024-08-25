import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDataControllerComponent } from './payroll-data-controller.component';

describe('PayrollDataControllerComponent', () => {
  let component: PayrollDataControllerComponent;
  let fixture: ComponentFixture<PayrollDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollDataControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
