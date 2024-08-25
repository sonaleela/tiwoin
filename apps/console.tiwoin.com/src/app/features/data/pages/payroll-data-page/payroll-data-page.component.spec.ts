import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDataPageComponent } from './payroll-data-page.component';

describe('PayrollDataPageComponent', () => {
  let component: PayrollDataPageComponent;
  let fixture: ComponentFixture<PayrollDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollDataPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
