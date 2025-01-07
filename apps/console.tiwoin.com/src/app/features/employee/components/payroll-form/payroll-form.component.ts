import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PayrollModel } from '@models';

@Component({
    selector: 'sonaleela-payroll-form',
    templateUrl: './payroll-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PayrollFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  readonly payrollList = input<PayrollModel[] | null>([]);

  form = this.formBuilder.group({
    payrollId: '',
    payrollConfig: this.formBuilder.group({})
  });
  isForm = false;
  selectedPayroll: any;

  constructor() {
    this.form.get('payrollId')?.valueChanges.subscribe(id => {
      this.selectedPayroll = this.payrollList()?.find(payroll => `${payroll.id}` === `${id}`);
    })
  }

  submit() {
  }
}
