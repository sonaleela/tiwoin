import { Component, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-payroll-list-card',
    templateUrl: './payroll-list-card.component.html',
    styles: [':host { @apply block;}'],
    standalone: false
})
export class PayrollListCardComponent {
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly payrollList = input<any[]>([]);
    displayedColumns = ['name', 'description', 'baseDayType', 'earnings', 'deductions', 'actions'];

    readonly delete = output<string>();
}
