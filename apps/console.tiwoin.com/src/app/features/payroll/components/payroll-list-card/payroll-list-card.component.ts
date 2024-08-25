import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sonaleela-payroll-list-card',
    templateUrl: './payroll-list-card.component.html',
    styles: [':host { @apply block;}'],
})
export class PayrollListCardComponent {
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';
    @Input() payrollList: any[] = [];
    displayedColumns = ['name', 'description', 'baseDayType', 'earnings', 'deductions', 'actions'];

    @Output() delete = new EventEmitter<string>();
}
