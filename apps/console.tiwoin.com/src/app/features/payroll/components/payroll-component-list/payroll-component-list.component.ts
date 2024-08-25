import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sonaleela-payroll-component-list',
    templateUrl: './payroll-component-list.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollComponentListComponent {
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';
    @Input() payrollList: any[] = [];
    displayedColumns = ['name', 'actions'];

    @Output() delete = new EventEmitter<string>();
}
