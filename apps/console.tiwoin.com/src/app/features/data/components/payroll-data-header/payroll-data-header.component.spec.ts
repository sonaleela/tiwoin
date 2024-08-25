import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDataHeaderComponent } from './payroll-data-header.component';

describe('PayrollDataHeaderComponent', () => {
  let component: PayrollDataHeaderComponent;
  let fixture: ComponentFixture<PayrollDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollDataHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
