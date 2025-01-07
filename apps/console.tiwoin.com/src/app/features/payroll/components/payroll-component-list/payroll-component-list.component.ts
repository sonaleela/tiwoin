import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-payroll-component-list',
    templateUrl: './payroll-component-list.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PayrollComponentListComponent {
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly payrollList = input<any[]>([]);
    displayedColumns = ['name', 'actions'];

    readonly delete = output<string>();
}
