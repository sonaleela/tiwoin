import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-timesheet-list',
    templateUrl: './timesheet-list.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TimesheetListComponent {
    readonly timesheetList = input<any[]>([]);
    displayedColumns = ['name', 'type', 'actions'];

    readonly error = input<string | null>('');
    readonly isPending = input<boolean | null>(null);

    readonly delete = output<string>();
}
