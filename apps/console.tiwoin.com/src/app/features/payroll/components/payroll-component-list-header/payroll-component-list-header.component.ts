import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-payroll-component-list-header',
  templateUrl: './payroll-component-list-header.component.html',
  styles: [`:host { @apply flex items-center gap-3 py-4;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollComponentListHeaderComponent { }
