import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-payroll-data-header',
  templateUrl: './payroll-data-header.component.html',
  styles: [`:host { @apply flex items-center gap-3 py-4; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollDataHeaderComponent { }
