import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayrollPageComponent } from './edit-payroll-page.component';

describe('EditPayrollPageComponent', () => {
  let component: EditPayrollPageComponent;
  let fixture: ComponentFixture<EditPayrollPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayrollPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPayrollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
