import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-payroll-data',
  templateUrl: './payroll-data.component.html',
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollDataComponent {
  @Input() payrollList: any[] = [];
  @Input() error: string | null = '';
  @Input() isPending: boolean | null = false;
  displayedColumns: string[] = ['name'];
}
