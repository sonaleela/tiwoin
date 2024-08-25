import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-payroll-components-list-page',
  template: `<sonaleela-payroll-component-list-controller></sonaleela-payroll-component-list-controller>`,
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollComponentsListPageComponent { }
