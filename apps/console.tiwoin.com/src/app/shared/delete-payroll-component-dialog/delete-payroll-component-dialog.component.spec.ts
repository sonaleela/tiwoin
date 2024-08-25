import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePayrollComponentDialogComponent } from './delete-payroll-component-dialog.component';

describe('DeletePayrollComponentDialogComponent', () => {
  let component: DeletePayrollComponentDialogComponent;
  let fixture: ComponentFixture<DeletePayrollComponentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeletePayrollComponentDialogComponent]
    });
    fixture = TestBed.createComponent(DeletePayrollComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
