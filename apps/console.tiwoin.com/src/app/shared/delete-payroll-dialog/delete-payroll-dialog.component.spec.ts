import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePayrollDialogComponent } from './delete-payroll-dialog.component';

describe('DeletePayrollDialogComponent', () => {
  let component: DeletePayrollDialogComponent;
  let fixture: ComponentFixture<DeletePayrollDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePayrollDialogComponent]
    });
    fixture = TestBed.createComponent(DeletePayrollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
