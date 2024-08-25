import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-payroll-page',
  template: `<sonaleela-edit-payroll-controller></sonaleela-edit-payroll-controller>`,
  styles: [`:host { @apply block h-full; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPayrollPageComponent { }
