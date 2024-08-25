import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sonaleela-timesheet-list',
    templateUrl: './timesheet-list.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetListComponent {
    @Input() timesheetList: any[] = [];
    displayedColumns = ['name', 'type', 'actions'];

    @Input() error: string | null = '';
    @Input() isPending: boolean | null = null;

    @Output() delete = new EventEmitter<string>();
}
