import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';

@Component({
    selector: 'sonaleela-payroll-data',
    templateUrl: './payroll-data.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PayrollDataComponent {
  readonly payrollList = input<any[]>([]);
  readonly error = input<string | null>('');
  readonly isPending = input<boolean | null>(false);
  displayedColumns: string[] = ['name'];
}
