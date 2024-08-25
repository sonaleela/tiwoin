import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollListHeaderComponent } from './payroll-list-header.component';

describe('PayrollListHeaderComponent', () => {
  let component: PayrollListHeaderComponent;
  let fixture: ComponentFixture<PayrollListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
